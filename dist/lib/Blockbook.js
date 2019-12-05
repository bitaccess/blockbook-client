import * as t from 'io-ts';
import { BaseBlockbook } from './BaseBlockbook';
import { NormalizedTxCommon, BlockInfoCommon, AddressDetailsCommonBasic, AddressDetailsCommonTokens, AddressDetailsCommonTokenBalances, AddressDetailsCommonTxids, AddressDetailsCommonTxs, } from './types';
export class Blockbook extends BaseBlockbook {
    constructor(config) {
        super(config, NormalizedTxCommon, t.any, BlockInfoCommon, {
            basic: AddressDetailsCommonBasic,
            tokens: AddressDetailsCommonTokens,
            tokenBalances: AddressDetailsCommonTokenBalances,
            txids: AddressDetailsCommonTxids,
            txs: AddressDetailsCommonTxs,
        });
    }
}
//# sourceMappingURL=Blockbook.js.map