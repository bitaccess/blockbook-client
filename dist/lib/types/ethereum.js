import * as t from 'io-ts';
import { extendCodec } from '@faast/ts-common';
import { NormalizedTxCommonVin, NormalizedTxCommonVout, NormalizedTxCommon, EthereumSpecific, TokenDetailsTypeERC20, AddressDetailsCommonBasic, Paginated, BlockInfoCommon, } from './common';
export const NormalizedTxEthereumVin = extendCodec(NormalizedTxCommonVin, {
    addresses: t.array(t.string),
}, 'NormalizedTxEthereumVin');
export const NormalizedTxEthereumVout = extendCodec(NormalizedTxCommonVout, {
    value: t.string,
}, 'NormalizedTxEthereumVout');
export const NormalizedTxEthereum = extendCodec(NormalizedTxCommon, {
    vin: t.array(NormalizedTxEthereumVin),
    vout: t.array(NormalizedTxEthereumVout),
    fees: t.string,
    ethereumSpecific: EthereumSpecific,
}, 'NormalizedTxEthereum');
export const SpecificTxEthereumTx = t.type({
    nonce: t.string,
    gasPrice: t.string,
    gas: t.string,
    to: t.string,
    value: t.string,
    input: t.string,
    hash: t.string,
    blockNumber: t.string,
    blockHash: t.string,
    from: t.string,
    transactionIndex: t.string,
}, 'SpecificTxEthereumTx');
export const SpecificTxEthereumReceipt = t.type({
    gasUsed: t.string,
    status: t.string,
    logs: t.array(t.any),
}, 'SpecificTxEthereumReceipt');
export const SpecificTxEthereum = t.type({
    tx: SpecificTxEthereumTx,
    receipt: SpecificTxEthereumReceipt,
}, 'SpecificTxEthereum');
export const TokenDetailsERC20 = t.type({
    type: TokenDetailsTypeERC20,
    name: t.string,
    contract: t.string,
    transfers: t.number,
    symbol: t.string,
}, 'TokenDetailsERC20');
export const TokenDetailsERC20Balance = extendCodec(TokenDetailsERC20, {
    balance: t.string,
}, 'TokenDetailsERC20Balance');
export const AddressDetailsEthereumBasic = extendCodec(AddressDetailsCommonBasic, {
    nonTokenTxs: t.number,
    nonce: t.string,
}, 'AddressDetailsEthereumBasic');
export const AddressDetailsEthereumTokens = extendCodec(AddressDetailsEthereumBasic, {}, {
    tokens: TokenDetailsERC20,
}, 'AddressDetailsEthereumTokens');
export const AddressDetailsEthereumTokenBalances = extendCodec(AddressDetailsEthereumBasic, {}, {
    tokens: TokenDetailsERC20Balance,
}, 'AddressDetailsEthereumTokenBalances');
export const AddressDetailsEthereumTxids = extendCodec(AddressDetailsEthereumTokenBalances, Paginated.props, {
    txids: t.array(t.string),
}, 'AddressDetailsEthereumTxids');
export const AddressDetailsEthereumTxs = extendCodec(AddressDetailsEthereumTokenBalances, Paginated.props, {
    transactions: t.array(NormalizedTxEthereum),
}, 'AddressDetailsEthereumTxs');
export const BlockInfoEthereum = extendCodec(BlockInfoCommon, {}, {
    txs: t.array(NormalizedTxEthereum),
}, 'BlockInfoEthereum');
//# sourceMappingURL=ethereum.js.map