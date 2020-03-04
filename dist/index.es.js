import { type, number, array, string, boolean, keyof, partial, literal, union, any } from 'io-ts';
import { requiredOptionalCodec, extendCodec, isString, assertType } from '@faast/ts-common';
import request from 'request-promise-native';
import qs from 'qs';
import { isObject } from 'util';

const Paginated = type({
    page: number,
    totalPages: number,
    itemsOnPage: number,
}, 'Paginated');
const BlockbookConfig = requiredOptionalCodec({
    nodes: array(string),
}, {
    disableTypeValidation: boolean,
    debounce: number,
}, 'BlockbookConfig');
const BlockbookInfo = type({
    coin: string,
    host: string,
    version: string,
    gitCommit: string,
    buildTime: string,
    syncMode: boolean,
    initialSync: boolean,
    inSync: boolean,
    bestHeight: number,
    lastBlockTime: string,
    inSyncMempool: boolean,
    lastMempoolTime: string,
    mempoolSize: number,
    decimals: number,
    dbSize: number,
    about: string,
}, 'BlockbookInfo');
const BackendInfo = requiredOptionalCodec({
    chain: string,
    blocks: number,
    bestBlockHash: string,
    difficulty: string,
    version: string,
}, {
    protocolVersion: string,
    subversion: string,
    sizeOnDisk: number,
    headers: number,
    timeOffset: number,
    warnings: string,
}, 'BackendInfo');
const SystemInfo = type({
    blockbook: BlockbookInfo,
    backend: BackendInfo,
}, 'ApiStatus');
const BlockHashResponse = type({
    blockHash: string,
}, 'BlockHashResponse');
const NormalizedTxCommonVin = requiredOptionalCodec({
    n: number,
}, {
    txid: string,
    vout: number,
    sequence: number,
    addresses: array(string),
    value: string,
    hex: string,
    asm: string,
    coinbase: string,
    isAddress: boolean,
}, 'NormalizedTxCommonVin');
const NormalizedTxCommonVout = requiredOptionalCodec({
    n: number,
    addresses: array(string),
}, {
    value: string,
    spent: boolean,
    spentTxId: string,
    spentIndex: number,
    spentHeight: number,
    hex: string,
    asm: string,
    type: string,
    isAddress: boolean,
}, 'NormalizedTxCommonVout');
const EthereumSpecific = type({
    status: number,
    nonce: number,
    gasLimit: number,
    gasUsed: number,
    gasPrice: string,
}, 'EthereumSpecific');
const TokenTransfer = type({
    type: string,
    from: string,
    to: string,
    token: string,
    name: string,
    symbol: string,
    decimals: number,
    value: string,
}, 'TokenTransfer');
const NormalizedTxCommon = requiredOptionalCodec({
    txid: string,
    vin: array(NormalizedTxCommonVin),
    vout: array(NormalizedTxCommonVout),
    blockHeight: number,
    confirmations: number,
    blockTime: number,
    value: string,
}, {
    version: number,
    lockTime: number,
    blockHash: string,
    size: number,
    valueIn: string,
    fees: string,
    hex: string,
    tokenTransfers: array(TokenTransfer),
    ethereumSpecific: EthereumSpecific,
}, 'NormalizedTxCommon');
const GetAddressDetailsLevels = keyof({
    basic: null,
    tokens: null,
    tokenBalances: null,
    txids: null,
    txs: null,
});
const GetAddressDetailsOptions = partial({
    page: number,
    pageSize: number,
    from: number,
    to: number,
    details: GetAddressDetailsLevels,
});
const TokenDetailsTypeERC20 = literal('ERC20');
const TokenDetailsTypeXpubAddress = literal('XPUBAddress');
const TokenDetailsType = union([
    TokenDetailsTypeERC20,
    TokenDetailsTypeXpubAddress,
], 'TokenDetailsType');
const TokenDetailsCommon = requiredOptionalCodec({
    type: TokenDetailsType,
    name: string,
    transfers: number,
}, {
    path: string,
    contract: string,
    symbol: string,
    decimals: number,
    balance: string,
    totalReceived: string,
    totalSent: string,
}, 'TokenDetailsCommon');
const TokenDetailsCommonBalance = extendCodec(TokenDetailsCommon, {
    balance: string,
}, 'TokenDetailsCommonBalance');
const AddressDetailsCommonBasic = requiredOptionalCodec({
    address: string,
    balance: string,
    unconfirmedBalance: string,
    unconfirmedTxs: number,
    txs: number,
}, {
    totalReceived: string,
    totalSent: string,
    nonTokenTxs: number,
    nonce: string,
    usedTokens: number,
    erc20Contract: any,
}, 'AddressDetailsCommonBasic');
const AddressDetailsCommonTokens = extendCodec(AddressDetailsCommonBasic, {
    tokens: array(TokenDetailsCommon),
}, 'AddressDetailsCommonTokens');
const AddressDetailsCommonTokenBalances = extendCodec(AddressDetailsCommonBasic, {}, {
    tokens: array(TokenDetailsCommonBalance),
}, 'AddressDetailsCommonTokenBalances');
const AddressDetailsCommonTxids = extendCodec(AddressDetailsCommonTokenBalances, Paginated.props, {
    txids: array(string),
}, 'AddressDetailsCommonTxids');
const AddressDetailsCommonTxs = extendCodec(AddressDetailsCommonTokenBalances, Paginated.props, {
    txs: array(NormalizedTxCommon),
}, 'AddressDetailsCommonTxs');
const GetUtxosOptions = partial({
    confirmed: boolean,
}, 'GetUtxosOptions');
const UtxoDetails = requiredOptionalCodec({
    txid: string,
    vout: number,
    value: string,
    confirmations: number,
}, {
    height: number,
    coinbase: boolean,
    lockTime: number,
}, 'UtxoDetails');
const UtxoDetailsXpub = extendCodec(UtxoDetails, {}, {
    address: string,
    path: string,
}, 'UtxoDetailsXpub');
const BlockInfoCommon = requiredOptionalCodec({
    ...Paginated.props,
    hash: string,
    height: number,
    confirmations: number,
    size: number,
    version: number,
    merkleRoot: string,
    nonce: string,
    bits: string,
    difficulty: string,
    txCount: number,
}, {
    previousBlockHash: string,
    nextBlockHash: string,
    time: number,
    txs: array(NormalizedTxCommon),
}, 'BlockInfoCommon');
const SendTxSuccess = type({
    result: string,
}, 'SendTransactionSuccess');
const SendTxError = type({
    error: type({
        message: string,
    })
}, 'SendTxFailed');

const NormalizedTxBitcoinVin = extendCodec(NormalizedTxCommonVin, {
    value: string,
}, 'NormalizedTxBitcoinVin');
const NormalizedTxBitcoinVout = extendCodec(NormalizedTxCommonVout, {
    value: string,
}, 'NormalizedTxBitcoinVout');
const NormalizedTxBitcoin = extendCodec(NormalizedTxCommon, {
    vin: array(NormalizedTxBitcoinVin),
    vout: array(NormalizedTxBitcoinVout),
    valueIn: string,
    fees: string,
}, 'NormalizedTxBitcoin');
const SpecificTxBitcoinVinScriptSig = type({
    asm: string,
    hex: string,
}, 'SpecificTxBitcoinVinScriptSig');
const SpecificTxBitcoinVin = type({
    txid: string,
    vout: number,
    scriptSig: SpecificTxBitcoinVinScriptSig,
    sequence: number
}, 'SpecificTxBitcoinVin');
const SpecificTxBitcoinVoutScriptPubKey = type({
    asm: string,
    hex: string,
    reqSigs: number,
    type: string,
    addresses: array(string),
}, 'SpecificTxBitcoinVoutScriptPubKey');
const SpecificTxBitcoinVout = type({
    value: number,
    n: number,
    scriptPubKey: SpecificTxBitcoinVoutScriptPubKey,
}, 'SpecificTxBitcoinVout');
const SpecificTxBitcoin = type({
    txid: string,
    hash: string,
    version: number,
    size: number,
    vsize: number,
    weight: number,
    locktime: number,
    vin: array(SpecificTxBitcoinVin),
    vout: array(SpecificTxBitcoinVout),
    hex: string,
    blockhash: string,
    confirmations: number,
    time: number,
    blocktime: number,
}, 'SpecificTxBitcoin');
const AddressDetailsBitcoinBasic = extendCodec(AddressDetailsCommonBasic, {
    totalReceived: string,
    totalSent: string,
}, 'AddressDetailsBitcoinBasic');
const AddressDetailsBitcoinTokens = AddressDetailsBitcoinBasic;
const AddressDetailsBitcoinTokenBalances = AddressDetailsBitcoinBasic;
const AddressDetailsBitcoinTxids = extendCodec(AddressDetailsBitcoinTokenBalances, Paginated.props, {
    txids: array(string),
}, 'AddressDetailsBitcoinTxids');
const AddressDetailsBitcoinTxs = extendCodec(AddressDetailsBitcoinTokenBalances, Paginated.props, {
    transactions: array(NormalizedTxBitcoin),
}, 'AddressDetailsBitcoinTxs');
const GetXpubDetailsTokensOption = keyof({
    nonzero: null,
    used: null,
    derived: null,
}, 'GetXpubDetailsTokensOption');
const GetXpubDetailsOptions = extendCodec(GetAddressDetailsOptions, {}, {
    usedTokens: number,
    tokens: GetXpubDetailsTokensOption,
}, 'GetXpubDetailsOptions');
const TokenDetailsXpubAddress = type({
    type: TokenDetailsTypeXpubAddress,
    name: string,
    path: string,
    transfers: number,
    decimals: number,
    balance: string,
    totalReceived: string,
    totalSent: string,
}, 'TokenDetailsXpubAddress');
const TokenDetailsXpubAddressBalance = extendCodec(TokenDetailsXpubAddress, {
    balance: string,
}, 'TokenDetailsXpubAddressBalance');
const XpubDetailsBasic = AddressDetailsBitcoinBasic;
const XpubDetailsTokens = extendCodec(XpubDetailsBasic, {}, {
    tokens: TokenDetailsXpubAddress,
}, 'XpubDetailsTokens');
const XpubDetailsTokenBalances = extendCodec(XpubDetailsBasic, {}, {
    tokens: TokenDetailsXpubAddressBalance,
}, 'XpubDetailsTokenBalances');
const XpubDetailsTxids = extendCodec(XpubDetailsTokenBalances, Paginated.props, {
    txids: array(string),
}, 'XpubDetailsTxids');
const XpubDetailsTxs = extendCodec(XpubDetailsTokenBalances, Paginated.props, {
    transactions: array(NormalizedTxBitcoin),
}, 'XpubDetailsTxs');
const BlockInfoBitcoin = extendCodec(BlockInfoCommon, {}, {
    txs: array(NormalizedTxBitcoin),
}, 'BlockInfoBitcoin');

const NormalizedTxEthereumVin = extendCodec(NormalizedTxCommonVin, {
    addresses: array(string),
}, 'NormalizedTxEthereumVin');
const NormalizedTxEthereumVout = extendCodec(NormalizedTxCommonVout, {
    value: string,
}, 'NormalizedTxEthereumVout');
const NormalizedTxEthereum = extendCodec(NormalizedTxCommon, {
    vin: array(NormalizedTxEthereumVin),
    vout: array(NormalizedTxEthereumVout),
    fees: string,
    ethereumSpecific: EthereumSpecific,
}, 'NormalizedTxEthereum');
const SpecificTxEthereumTx = type({
    nonce: string,
    gasPrice: string,
    gas: string,
    to: string,
    value: string,
    input: string,
    hash: string,
    blockNumber: string,
    blockHash: string,
    from: string,
    transactionIndex: string,
}, 'SpecificTxEthereumTx');
const SpecificTxEthereumReceipt = type({
    gasUsed: string,
    status: string,
    logs: array(any),
}, 'SpecificTxEthereumReceipt');
const SpecificTxEthereum = type({
    tx: SpecificTxEthereumTx,
    receipt: SpecificTxEthereumReceipt,
}, 'SpecificTxEthereum');
const TokenDetailsERC20 = type({
    type: TokenDetailsTypeERC20,
    name: string,
    contract: string,
    transfers: number,
    symbol: string,
}, 'TokenDetailsERC20');
const TokenDetailsERC20Balance = extendCodec(TokenDetailsERC20, {
    balance: string,
}, 'TokenDetailsERC20Balance');
const AddressDetailsEthereumBasic = extendCodec(AddressDetailsCommonBasic, {
    nonTokenTxs: number,
    nonce: string,
}, 'AddressDetailsEthereumBasic');
const AddressDetailsEthereumTokens = extendCodec(AddressDetailsEthereumBasic, {}, {
    tokens: TokenDetailsERC20,
}, 'AddressDetailsEthereumTokens');
const AddressDetailsEthereumTokenBalances = extendCodec(AddressDetailsEthereumBasic, {}, {
    tokens: TokenDetailsERC20Balance,
}, 'AddressDetailsEthereumTokenBalances');
const AddressDetailsEthereumTxids = extendCodec(AddressDetailsEthereumTokenBalances, Paginated.props, {
    txids: array(string),
}, 'AddressDetailsEthereumTxids');
const AddressDetailsEthereumTxs = extendCodec(AddressDetailsEthereumTokenBalances, Paginated.props, {
    transactions: array(NormalizedTxEthereum),
}, 'AddressDetailsEthereumTxs');
const BlockInfoEthereum = extendCodec(BlockInfoCommon, {}, {
    txs: array(NormalizedTxEthereum),
}, 'BlockInfoEthereum');

async function jsonRequest(host, method, path, params, body, options) {
    let origin = host;
    if (!origin.startsWith('http')) {
        origin = `https://${host}`;
    }
    try {
        return await request(`${origin}${path}${params ? qs.stringify(params, { addQueryPrefix: true }) : ''}`, {
            method,
            body,
            json: true,
            ...options,
        });
    }
    catch (e) {
        const eString = e.toString();
        if (eString.includes('StatusCodeError')) {
            const error = e;
            const body = error.response.body;
            if (isObject(body) && body.error) {
                if (isString(body.error)) {
                    throw new Error(body.error);
                }
                else if (isObject(body.error) && isString(body.error.message)) {
                    throw new Error(body.error.message);
                }
            }
        }
        throw e;
    }
}

const xpubDetailsCodecs = {
    basic: XpubDetailsBasic,
    tokens: XpubDetailsTokens,
    tokenBalances: XpubDetailsTokenBalances,
    txids: XpubDetailsTxids,
    txs: XpubDetailsTxs,
};
class BaseBlockbook {
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
        return jsonRequest(node, method, path, params, body, options);
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
        return this.doAssertType(array(UtxoDetails), response);
    }
    async getUtxosForXpub(xpub, options = {}) {
        const response = await this.doRequest('GET', `/api/v2/utxo/${xpub}`, options);
        return this.doAssertType(array(UtxoDetailsXpub), response);
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

class Blockbook extends BaseBlockbook {
    constructor(config) {
        super(config, NormalizedTxCommon, any, BlockInfoCommon, {
            basic: AddressDetailsCommonBasic,
            tokens: AddressDetailsCommonTokens,
            tokenBalances: AddressDetailsCommonTokenBalances,
            txids: AddressDetailsCommonTxids,
            txs: AddressDetailsCommonTxs,
        });
    }
}

class BlockbookBitcoin extends BaseBlockbook {
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

class BlockbookEthereum extends BaseBlockbook {
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

export { AddressDetailsBitcoinBasic, AddressDetailsBitcoinTokenBalances, AddressDetailsBitcoinTokens, AddressDetailsBitcoinTxids, AddressDetailsBitcoinTxs, AddressDetailsCommonBasic, AddressDetailsCommonTokenBalances, AddressDetailsCommonTokens, AddressDetailsCommonTxids, AddressDetailsCommonTxs, AddressDetailsEthereumBasic, AddressDetailsEthereumTokenBalances, AddressDetailsEthereumTokens, AddressDetailsEthereumTxids, AddressDetailsEthereumTxs, BackendInfo, BaseBlockbook, BlockHashResponse, BlockInfoBitcoin, BlockInfoCommon, BlockInfoEthereum, Blockbook, BlockbookBitcoin, BlockbookConfig, BlockbookEthereum, BlockbookInfo, EthereumSpecific, GetAddressDetailsLevels, GetAddressDetailsOptions, GetUtxosOptions, GetXpubDetailsOptions, GetXpubDetailsTokensOption, NormalizedTxBitcoin, NormalizedTxBitcoinVin, NormalizedTxBitcoinVout, NormalizedTxCommon, NormalizedTxCommonVin, NormalizedTxCommonVout, NormalizedTxEthereum, NormalizedTxEthereumVin, NormalizedTxEthereumVout, Paginated, SendTxError, SendTxSuccess, SpecificTxBitcoin, SpecificTxBitcoinVin, SpecificTxBitcoinVinScriptSig, SpecificTxBitcoinVout, SpecificTxBitcoinVoutScriptPubKey, SpecificTxEthereum, SpecificTxEthereumReceipt, SpecificTxEthereumTx, SystemInfo, TokenDetailsCommon, TokenDetailsCommonBalance, TokenDetailsERC20, TokenDetailsERC20Balance, TokenDetailsType, TokenDetailsTypeERC20, TokenDetailsTypeXpubAddress, TokenDetailsXpubAddress, TokenDetailsXpubAddressBalance, TokenTransfer, UtxoDetails, UtxoDetailsXpub, XpubDetailsBasic, XpubDetailsTokenBalances, XpubDetailsTokens, XpubDetailsTxids, XpubDetailsTxs };
//# sourceMappingURL=index.es.js.map
