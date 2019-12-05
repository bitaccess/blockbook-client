import * as t from 'io-ts';
import { extendCodec } from '@faast/ts-common';
import { NormalizedTxCommonVin, NormalizedTxCommonVout, NormalizedTxCommon, AddressDetailsCommonBasic, Paginated, GetAddressDetailsOptions, TokenDetailsTypeXpubAddress, BlockInfoCommon } from './common';
export const NormalizedTxBitcoinVin = extendCodec(NormalizedTxCommonVin, {
    value: t.string,
}, 'NormalizedTxBitcoinVin');
export const NormalizedTxBitcoinVout = extendCodec(NormalizedTxCommonVout, {
    value: t.string,
}, 'NormalizedTxBitcoinVout');
export const NormalizedTxBitcoin = extendCodec(NormalizedTxCommon, {
    vin: t.array(NormalizedTxBitcoinVin),
    vout: t.array(NormalizedTxBitcoinVout),
    valueIn: t.string,
    fees: t.string,
}, 'NormalizedTxBitcoin');
export const SpecificTxBitcoinVinScriptSig = t.type({
    asm: t.string,
    hex: t.string,
}, 'SpecificTxBitcoinVinScriptSig');
export const SpecificTxBitcoinVin = t.type({
    txid: t.string,
    vout: t.number,
    scriptSig: SpecificTxBitcoinVinScriptSig,
    sequence: t.number
}, 'SpecificTxBitcoinVin');
export const SpecificTxBitcoinVoutScriptPubKey = t.type({
    asm: t.string,
    hex: t.string,
    reqSigs: t.number,
    type: t.string,
    addresses: t.array(t.string),
}, 'SpecificTxBitcoinVoutScriptPubKey');
export const SpecificTxBitcoinVout = t.type({
    value: t.number,
    n: t.number,
    scriptPubKey: SpecificTxBitcoinVoutScriptPubKey,
}, 'SpecificTxBitcoinVout');
export const SpecificTxBitcoin = t.type({
    txid: t.string,
    hash: t.string,
    version: t.number,
    size: t.number,
    vsize: t.number,
    weight: t.number,
    locktime: t.number,
    vin: t.array(SpecificTxBitcoinVin),
    vout: t.array(SpecificTxBitcoinVout),
    hex: t.string,
    blockhash: t.string,
    confirmations: t.number,
    time: t.number,
    blocktime: t.number,
}, 'SpecificTxBitcoin');
export const AddressDetailsBitcoinBasic = extendCodec(AddressDetailsCommonBasic, {
    totalReceived: t.string,
    totalSent: t.string,
}, 'AddressDetailsBitcoinBasic');
export const AddressDetailsBitcoinTokens = AddressDetailsBitcoinBasic;
export const AddressDetailsBitcoinTokenBalances = AddressDetailsBitcoinBasic;
export const AddressDetailsBitcoinTxids = extendCodec(AddressDetailsBitcoinTokenBalances, Paginated.props, {
    txids: t.array(t.string),
}, 'AddressDetailsBitcoinTxids');
export const AddressDetailsBitcoinTxs = extendCodec(AddressDetailsBitcoinTokenBalances, Paginated.props, {
    transactions: t.array(NormalizedTxBitcoin),
}, 'AddressDetailsBitcoinTxs');
export const GetXpubDetailsTokensOption = t.keyof({
    nonzero: null,
    used: null,
    derived: null,
}, 'GetXpubDetailsTokensOption');
export const GetXpubDetailsOptions = extendCodec(GetAddressDetailsOptions, {}, {
    usedTokens: t.number,
    tokens: GetXpubDetailsTokensOption,
}, 'GetXpubDetailsOptions');
export const TokenDetailsXpubAddress = t.type({
    type: TokenDetailsTypeXpubAddress,
    name: t.string,
    path: t.string,
    transfers: t.number,
    decimals: t.number,
    balance: t.string,
    totalReceived: t.string,
    totalSent: t.string,
}, 'TokenDetailsXpubAddress');
export const TokenDetailsXpubAddressBalance = extendCodec(TokenDetailsXpubAddress, {
    balance: t.string,
}, 'TokenDetailsXpubAddressBalance');
export const XpubDetailsBasic = AddressDetailsBitcoinBasic;
export const XpubDetailsTokens = extendCodec(XpubDetailsBasic, {}, {
    tokens: TokenDetailsXpubAddress,
}, 'XpubDetailsTokens');
export const XpubDetailsTokenBalances = extendCodec(XpubDetailsBasic, {}, {
    tokens: TokenDetailsXpubAddressBalance,
}, 'XpubDetailsTokenBalances');
export const XpubDetailsTxids = extendCodec(XpubDetailsTokenBalances, Paginated.props, {
    txids: t.array(t.string),
}, 'XpubDetailsTxids');
export const XpubDetailsTxs = extendCodec(XpubDetailsTokenBalances, Paginated.props, {
    transactions: t.array(NormalizedTxBitcoin),
}, 'XpubDetailsTxs');
export const BlockInfoBitcoin = extendCodec(BlockInfoCommon, {}, {
    txs: t.array(NormalizedTxBitcoin),
}, 'BlockInfoBitcoin');
//# sourceMappingURL=bitcoin.js.map