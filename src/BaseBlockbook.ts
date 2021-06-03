import { BlockHashResponseWs, GetBlockOptions, SubscribeAddressesEvent, SubscribeNewBlockEvent } from './types/common';
import request from 'request-promise-native'
import { assertType, DelegateLogger, isMatchingError, isString, Logger } from '@faast/ts-common'
import * as t from 'io-ts'
import WebSocket from 'ws'

import {
  XpubDetailsBasic, XpubDetailsTokens, XpubDetailsTokenBalances, XpubDetailsTxids, XpubDetailsTxs,
  BlockbookConfig, SystemInfo, BlockHashResponse, GetAddressDetailsOptions,
  UtxoDetails, UtxoDetailsXpub, GetUtxosOptions, GetXpubDetailsOptions,
  SendTxSuccess, SendTxError,
  Resolve, Reject, SystemInfoWs
} from './types'
import { jsonRequest, USER_AGENT } from './utils'

const xpubDetailsCodecs = {
  basic: XpubDetailsBasic,
  tokens: XpubDetailsTokens,
  tokenBalances: XpubDetailsTokenBalances,
  txids: XpubDetailsTxids,
  txs: XpubDetailsTxs,
}

/**
 * Blockbook client with support for both http and ws with multi-node and type validation support.
 *
 * Reference websocket implementation based on:
 * https://github.com/trezor/blockbook/blob/master/static/test-websocket.html
 */
export abstract class BaseBlockbook<
  NormalizedTx,
  SpecificTx,
  BlockInfo,
  AddressDetailsBasic,
  AddressDetailsTokens,
  AddressDetailsTokenBalances,
  AddressDetailsTxids,
  AddressDetailsTxs,
> {
  nodes: string[]
  disableTypeValidation: boolean
  requestTimeoutMs: number
  reconnectDelayMs: number
  ws: WebSocket
  wsConnected: boolean
  wsConnectedNode?: string
  logger: Logger
  debug: boolean

  private requestCounter = 0
  private pingIntervalId: NodeJS.Timeout
  private pendingWsRequests: { [id: string]: { resolve: Resolve, reject: Reject } } = {}
  private subscriptions: { [id: string]: { callback: Resolve, method: string } } = {}
  private subscribeNewBlockId = ''
  private subscribeAddressesId = ''

  static WS_NORMAL_CLOSURE_CODES = [1000, 1005]

  constructor(
    config: BlockbookConfig,
    private normalizedTxCodec: t.Type<NormalizedTx>,
    private specificTxCodec: t.Type<SpecificTx>,
    private blockInfoCodec: t.Type<BlockInfo>,
    private addressDetailsCodecs: {
      basic: t.Type<AddressDetailsBasic>,
      tokens: t.Type<AddressDetailsTokens>,
      tokenBalances: t.Type<AddressDetailsTokenBalances>,
      txids: t.Type<AddressDetailsTxids>,
      txs: t.Type<AddressDetailsTxs>,
    }
  ) {
    config = assertType(BlockbookConfig, config)
    if (config.nodes.length === 0) {
      throw new Error('Blockbook node list must not be empty')
    }
    // trim trailing slash
    this.nodes = config.nodes.map((node) => node.trim().replace(/\/$/, ''))

    // validate all responses by default
    this.disableTypeValidation = config.disableTypeValidation || false

    // fail fast by default
    this.requestTimeoutMs = config.requestTimeoutMs || 5000

    // reconnect to failed ws quickly
    this.reconnectDelayMs = config.reconnectDelayMs || 2000

    // prefix all log messages with package name. Default to null -> no logging
    this.logger = new DelegateLogger(config.logger ?? null, 'blockbook-client')

    // Turn on debug logging
    this.debug = process.env.DEBUG?.includes('blockbook-client') ?? false
  }

  doAssertType<T>(codec: t.Type<T, any, unknown>, value: unknown, ...rest: any[]): T {
    if (this.disableTypeValidation) {
      return value as T
    }
    return assertType(codec, value, ...rest)
  }


  /** Load balance using round robin. Helps any retry logic fallback to different nodes */
  private getNode() {
    return this.nodes[this.requestCounter++ % this.nodes.length]
  }

  async httpRequest(
    method: 'GET' | 'POST', path: string, params?: object, body?: object, options?: Partial<request.Options>,
  ) {
    const response = jsonRequest(this.getNode(), method, path, params, body, {
      timeout: this.requestTimeoutMs,
      ...options,
    })
    if (this.debug) {
      this.logger.debug(`http result ${method} ${path}`, response)
    }
    return response
  }

  wsRequest(method: string, params?: object, idOption?: string): Promise<any> {
    const id = idOption ?? (this.requestCounter++).toString()
    const req = {
        id,
        method,
        params
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        delete this.pendingWsRequests[id]
        reject(`Timeout waiting for websocket ${method} response (id: ${id})`)
      }, this.requestTimeoutMs)
      this.pendingWsRequests[id] = { resolve, reject }
      this.ws.send(JSON.stringify(req))
    })
  }

  async subscribe(method: string, params: object, callback: (result: any) => void) {
    const id = (this.requestCounter++).toString()
    this.subscriptions[id] = { callback, method }
    const result = await this.wsRequest(method, params, id)
    return [id, result]
  }

  unsubscribe(method: string, params: object, id: string) {
    const result = this.wsRequest(method, params, id)
    delete this.subscriptions[id]
    return result
  }

  /** Establish a websocket connection to a node and return the node url if successful */
  async connect(): Promise<string> {
    if (this.wsConnectedNode) {
      return this.wsConnectedNode
    }
    this.pendingWsRequests = {}
    this.subscriptions = {}
    this.subscribeNewBlockId = ''
    this.subscribeAddressesId = ''
    let node = this.getNode()
    if (node.startsWith('http')) {
      node = node.replace('http', 'ws')
    }
    if (!node.startsWith('ws')) {
      node = `wss://${node}`
    }
    if (!node.endsWith('/websocket')) {
      node += '/websocket'
    }

    // Wait for the connection before resolving
    await new Promise<void>((resolve, reject) => {
      this.ws = new WebSocket(node, { headers: { 'user-agent': USER_AGENT } })
      this.ws.once('open', (e) => {
        this.logger.log(`socket connected to ${node}`)
        this.wsConnected = true
        this.wsConnectedNode = node
        resolve()
      })
      this.ws.once('error', (e) => {
        this.logger.warn(`socket error connecting to ${node}`, e)
        this.ws.terminate()
        reject(e)
      })
    })

    this.ws.on('close', (code) => {
      this.logger.warn(`socket connection to ${node} closed with code: ${code}`)
      this.wsConnected = false
      this.wsConnectedNode = undefined
      clearInterval(this.pingIntervalId)
      if (!BaseBlockbook.WS_NORMAL_CLOSURE_CODES.includes(code) && this.reconnectDelayMs > 0) {
        const reconnectMs = Math.round(this.reconnectDelayMs * (1 + Math.random()))
        this.logger.log(`unexpected socket closure, reconnecting in ${reconnectMs}ms`)
        setTimeout(() => this.connect(), reconnectMs)
      }
    })
    this.ws.on('error', (e) => {
      this.logger.warn(`socket error for ${node}`, e)
    })

    // Parse all incoming messages and forward them to any pending requests or subscriptions
    this.ws.on('message', (data) => {
      if (this.debug) {
        this.logger.debug(`socket message from ${node}`, data)
      }
      if (!isString(data)) {
        this.logger.error(`Unrecognized websocket data type ${typeof data} received from ${node}`)
        return
      }
      let response
      try {
        response = JSON.parse(data)
      } catch (e) {
        this.logger.error(`Failed to parse websocket data received from ${node}`, e.toString())
        return
      }
      const id = response.id
      if (!isString(id)) {
        this.logger.error(`Received websocket data without a valid ID from ${node}`, response)
      }
      const result = response.data
      let errorMessage: string = ''
      if (result?.error) {
        errorMessage = result.error.message ?? data
      }
      const pendingRequest = this.pendingWsRequests[id]
      if (pendingRequest) {
          delete this.pendingWsRequests[id]
          if (errorMessage) {
            return pendingRequest.reject(new Error(errorMessage))
          }
          return pendingRequest.resolve(result)
      }
      const activeSubscription = this.subscriptions[id]
      if (activeSubscription) {
        if (errorMessage) {
          this.logger.error(
            `Received error response for ${activeSubscription.method} subscription from ${node}`,
            errorMessage,
          )
        }
        return activeSubscription.callback(result)
      }
      this.logger.warn(`Unrecognized websocket data (id: ${id}) received from ${node}`, result)
    })

    // Periodically ping the server and disconnect when unresponsive
    this.pingIntervalId = setInterval(async () => {
      try {
        await this.wsRequest('ping', {})
      } catch (e) {
        this.ws.terminate() // force close
      }
    }, 25000)

    return node
  }

  /* Close the websocket or do nothing if not connected */
  async disconnect(): Promise<void> {
    if (!this.wsConnected) {
      return
    }
    return new Promise((resolve, reject) => {
      this.ws.once('close', () => resolve())
      this.ws.once('error', (e) => reject(e))
      this.ws.close()
    })
  }

  assertWsConnected(msg?: string) {
    if (!this.wsConnected) {
      throw new Error(`Websocket must be connected to ${msg ?? ''}`)
    }
  }

  // ws getInfo
  async getInfo(): Promise<SystemInfoWs> {
    if (!this.wsConnected) {
      throw new Error('Websocket must be connected to call getInfo')
    }
    const response = await this.wsRequest('getInfo')
    return this.doAssertType(SystemInfoWs, response)
  }

  async getStatus(): Promise<SystemInfo> {
    const response = await this.httpRequest('GET', '/api/v2')
    return this.doAssertType(SystemInfo, response)
  }

  async getBlockHash(blockNumber: number): Promise<string> {
    if (this.wsConnected) {
      const response = await this.wsRequest('getBlockHash', { height: blockNumber })
      const { hash } = this.doAssertType(BlockHashResponseWs, response)
      return hash
    }
    const response = await this.httpRequest('GET', `/api/v2/block-index/${blockNumber}`)
    const { blockHash } = this.doAssertType(BlockHashResponse, response)
    return blockHash
  }

  async getTx(txid: string): Promise<NormalizedTx> {
    const response = this.wsConnected
      ? await this.wsRequest('getTransaction', { txid })
      : await this.httpRequest('GET', `/api/v2/tx/${txid}`)
    return this.doAssertType(this.normalizedTxCodec, response)
  }

  async getTxSpecific(txid: string): Promise<SpecificTx> {
    const response = this.wsConnected
      ? await this.wsRequest('getTransactionSpecific', { txid })
      : await this.httpRequest('GET', `/api/v2/tx-specific/${txid}`)
    return this.doAssertType(this.specificTxCodec, response)
  }

  async getAddressDetails(
    address: string,
    options: GetAddressDetailsOptions & { details: 'basic' },
  ): Promise<AddressDetailsBasic>
  async getAddressDetails(
    address: string,
    options: GetAddressDetailsOptions & { details: 'tokens' },
  ): Promise<AddressDetailsTokens>
  async getAddressDetails(
    address: string,
    options: GetAddressDetailsOptions & { details: 'tokenBalances' }
  ): Promise<AddressDetailsTokenBalances>
  async getAddressDetails(
    address: string,
    options?: GetAddressDetailsOptions & { details: 'txids' | undefined } | Omit<GetAddressDetailsOptions, 'details'>
  ): Promise<AddressDetailsTxids>
  async getAddressDetails(
    address: string,
    options: GetAddressDetailsOptions & { details: 'txs' },
  ): Promise<AddressDetailsTxs>
  async getAddressDetails(address: string, options: GetAddressDetailsOptions = {}) {
    const detailsLevel = options.details || 'txids'
    const response = this.wsConnected
      ? await this.wsRequest('getAccountInfo', { descriptor: address, ...options, details: detailsLevel })
      : await this.httpRequest('GET', `/api/v2/address/${address}`, { ...options, details: detailsLevel })
    const codec: t.Mixed = this.addressDetailsCodecs[detailsLevel]
    return this.doAssertType(codec, response)
  }

  async getXpubDetails(
    xpub: string,
    options: GetXpubDetailsOptions & { details: 'basic' },
  ): Promise<XpubDetailsBasic>
  async getXpubDetails(
    xpub: string,
    options: GetXpubDetailsOptions & { details: 'tokens' },
  ): Promise<XpubDetailsTokens>
  async getXpubDetails(
    xpub: string,
    options: GetXpubDetailsOptions & { details: 'tokenBalances' }
  ): Promise<XpubDetailsTokenBalances>
  async getXpubDetails(
    xpub: string,
    options?: GetXpubDetailsOptions & { details: 'txids' | undefined } | Omit<GetXpubDetailsOptions, 'details'>
  ): Promise<XpubDetailsTxids>
  async getXpubDetails(
    xpub: string,
    options: GetXpubDetailsOptions & { details: 'txs' },
  ): Promise<XpubDetailsTxs>
  async getXpubDetails(xpub: string, options: GetXpubDetailsOptions = {}) {
    const tokens = options.tokens || 'derived'
    const detailsLevel = options.details || 'txids'
    const response = this.wsConnected
      ? await this.wsRequest('getAccountInfo', { descriptor: xpub, details: detailsLevel, tokens, ...options })
      : await this.httpRequest('GET', `/api/v2/xpub/${xpub}`, { details: detailsLevel, tokens, ...options })
    const codec: t.Mixed = xpubDetailsCodecs[detailsLevel]
    return this.doAssertType(codec, response)
  }

  async getUtxosForAddress(address: string, options: GetUtxosOptions = {}): Promise<UtxoDetails[]> {
    const response = this.wsConnected
      ? await this.wsRequest('getAccountUtxo', { descriptor: address, ...options })
      : await this.httpRequest('GET', `/api/v2/utxo/${address}`, options)
    return this.doAssertType(t.array(UtxoDetails), response)
  }

  async getUtxosForXpub(xpub: string, options: GetUtxosOptions = {}): Promise<UtxoDetailsXpub[]> {
    const response = this.wsConnected
      ? await this.wsRequest('getAccountUtxo', { descriptor: xpub, ...options })
      : await this.httpRequest('GET', `/api/v2/utxo/${xpub}`, options)
    return this.doAssertType(t.array(UtxoDetailsXpub), response)
  }

  async getBlock(block: string | number, options: GetBlockOptions = {}): Promise<BlockInfo> {
    // http only
    const response = await this.httpRequest('GET', `/api/v2/block/${block}`, options)
    return this.doAssertType(this.blockInfoCodec, response)
  }

  async sendTx(txHex: string): Promise<string> {
    // NOTE: sendtx POST doesn't work without trailing slash, and sendtx GET fails for large txs
    const response = this.wsConnected
      ? await this.wsRequest('sendTransaction', { hex: txHex })
      : await this.httpRequest('POST', '/api/v2/sendtx/', undefined, undefined, { body: txHex, json: false })

    const { result: txHash } = this.doAssertType(SendTxSuccess, response)
    return txHash
  }

  /**
   * ws only - subscribe to new mempool transactions for particular addresses. Subsequent calls overwrite previous
   * address list subscription.
   */
  async subscribeAddresses(
    addresses: string[],
    cb: (e: SubscribeAddressesEvent) => void,
  ): Promise<{ subscribed: true }> {
    this.assertWsConnected('call subscribeAddresses')
    const [subscriptionId, result] = await this.subscribe('subscribeAddresses', { addresses }, cb)
    this.subscribeAddressesId = subscriptionId
    return result
  }

  /**
   * ws only - remove existing subscribeAddresses subscription
   */
  async unsubscribeAddresses(): Promise<{ subscribed: false }> {
    this.assertWsConnected('call unsubscribeAddresses')
    return this.unsubscribe('unsubscribeAddresses', {}, this.subscribeAddressesId)
  }

  /**
   * ws only - subscribe to new block events
   */
  async subscribeNewBlock(cb: (e: SubscribeNewBlockEvent) => void): Promise<{ subscribed: true }> {
    this.assertWsConnected('call subscribeNewBlock')
    const [subscriptionId, result] = await this.subscribe('subscribeNewBlock', {}, cb)
    this.subscribeNewBlockId = subscriptionId
    return result
  }

  /**
   * ws only - remove existing subscribeAddresses subscription
   */
  async unsubscribeNewBlock(): Promise<{ subscribed: false }> {
    this.assertWsConnected('call unsubscribeNewBlock')
    return this.unsubscribe('unsubscribeNewBlock', {}, this.subscribeNewBlockId)
  }
}
