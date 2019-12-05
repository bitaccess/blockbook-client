import { BaseBlockbook } from './BaseBlockbook';
import { NormalizedTxBitcoin, SpecificTxBitcoin, BlockInfoBitcoin, AddressDetailsBitcoinBasic, AddressDetailsBitcoinTokens, AddressDetailsBitcoinTokenBalances, AddressDetailsBitcoinTxids, AddressDetailsBitcoinTxs, } from './types';
export class BlockbookBitcoin extends BaseBlockbook {
    constructor(config) {
        super(config, NormalizedTxBitcoin, SpecificTxBitcoin, BlockInfoBitcoin, {
            basic: AddressDetailsBitcoinBasic,
            tokens: AddressDetailsBitcoinTokens,
            tokenBalances: AddressDetailsBitcoinTokenBalances,
            txids: AddressDetailsBitcoinTxids,
            txs: AddressDetailsBitcoinTxs,
        });
    }
}
//# sourceMappingURL=BlockbookBitcoin.js.map