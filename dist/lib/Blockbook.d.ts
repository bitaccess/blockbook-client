import { BaseBlockbook } from './BaseBlockbook';
import { BlockbookConfig, NormalizedTxCommon, BlockInfoCommon, AddressDetailsCommonBasic, AddressDetailsCommonTokens, AddressDetailsCommonTokenBalances, AddressDetailsCommonTxids, AddressDetailsCommonTxs } from './types';
export declare class Blockbook extends BaseBlockbook<NormalizedTxCommon, any, BlockInfoCommon, AddressDetailsCommonBasic, AddressDetailsCommonTokens, AddressDetailsCommonTokenBalances, AddressDetailsCommonTxids, AddressDetailsCommonTxs> {
    constructor(config: BlockbookConfig);
}
