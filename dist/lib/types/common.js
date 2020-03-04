import * as t from 'io-ts';
import { requiredOptionalCodec, extendCodec } from '@faast/ts-common';
export const Paginated = t.type({
    page: t.number,
    totalPages: t.number,
    itemsOnPage: t.number,
}, 'Paginated');
export const BlockbookConfig = requiredOptionalCodec({
    nodes: t.array(t.string),
}, {
    disableTypeValidation: t.boolean,
    debounce: t.number,
}, 'BlockbookConfig');
export const BlockbookInfo = t.type({
    coin: t.string,
    host: t.string,
    version: t.string,
    gitCommit: t.string,
    buildTime: t.string,
    syncMode: t.boolean,
    initialSync: t.boolean,
    inSync: t.boolean,
    bestHeight: t.number,
    lastBlockTime: t.string,
    inSyncMempool: t.boolean,
    lastMempoolTime: t.string,
    mempoolSize: t.number,
    decimals: t.number,
    dbSize: t.number,
    about: t.string,
}, 'BlockbookInfo');
export const BackendInfo = requiredOptionalCodec({
    chain: t.string,
    blocks: t.number,
    bestBlockHash: t.string,
    difficulty: t.string,
    version: t.string,
}, {
    protocolVersion: t.string,
    subversion: t.string,
    sizeOnDisk: t.number,
    headers: t.number,
    timeOffset: t.number,
    warnings: t.string,
}, 'BackendInfo');
export const SystemInfo = t.type({
    blockbook: BlockbookInfo,
    backend: BackendInfo,
}, 'ApiStatus');
export const BlockHashResponse = t.type({
    blockHash: t.string,
}, 'BlockHashResponse');
export const NormalizedTxCommonVin = requiredOptionalCodec({
    n: t.number,
}, {
    txid: t.string,
    vout: t.number,
    sequence: t.number,
    addresses: t.array(t.string),
    value: t.string,
    hex: t.string,
    asm: t.string,
    coinbase: t.string,
    isAddress: t.boolean,
}, 'NormalizedTxCommonVin');
export const NormalizedTxCommonVout = requiredOptionalCodec({
    n: t.number,
    addresses: t.array(t.string),
}, {
    value: t.string,
    spent: t.boolean,
    spentTxId: t.string,
    spentIndex: t.number,
    spentHeight: t.number,
    hex: t.string,
    asm: t.string,
    type: t.string,
    isAddress: t.boolean,
}, 'NormalizedTxCommonVout');
export const EthereumSpecific = t.type({
    status: t.number,
    nonce: t.number,
    gasLimit: t.number,
    gasUsed: t.number,
    gasPrice: t.string,
}, 'EthereumSpecific');
export const TokenTransfer = t.type({
    type: t.string,
    from: t.string,
    to: t.string,
    token: t.string,
    name: t.string,
    symbol: t.string,
    decimals: t.number,
    value: t.string,
}, 'TokenTransfer');
export const NormalizedTxCommon = requiredOptionalCodec({
    txid: t.string,
    vin: t.array(NormalizedTxCommonVin),
    vout: t.array(NormalizedTxCommonVout),
    blockHeight: t.number,
    confirmations: t.number,
    blockTime: t.number,
    value: t.string,
}, {
    version: t.number,
    lockTime: t.number,
    blockHash: t.string,
    size: t.number,
    valueIn: t.string,
    fees: t.string,
    hex: t.string,
    tokenTransfers: t.array(TokenTransfer),
    ethereumSpecific: EthereumSpecific,
}, 'NormalizedTxCommon');
export const GetAddressDetailsLevels = t.keyof({
    basic: null,
    tokens: null,
    tokenBalances: null,
    txids: null,
    txs: null,
});
export const GetAddressDetailsOptions = t.partial({
    page: t.number,
    pageSize: t.number,
    from: t.number,
    to: t.number,
    details: GetAddressDetailsLevels,
});
export const TokenDetailsTypeERC20 = t.literal('ERC20');
export const TokenDetailsTypeXpubAddress = t.literal('XPUBAddress');
export const TokenDetailsType = t.union([
    TokenDetailsTypeERC20,
    TokenDetailsTypeXpubAddress,
], 'TokenDetailsType');
export const TokenDetailsCommon = requiredOptionalCodec({
    type: TokenDetailsType,
    name: t.string,
    transfers: t.number,
}, {
    path: t.string,
    contract: t.string,
    symbol: t.string,
    decimals: t.number,
    balance: t.string,
    totalReceived: t.string,
    totalSent: t.string,
}, 'TokenDetailsCommon');
export const TokenDetailsCommonBalance = extendCodec(TokenDetailsCommon, {
    balance: t.string,
}, 'TokenDetailsCommonBalance');
export const AddressDetailsCommonBasic = requiredOptionalCodec({
    address: t.string,
    balance: t.string,
    unconfirmedBalance: t.string,
    unconfirmedTxs: t.number,
    txs: t.number,
}, {
    totalReceived: t.string,
    totalSent: t.string,
    nonTokenTxs: t.number,
    nonce: t.string,
    usedTokens: t.number,
    erc20Contract: t.any,
}, 'AddressDetailsCommonBasic');
export const AddressDetailsCommonTokens = extendCodec(AddressDetailsCommonBasic, {
    tokens: t.array(TokenDetailsCommon),
}, 'AddressDetailsCommonTokens');
export const AddressDetailsCommonTokenBalances = extendCodec(AddressDetailsCommonBasic, {}, {
    tokens: t.array(TokenDetailsCommonBalance),
}, 'AddressDetailsCommonTokenBalances');
export const AddressDetailsCommonTxids = extendCodec(AddressDetailsCommonTokenBalances, Paginated.props, {
    txids: t.array(t.string),
}, 'AddressDetailsCommonTxids');
export const AddressDetailsCommonTxs = extendCodec(AddressDetailsCommonTokenBalances, Paginated.props, {
    txs: t.array(NormalizedTxCommon),
}, 'AddressDetailsCommonTxs');
export const GetUtxosOptions = t.partial({
    confirmed: t.boolean,
}, 'GetUtxosOptions');
export const UtxoDetails = requiredOptionalCodec({
    txid: t.string,
    vout: t.number,
    value: t.string,
    confirmations: t.number,
}, {
    height: t.number,
    coinbase: t.boolean,
    lockTime: t.number,
}, 'UtxoDetails');
export const UtxoDetailsXpub = extendCodec(UtxoDetails, {}, {
    address: t.string,
    path: t.string,
}, 'UtxoDetailsXpub');
export const BlockInfoCommon = requiredOptionalCodec({
    ...Paginated.props,
    hash: t.string,
    height: t.number,
    confirmations: t.number,
    size: t.number,
    version: t.number,
    merkleRoot: t.string,
    nonce: t.string,
    bits: t.string,
    difficulty: t.string,
    txCount: t.number,
}, {
    previousBlockHash: t.string,
    nextBlockHash: t.string,
    time: t.number,
    txs: t.array(NormalizedTxCommon),
}, 'BlockInfoCommon');
export const SendTxSuccess = t.type({
    result: t.string,
}, 'SendTransactionSuccess');
export const SendTxError = t.type({
    error: t.type({
        message: t.string,
    })
}, 'SendTxFailed');
//# sourceMappingURL=common.js.map