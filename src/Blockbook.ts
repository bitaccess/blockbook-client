import * as t from 'io-ts'
import { BaseBlockbook } from './BaseBlockbook'
import {
  BlockbookConfig,
  NormalizedTxCommon,
  BlockInfoCommon,
  AddressDetailsCommonBasic,
  AddressDetailsCommonTokens,
  AddressDetailsCommonTokenBalances,
  AddressDetailsCommonTxids,
  AddressDetailsCommonTxs,
} from './types'

/**
 * A common implementation of the blockbook wrapper without any coin specific typings
 */
export class Blockbook extends BaseBlockbook<
  NormalizedTxCommon,
  any,
  BlockInfoCommon,
  AddressDetailsCommonBasic,
  AddressDetailsCommonTokens,
  AddressDetailsCommonTokenBalances,
  AddressDetailsCommonTxids,
  AddressDetailsCommonTxs
> {
  constructor(config: BlockbookConfig) {
    super(
      config,
      NormalizedTxCommon,
      t.any,
      BlockInfoCommon,
      {
        basic: AddressDetailsCommonBasic,
        tokens: AddressDetailsCommonTokens,
        tokenBalances: AddressDetailsCommonTokenBalances,
        txids: AddressDetailsCommonTxids,
        txs: AddressDetailsCommonTxs,
      }
    )
  }
}
