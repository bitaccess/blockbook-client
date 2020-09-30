import request from 'request-promise-native'
import { assertType } from '@faast/ts-common'
import * as t from 'io-ts'
import {
  XpubDetailsBasic, XpubDetailsTokens, XpubDetailsTokenBalances, XpubDetailsTxids, XpubDetailsTxs,
  BlockbookConfig, SystemInfo, BlockHashResponse, GetAddressDetailsOptions,
  UtxoDetails, UtxoDetailsXpub, GetUtxosOptions, GetXpubDetailsOptions,
  SendTxSuccess, SendTxError,
} from './types'
import { jsonRequest } from './utils'

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
  private requestCounter = 0

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

  async doRequest(
    method: 'GET' | 'POST', path: string, params?: object, body?: object, options?: Partial<request.Options>,
  ) {
    // Load balance using round robin. Helps any retry logic fallback to different nodes
    let node = this.nodes[this.requestCounter++ % this.nodes.length]
    return jsonRequest(node, method, path, params, body, options)
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
    // NOTE: sendtx POST doesn't work without trailing slash, and sendtx GET fails for large txs
    const response = await this.doRequest('POST', '/api/v2/sendtx/', undefined, undefined, { body: txHex, json: false })
    if (SendTxError.is(response)) {
      throw new Error(`blockbook sendtx returned error: ${response.error.message}`)
    } else {
      return (response as SendTxSuccess).result
    }
  }
}
