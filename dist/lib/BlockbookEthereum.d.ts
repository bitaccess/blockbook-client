import { BaseBlockbook } from './BaseBlockbook';
import { BlockbookConfig, NormalizedTxEthereum, SpecificTxEthereum, BlockInfoEthereum, AddressDetailsEthereumBasic, AddressDetailsEthereumTokens, AddressDetailsEthereumTokenBalances, AddressDetailsEthereumTxids, AddressDetailsEthereumTxs } from './types';
export declare class BlockbookEthereum extends BaseBlockbook<NormalizedTxEthereum, SpecificTxEthereum, BlockInfoEthereum, AddressDetailsEthereumBasic, AddressDetailsEthereumTokens, AddressDetailsEthereumTokenBalances, AddressDetailsEthereumTxids, AddressDetailsEthereumTxs> {
    constructor(config: BlockbookConfig);
    getXpubDetails(): Promise<never>;
    getUtxosForAddress(): Promise<never>;
    getUtxosForXpub(): Promise<never>;
}
