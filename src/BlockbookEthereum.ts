import { BaseBlockbook } from './BaseBlockbook'
import {
  BlockbookConfig,
  NormalizedTxEthereum,
  SpecificTxEthereum,
  BlockInfoEthereum,
  AddressDetailsEthereumBasic,
  AddressDetailsEthereumTokens,
  AddressDetailsEthereumTokenBalances,
  AddressDetailsEthereumTxids,
  AddressDetailsEthereumTxs,
} from './types'

/**
 * An implementation of the blockbook wrapper with typings for Ethereum (and Ethereum-like coins)
 */
export class BlockbookEthereum extends BaseBlockbook<
  NormalizedTxEthereum,
  SpecificTxEthereum,
  BlockInfoEthereum,
  AddressDetailsEthereumBasic,
  AddressDetailsEthereumTokens,
  AddressDetailsEthereumTokenBalances,
  AddressDetailsEthereumTxids,
  AddressDetailsEthereumTxs
> {
  constructor(config: BlockbookConfig) {
    super(config, NormalizedTxEthereum, SpecificTxEthereum, BlockInfoEthereum, {
      basic: AddressDetailsEthereumBasic,
      tokens: AddressDetailsEthereumTokens,
      tokenBalances: AddressDetailsEthereumTokenBalances,
      txids: AddressDetailsEthereumTxids,
      txs: AddressDetailsEthereumTxs,
    })
  }

  async getXpubDetails(): Promise<never> {
    throw new Error('BlockbookEthereum.getXpubDetails not supported')
  }

  async getUtxosForAddress(): Promise<never> {
    throw new Error('BlockbookEthereum.getUtxosForAddress not supported')
  }

  async getUtxosForXpub(): Promise<never> {
    throw new Error('BlockbookEthereum.getUtxosForXpub not supported')
  }
}
