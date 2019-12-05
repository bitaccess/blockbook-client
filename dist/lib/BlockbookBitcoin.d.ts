import { BaseBlockbook } from './BaseBlockbook';
import { BlockbookConfig, NormalizedTxBitcoin, SpecificTxBitcoin, BlockInfoBitcoin, AddressDetailsBitcoinBasic, AddressDetailsBitcoinTokens, AddressDetailsBitcoinTokenBalances, AddressDetailsBitcoinTxids, AddressDetailsBitcoinTxs } from './types';
export declare class BlockbookBitcoin extends BaseBlockbook<NormalizedTxBitcoin, SpecificTxBitcoin, BlockInfoBitcoin, AddressDetailsBitcoinBasic, AddressDetailsBitcoinTokens, AddressDetailsBitcoinTokenBalances, AddressDetailsBitcoinTxids, AddressDetailsBitcoinTxs> {
    constructor(config: BlockbookConfig);
}
