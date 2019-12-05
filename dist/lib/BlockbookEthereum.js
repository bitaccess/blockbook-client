import { BaseBlockbook } from './BaseBlockbook';
import { NormalizedTxEthereum, SpecificTxEthereum, BlockInfoEthereum, AddressDetailsEthereumBasic, AddressDetailsEthereumTokens, AddressDetailsEthereumTokenBalances, AddressDetailsEthereumTxids, AddressDetailsEthereumTxs, } from './types';
export class BlockbookEthereum extends BaseBlockbook {
    constructor(config) {
        super(config, NormalizedTxEthereum, SpecificTxEthereum, BlockInfoEthereum, {
            basic: AddressDetailsEthereumBasic,
            tokens: AddressDetailsEthereumTokens,
            tokenBalances: AddressDetailsEthereumTokenBalances,
            txids: AddressDetailsEthereumTxids,
            txs: AddressDetailsEthereumTxs,
        });
    }
    async getXpubDetails() {
        throw new Error('BlockbookEthereum.getXpubDetails not supported');
    }
    async getUtxosForAddress() {
        throw new Error('BlockbookEthereum.getUtxosForAddress not supported');
    }
    async getUtxosForXpub() {
        throw new Error('BlockbookEthereum.getUtxosForXpub not supported');
    }
}
//# sourceMappingURL=BlockbookEthereum.js.map