import { assertType } from '@faast/ts-common';
import * as t from 'io-ts';
import { XpubDetailsBasic, XpubDetailsTokens, XpubDetailsTokenBalances, XpubDetailsTxids, XpubDetailsTxs, BlockbookConfig, SystemInfo, BlockHashResponse, UtxoDetails, UtxoDetailsXpub, SendTxError, } from './types';
import { debouncedRequest } from './utils';
const xpubDetailsCodecs = {
    basic: XpubDetailsBasic,
    tokens: XpubDetailsTokens,
    tokenBalances: XpubDetailsTokenBalances,
    txids: XpubDetailsTxids,
    txs: XpubDetailsTxs,
};
export class BaseBlockbook {
    constructor(config, normalizedTxCodec, specificTxCodec, blockInfoCodec, addressDetailsCodecs) {
        this.normalizedTxCodec = normalizedTxCodec;
        this.specificTxCodec = specificTxCodec;
        this.blockInfoCodec = blockInfoCodec;
        this.addressDetailsCodecs = addressDetailsCodecs;
        config = assertType(BlockbookConfig, config);
        this.nodes = config.nodes;
        if (this.nodes.length === 0) {
            throw new Error('Blockbook node list must not be empty');
        }
        this.disableTypeValidation = config.disableTypeValidation || false;
    }
    doAssertType(codec, value, ...rest) {
        if (this.disableTypeValidation) {
            return value;
        }
        return assertType(codec, value, ...rest);
    }
    async doRequest(method, path, params, body, options) {
        let node = this.nodes[Math.floor(Math.random() * this.nodes.length)];
        return debouncedRequest(node, method, path, params, body, options);
    }
    async getStatus() {
        const response = await this.doRequest('GET', '/api/v2');
        return this.doAssertType(SystemInfo, response);
    }
    async getBlockHash(blockNumber) {
        const response = await this.doRequest('GET', `/api/v2/block-index/${blockNumber}`);
        const { blockHash } = this.doAssertType(BlockHashResponse, response);
        return blockHash;
    }
    async getTx(txid) {
        const response = await this.doRequest('GET', `/api/v2/tx/${txid}`);
        return this.doAssertType(this.normalizedTxCodec, response);
    }
    async getTxSpecific(txid) {
        const response = await this.doRequest('GET', `/api/v2/tx-specific/${txid}`);
        return this.doAssertType(this.specificTxCodec, response);
    }
    async getAddressDetails(address, options = {}) {
        const response = await this.doRequest('GET', `/api/v2/address/${address}`, options);
        const detailsLevel = options.details || 'txids';
        const codec = this.addressDetailsCodecs[detailsLevel];
        return this.doAssertType(codec, response);
    }
    async getXpubDetails(xpub, options = {}) {
        const response = await this.doRequest('GET', `/api/v2/xpub/${xpub}`, options);
        const detailsLevel = options.details || 'txids';
        const codec = xpubDetailsCodecs[detailsLevel];
        return this.doAssertType(codec, response);
    }
    async getUtxosForAddress(address, options = {}) {
        const response = await this.doRequest('GET', `/api/v2/utxo/${address}`, options);
        return this.doAssertType(t.array(UtxoDetails), response);
    }
    async getUtxosForXpub(xpub, options = {}) {
        const response = await this.doRequest('GET', `/api/v2/utxo/${xpub}`, options);
        return this.doAssertType(t.array(UtxoDetailsXpub), response);
    }
    async getBlock(block) {
        const response = await this.doRequest('GET', `/api/v2/block/${block}`);
        return this.doAssertType(this.blockInfoCodec, response);
    }
    async sendTx(txHex) {
        const response = await this.doRequest('GET', `/api/v2/sendtx/${txHex}`);
        if (SendTxError.is(response)) {
            throw new Error(`blockbook sendtx returned error: ${response.error.message}`);
        }
        else {
            return response.result;
        }
    }
}
//# sourceMappingURL=BaseBlockbook.js.map