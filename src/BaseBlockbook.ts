import request from 'request-promise-native'
import requestErrors from 'request-promise-native/errors'
import { assertType, isString } from '@faast/ts-common'
import * as t from 'io-ts'
import qs from 'qs'
import {
  XpubDetailsBasic, XpubDetailsTokens, XpubDetailsTokenBalances, XpubDetailsTxids, XpubDetailsTxs,
  BlockbookConfig, SystemInfo, BlockHashResponse, GetAddressDetailsOptions,
  UtxoDetails, UtxoDetailsXpub, GetUtxosOptions, GetXpubDetailsOptions,
  SendTxSuccess, SendTxError,
} from './types'
import { isObject } from 'util'

const xpubDetailsCodecs = {
  basic: XpubDetailsBasic,
  tokens: XpubDetailsTokens,
  tokenBalances: XpubDetailsTokenBalances,
  txids: XpubDetailsTxids,
  txs: XpubDetailsTxs,
}

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
    this.nodes = config.nodes
    if (this.nodes.length === 0) {
      throw new Error('Blockbook node list must not be empty')
    }
    this.disableTypeValidation = config.disableTypeValidation || false
  }

  doAssertType<T>(codec: t.Type<T, any, unknown>, value: unknown, ...rest: any[]): T {
    if (this.disableTypeValidation) {
      return value as T
    }
    return assertType(codec, value, ...rest)
  }

  async doRequest(method: 'GET' | 'POST', url: string, params?: object, body?: object, options?: request.Options) {
    let node = this.nodes[0] // TODO: fallback to other nodes
    if (!node.startsWith('http')) {
      node = `https://${node}`
    }
    try {
      return await request(`${node}${url}${params ? qs.stringify(params) : ''}`, {
        method,
        body,
        json: true,
        ...options,
      })
    } catch(e) {
      if (e instanceof requestErrors.StatusCodeError) {
        const body = e.response.body
        if (isObject(body) && body.error) {
          if (isString(body.error)) {
            throw new Error(body.error)
          } else if (isObject(body.error) && isString(body.error.message)) {
            throw new Error(body.error.message)
          }
        }
      }
      throw e
    }
  }

  async getStatus(): Promise<SystemInfo> {
    const response = await this.doRequest('GET', '/api/v2')
    return this.doAssertType(SystemInfo, response)
  }

  async getBlockHash(blockNumber: number): Promise<string> {
    const response = await this.doRequest('GET', `/api/v2/block-index/${blockNumber}`)
    const { blockHash } = this.doAssertType(BlockHashResponse, response)
    return blockHash
  }

  async getTx(txid: string): Promise<NormalizedTx> {
    const response = await this.doRequest('GET', `/api/v2/tx/${txid}`)
    return this.doAssertType(this.normalizedTxCodec, response)
  }

  async getTxSpecific(txid: string): Promise<SpecificTx> {
    const response = await this.doRequest('GET', `/api/v2/tx-specific/${txid}`)
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
    const response = await this.doRequest('GET', `/api/v2/address/${address}`, options)
    const detailsLevel = options.details || 'txids'
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
    const response = await this.doRequest('GET', `/api/v2/xpub/${xpub}`, options)
    const detailsLevel = options.details || 'txids'
    const codec: t.Mixed = xpubDetailsCodecs[detailsLevel]
    return this.doAssertType(codec, response)
  }

  async getUtxosForAddress(address: string, options: GetUtxosOptions = {}): Promise<UtxoDetails[]> {
    const response = await this.doRequest('GET', `/api/v2/utxo/${address}`, options)
    return this.doAssertType(t.array(UtxoDetails), response)
  }

  async getUtxosForXpub(xpub: string, options: GetUtxosOptions = {}): Promise<UtxoDetailsXpub[]> {
    const response = await this.doRequest('GET', `/api/v2/utxo/${xpub}`, options)
    return this.doAssertType(t.array(UtxoDetailsXpub), response)
  }

  async getBlock(block: string | number): Promise<BlockInfo> {
    const response = await this.doRequest('GET', `/api/v2/block/${block}`)
    return this.doAssertType(this.blockInfoCodec, response)
  }

  async sendTx(txHex: string): Promise<string> {
    const response = await this.doRequest('GET', `/api/v2/sendtx/${txHex}`)
    if (SendTxError.is(response)) {
      throw new Error(`blockbook sendtx returned error: ${response.error.message}`)
    } else {
      return (response as SendTxSuccess).result
    }
  }
}
