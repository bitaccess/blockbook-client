import * as t from 'io-ts'
import { requiredOptionalCodec, extendCodec } from '@faast/ts-common'
import {
  NormalizedTxCommonVin, NormalizedTxCommonVout, NormalizedTxCommon, AddressDetailsCommonBasic,
  Paginated, GetAddressDetailsOptions, TokenDetailsTypeXpubAddress, TokenDetailsCommon, BlockInfoCommon
} from './common'

/*
 * Get transaction
 */

export const NormalizedTxBitcoinVin = extendCodec(
  NormalizedTxCommonVin,
  {
    txid: t.string, // 'fa0b399f8eb9813f4549fc1066a134f93d1b4c7c6563d12629227ef3faf231b6'
    addresses: t.array(t.string), // ['1DjPjQq4WZwjRvCy6LwdenCu6ynS2m3ob1']
    vout: t.number, // 4
    sequence: t.number, // 4294967295
    value: t.string, // '2895163'
    hex: t.string, // '473044022013a...f2636f'
  },
  'NormalizedTxBitcoinVin',
)
export type NormalizedTxBitcoinVin = t.TypeOf<typeof NormalizedTxBitcoinVin>

export const NormalizedTxBitcoinVout = extendCodec(
  NormalizedTxCommonVout,
  {
    value: t.string,
    hex: t.string, // 'a9142fa547b613bf425f0308933bbaac5c67899c745d87'
  },
  'NormalizedTxBitcoinVout',
)
export type NormalizedTxBitcoinVout = t.TypeOf<typeof NormalizedTxBitcoinVout>

export const NormalizedTxBitcoin = extendCodec(
  NormalizedTxCommon,
  {
    vin: t.array(NormalizedTxBitcoinVin),
    vout: t.array(NormalizedTxBitcoinVout),
    valueIn: t.string, // '2895163'
    hex: t.string, // 0200000001b631f...ac00000000'
    fees: t.string, // '302808'
  },
  'NormalizedTxBitcoin'
)
export type NormalizedTxBitcoin = t.TypeOf<typeof NormalizedTxBitcoin>

/*
 * Get transaction specific
 */

export const SpecificTxBitcoinVinScriptSig = t.type({
  asm: t.string, // '30440220...049936719f[ALL] 03231bb7d...2636f'
  hex: t.string, // '47304402...1f2636f'
}, 'SpecificTxBitcoinVinScriptSig')
export type SpecificTxBitcoinVinScriptSig = t.TypeOf<typeof SpecificTxBitcoinVinScriptSig>

export const SpecificTxBitcoinVin = t.type({
  txid: t.string, // 'fa0b399f8eb9813f4549fc1066a134f93d1b4c7c6563d12629227ef3faf231b6'
  vout: t.number, // 4
  scriptSig: SpecificTxBitcoinVinScriptSig,
  sequence: t.number // 4294967295
}, 'SpecificTxBitcoinVin')
export type SpecificTxBitcoinVin = t.TypeOf<typeof SpecificTxBitcoinVin>

export const SpecificTxBitcoinVoutScriptPubKey = t.type({
  asm: t.string, // 'OP_HASH160 2fa547b613bf425f0308933bbaac5c67899c745d OP_EQUAL'
  hex: t.string, // 'a9142fa547b613bf425f0308933bbaac5c67899c745d87'
  reqSigs: t.number, // 1
  type: t.string, // 'scripthash'
  addresses: t.array(t.string), // ['362wgRYYj8ybZwuQzxE2PNykjJAwStKARz']
}, 'SpecificTxBitcoinVoutScriptPubKey')
export type SpecificTxBitcoinVoutScriptPubKey = t.TypeOf<typeof SpecificTxBitcoinVoutScriptPubKey>

export const SpecificTxBitcoinVout = t.type({
  value: t.number, // 0.01351072
  n: t.number, // 0
  scriptPubKey: SpecificTxBitcoinVoutScriptPubKey,
}, 'SpecificTxBitcoinVout')
export type SpecificTxBitcoinVout = t.TypeOf<typeof SpecificTxBitcoinVout>

export const SpecificTxBitcoin = t.type({
  txid: t.string, // '2266ea441e3fbd144e33dc6c62c0d354d59dc267b48efe9a98a6e2fe6584cbd1'
  hash: t.string, // '2266ea441e3fbd144e33dc6c62c0d354d59dc267b48efe9a98a6e2fe6584cbd1'
  version: t.number, // 2
  size: t.number, // 223
  vsize: t.number, // 223
  weight: t.number, // 892
  locktime: t.number, // 0
  vin: t.array(SpecificTxBitcoinVin),
  vout: t.array(SpecificTxBitcoinVout),
  hex: t.string, // '0200000001b63...88ac00000000'
  blockhash: t.string, // '0000000000000000000aac117ba0c0910956020b30e847154311d7d01d50476f'
  confirmations: t.number, // 2
  time: t.number, // 1574787637
  blocktime: t.number, // 1574787637
}, 'SpecificTxBitcoin')
export type SpecificTxBitcoin = t.TypeOf<typeof SpecificTxBitcoin>

/**
 * Get address
 */

export const AddressDetailsBitcoinBasic = extendCodec(
  AddressDetailsCommonBasic,
  {
    totalReceived: t.string, // '4331220',
    totalSent: t.string, // '2895163',
  },
  'AddressDetailsBitcoinBasic'
)
export type AddressDetailsBitcoinBasic = t.TypeOf<typeof AddressDetailsBitcoinBasic>

export const AddressDetailsBitcoinTokens = AddressDetailsBitcoinBasic
export type AddressDetailsBitcoinTokens = t.TypeOf<typeof AddressDetailsBitcoinTokens>

export const AddressDetailsBitcoinTokenBalances = AddressDetailsBitcoinBasic
export type AddressDetailsBitcoinTokenBalances = t.TypeOf<typeof AddressDetailsBitcoinTokenBalances>

export const AddressDetailsBitcoinTxids = extendCodec(
  AddressDetailsBitcoinTokenBalances,
  Paginated.props,
  {
    txids: t.array(t.string),
  },
  'AddressDetailsBitcoinTxids',
)
export type AddressDetailsBitcoinTxids = t.TypeOf<typeof AddressDetailsBitcoinTxids>

export const AddressDetailsBitcoinTxs = extendCodec(
  AddressDetailsBitcoinTokenBalances,
  Paginated.props,
  {
    transactions: t.array(NormalizedTxBitcoin),
  },
  'AddressDetailsBitcoinTxs',
)
export type AddressDetailsBitcoinTxs = t.TypeOf<typeof AddressDetailsBitcoinTxs>

/**
 * Get Xpub
 */

export const GetXpubDetailsTokensOption = t.keyof({
  nonzero: null,
  used: null,
  derived: null,
}, 'GetXpubDetailsTokensOption')
export type GetXpubDetailsTokensOption = t.TypeOf<typeof GetXpubDetailsTokensOption>

export const GetXpubDetailsOptions = extendCodec(
  GetAddressDetailsOptions,
  {},
  {
    usedTokens: t.number, // 2
    tokens: GetXpubDetailsTokensOption,
  },
  'GetXpubDetailsOptions'
)
export type GetXpubDetailsOptions = t.TypeOf<typeof GetXpubDetailsOptions>

export const TokenDetailsXpubAddress = t.type({
  type: TokenDetailsTypeXpubAddress, // 'XPUBAddress',
  name: t.string, // 'DUCd1B3YBiXL5By15yXgSLZtEkvwsgEdqS',
  path: t.string, // 'm/44'/3'/0'/0/0',
  transfers: t.number, // 3,
  decimals: t.number, // 8,
  balance: t.string, // '0',
  totalReceived: t.string, // '2803986975',
  totalSent: t.string, // '2803986975'
}, 'TokenDetailsXpubAddress')
export type TokenDetailsXpubAddress = t.TypeOf<typeof TokenDetailsXpubAddress>

export const TokenDetailsXpubAddressBalance = extendCodec(
  TokenDetailsXpubAddress,
  {
    balance: t.string, // '850360'
  },
  'TokenDetailsXpubAddressBalance',
)
export type TokenDetailsXpubAddressBalance = t.TypeOf<typeof TokenDetailsXpubAddressBalance>

export const XpubDetailsBasic = AddressDetailsBitcoinBasic
export type XpubDetailsBasic = t.TypeOf<typeof XpubDetailsBasic>

export const XpubDetailsTokens = extendCodec(
  XpubDetailsBasic,
  {},
  {
    tokens: TokenDetailsXpubAddress,
  },
  'XpubDetailsTokens'
)
export type XpubDetailsTokens = t.TypeOf<typeof XpubDetailsTokens>

export const XpubDetailsTokenBalances = extendCodec(
  XpubDetailsBasic,
  {},
  {
    tokens: TokenDetailsXpubAddressBalance,
  },
  'XpubDetailsTokenBalances'
)
export type XpubDetailsTokenBalances = t.TypeOf<typeof XpubDetailsTokenBalances>

export const XpubDetailsTxids = extendCodec(
  XpubDetailsTokenBalances,
  Paginated.props,
  {
    txids: t.array(t.string),
  },
  'XpubDetailsTxids',
)
export type XpubDetailsTxids = t.TypeOf<typeof XpubDetailsTxids>

export const XpubDetailsTxs = extendCodec(
  XpubDetailsTokenBalances,
  Paginated.props,
  {
    transactions: t.array(NormalizedTxBitcoin),
  },
  'XpubDetailsTxs',
)
export type XpubDetailsTxs = t.TypeOf<typeof XpubDetailsTxs>

/**
 * Get block
 */

export const BlockInfoBitcoin = extendCodec(
  BlockInfoCommon,
  {},
  {
    txs: t.array(NormalizedTxBitcoin),
  },
  'BlockInfoBitcoin',
)
export type BlockInfoBitcoin = t.TypeOf<typeof BlockInfoBitcoin>
