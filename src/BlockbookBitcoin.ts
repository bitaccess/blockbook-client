import { BaseBlockbook } from './BaseBlockbook'
import {
  BlockbookConfig,
  NormalizedTxBitcoin,
  SpecificTxBitcoin,
  BlockInfoBitcoin,
  AddressDetailsBitcoinBasic,
  AddressDetailsBitcoinTokens,
  AddressDetailsBitcoinTokenBalances,
  AddressDetailsBitcoinTxids,
  AddressDetailsBitcoinTxs,
} from './types'

/**
 * An implementation of the blockbook wrapper with typings for Bitcoin (and Bitcoin-like coins)
 */
export class BlockbookBitcoin extends BaseBlockbook<
  NormalizedTxBitcoin,
  SpecificTxBitcoin,
  BlockInfoBitcoin,
  AddressDetailsBitcoinBasic,
  AddressDetailsBitcoinTokens,
  AddressDetailsBitcoinTokenBalances,
  AddressDetailsBitcoinTxids,
  AddressDetailsBitcoinTxs
> {
  constructor(config: BlockbookConfig) {
    super(
      config,
      NormalizedTxBitcoin,
      SpecificTxBitcoin,
      BlockInfoBitcoin,
      {
        basic: AddressDetailsBitcoinBasic,
        tokens: AddressDetailsBitcoinTokens,
        tokenBalances: AddressDetailsBitcoinTokenBalances,
        txids: AddressDetailsBitcoinTxids,
        txs: AddressDetailsBitcoinTxs,
      }
    )
  }
}
