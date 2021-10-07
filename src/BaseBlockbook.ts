import { BlockHashResponseWs, GetBlockOptions, SubscribeAddressesEvent, SubscribeNewBlockEvent } from './types/common';
import request from 'request-promise-native'
import { assertType, DelegateLogger, isMatchingError, isString, isUndefined, Logger } from '@faast/ts-common'
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

type PendingWsRequests = { [id: string]: { resolve: Resolve, reject: Reject } }
type SubscriptionData = { callback: Resolve, method: string, params: object }
type SubscriptionIdToData = { [id: string]: SubscriptionData }

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
  /** Blockbook URIs */
  nodes: string[]

  /** Set to true to turn off response type validation */
  disableTypeValidation: boolean

  /** Maximum number of milliseconds to wait for both http and ws requests to respond */
  requestTimeoutMs: number

  /**
   * Base millisecond delay for exponential backoff reconnect logic.
   * Set to 0 to not reconnect on unexpected websocket closure
   */
  reconnectDelayMs: number

  /** Websocket currently connected */
  ws: WebSocket

  /** True if connected with websocket */
  wsConnected: boolean = false

  /** Blockbook URI websocket is currently connected to */
  wsConnectedNode?: string

  logger: Logger
  debug: boolean

  /** Count all requests. Used to load balance multiple nodes and identify ws messages */
  private requestCounter = 0
  /** Pending websocket connect promise. Used to prevent connect race case */
  private wsPendingConnectPromise?: Promise<void>
  /** Interval to ping the websocket on to keep alive */
  private pingIntervalId: NodeJS.Timeout
  /** Pending websocket request promise handlers mapped by id */
  private pendingWsRequests: PendingWsRequests = {}
  /** Existing websocket subscriptions mapped by id */
  private subscriptionIdToData: SubscriptionIdToData = {}
  /** Map existing subscription methods to ids */
  private subscribtionMethodToId: Record<string, string> = {}

  /** Websocket closure codes that won't trigger automatic reconnect */
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

    // reconnect to failed ws quickly by default
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
  private pickNode() {
    return this.nodes[this.requestCounter++ % this.nodes.length]
  }

  async httpRequest(
    method: 'GET' | 'POST', path: string, params?: object, body?: object, options?: Partial<request.Options>,
  ) {
    const response = jsonRequest(this.pickNode(), method, path, params, body, {
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
        if (this.pendingWsRequests[id]?.reject === reject) { // Verify the same request is still pending
          delete this.pendingWsRequests[id]
          reject(new Error(`Timeout waiting for websocket ${method} response (id: ${id})`))
        }
      }, this.requestTimeoutMs)
      this.pendingWsRequests[id] = { resolve, reject }
      this.ws.send(JSON.stringify(req))
    })
  }

  /** Subscribe to a websocket method */
  async subscribe(method: string, params: object, callback: (result: any) => void) {
    const id = (this.requestCounter++).toString()
    this.subscriptionIdToData[id] = { callback, method, params }
    const result = await this.wsRequest(method, params, id)
    // Only one of each subscription can exist at once so delete the old one if it exists
    const oldSubscriptionId = this.subscribtionMethodToId[method]
    if (oldSubscriptionId) {
      delete this.subscriptionIdToData[oldSubscriptionId]
    }
    this.subscribtionMethodToId[method] = id
    return result
  }

  /** Unsubscribe from a particular websocket method that was previously subscribed */
  async unsubscribe(method: string) {
    const subscriptionId = this.subscribtionMethodToId[method]
    if (isUndefined(subscriptionId)) {
      return { subscribed: false }
    }
    delete this.subscribtionMethodToId[method]
    delete this.subscriptionIdToData[subscriptionId]
    return this.wsRequest(`un${method}`, {}, subscriptionId)
  }

  /**
   * Recursively reconnect to websocket with exponential backoff delay.
   * Resubscribe existingSubscriptions upon reconnecting.
   */
  private reconnect(baseDelay: number, existingSubscriptions: SubscriptionData[]) {
    const reconnectMs = Math.round(baseDelay * (1 + Math.random()))
    this.logger.log(`socket reconnecting in ${reconnectMs/1000}s to one of`, this.nodes)
    setTimeout(async () => {
      try {
        await this.connect()
        // Resubscribe to subscriptions that existed before disconnection
        for (let subscription of existingSubscriptions) {
          await this.subscribe(subscription.method, subscription.params, subscription.callback)
        }
      } catch (e) {
        this.reconnect(Math.max(60 * 1000, baseDelay * 2), existingSubscriptions)
      }
    }, reconnectMs)
  }

  /** Reject all pending websocket requests with a given reason */
  private rejectAllPendingRequests(reason: string) {
    for (let pendingRequestId of Object.keys(this.pendingWsRequests)) {
      const { reject } = this.pendingWsRequests[pendingRequestId]
      delete this.pendingWsRequests[pendingRequestId]
      reject(new Error(reason))
    }
  }

  /** Establish a websocket connection to a node and return the node url if successful */
  async connect(): Promise<string> {
    if (this.wsPendingConnectPromise) {
      await this.wsPendingConnectPromise
      // If successful, wsConnectedNode should be set at this point
    }
    if (this.wsConnectedNode) {
      return this.wsConnectedNode
    }
    this.pendingWsRequests = {}
    this.subscriptionIdToData = {}
    this.subscribtionMethodToId = {}
    let node = this.pickNode()
    if (node.startsWith('http')) {
      node = node.replace('http', 'ws')
    }
    if (!node.startsWith('ws')) {
      node = `wss://${node}`
    }
    if (!node.endsWith('/websocket')) {
      node += '/websocket'
    }

    // Store the promise before awaiting to prevent a race case
    this.wsPendingConnectPromise = new Promise<void>((resolve, reject) => {
      this.ws = new WebSocket(node, { headers: { 'user-agent': USER_AGENT } })
      this.ws.once('open', () => {
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
    // Wait for the connection before resolving
    await this.wsPendingConnectPromise
    delete this.wsPendingConnectPromise

    this.ws.on('close', (code) => {
      this.logger.warn(`socket connection to ${node} closed with code: ${code}`)
      this.wsConnected = false
      this.wsConnectedNode = undefined
      clearInterval(this.pingIntervalId)
      this.rejectAllPendingRequests('socket closed while waiting for response')
      if (!BaseBlockbook.WS_NORMAL_CLOSURE_CODES.includes(code) && this.reconnectDelayMs > 0) {
        this.reconnect(this.reconnectDelayMs, Object.values(this.subscriptionIdToData))
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
      const activeSubscription = this.subscriptionIdToData[id]
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
    return this.subscribe('subscribeAddresses', { addresses }, cb)
  }

  /**
   * ws only - remove existing subscribeAddresses subscription
   */
  async unsubscribeAddresses(): Promise<{ subscribed: false }> {
    this.assertWsConnected('call unsubscribeAddresses')
    return this.unsubscribe('subscribeAddresses')
  }

  /**
   * ws only - subscribe to new block events
   */
  async subscribeNewBlock(cb: (e: SubscribeNewBlockEvent) => void): Promise<{ subscribed: true }> {
    this.assertWsConnected('call subscribeNewBlock')
    return this.subscribe('subscribeNewBlock', {}, cb)
  }

  /**
   * ws only - remove existing subscribeAddresses subscription
   */
  async unsubscribeNewBlock(): Promise<{ subscribed: false }> {
    this.assertWsConnected('call unsubscribeNewBlock')
    return this.unsubscribe('subscribeNewBlock')
  }
}
