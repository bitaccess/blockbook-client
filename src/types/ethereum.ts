import * as t from 'io-ts'
import { requiredOptionalCodec, extendCodec } from '@faast/ts-common'
import {
  NormalizedTxCommonVin, NormalizedTxCommonVout, NormalizedTxCommon,
  EthereumSpecific, TokenDetailsTypeERC20, AddressDetailsCommonBasic, Paginated, BlockInfoCommon,
} from './common'

/*
 * Get transaction
 */

export const NormalizedTxEthereumVin = extendCodec(
  NormalizedTxCommonVin,
  {
    addresses: t.array(t.string), // ['0x175bf41879a45f733553d4a0385d6369f227436c'],
  },
  'NormalizedTxEthereumVin',
)
export type NormalizedTxEthereumVin = t.TypeOf<typeof NormalizedTxEthereumVin>

export const NormalizedTxEthereumVout = extendCodec(
  NormalizedTxCommonVout,
  {
    value: t.string, // '9988700000000000000',
  },
  'NormalizedTxEthereumVout'
)
export type NormalizedTxEthereumVout = t.TypeOf<typeof NormalizedTxEthereumVout>

export const NormalizedTxEthereum = extendCodec(
  NormalizedTxCommon,
  {
    vin: t.array(NormalizedTxEthereumVin),
    vout: t.array(NormalizedTxEthereumVout),
    fees: t.string, // '302808'
    ethereumSpecific: EthereumSpecific,
  },
  'NormalizedTxEthereum',
)
export type NormalizedTxEthereum = t.TypeOf<typeof NormalizedTxEthereum>

/*
 * Get transaction specific
 */

export const SpecificTxEthereumTx = t.type({
  nonce: t.string, // '0x0',
  gasPrice: t.string, // '0x12a05f200',
  gas: t.string, // '0xea60',
  to: t.string, // '0x352e504813b9e0b30f9ca70efc27a52d298f6697',
  value: t.string, // '0x8a9efdba43f1c000',
  input: t.string, // '0x4e4e525000000000000000000...77c5fdb75413108bf',
  hash: t.string, // '0x19bc6b578c04bfff0640834a8ab2b4bdb1d6ee4269f677d22f6c4bb20399151f',
  blockNumber: t.string, // '0x897eb1',
  blockHash: t.string, // '0xdfc3cb3191c782db11624cb7c66ed0b6f51d37ccdd63538b8a700587675652ad',
  from: t.string, // '0x175bf41879a45f733553d4a0385d6369f227436c',
  transactionIndex: t.string, // '0x53'
}, 'SpecificTxEthereumTx')
export type SpecificTxEthereumTx = t.TypeOf<typeof SpecificTxEthereumTx>

export const SpecificTxEthereumReceipt = t.type({
  gasUsed: t.string, // '0x7d58',
  status: t.string, // '0x1',
  logs: t.array(t.any), // [ ]
}, 'SpecificTxEthereumReceipt')
export type SpecificTxEthereumReceipt = t.TypeOf<typeof SpecificTxEthereumReceipt>

export const SpecificTxEthereum = t.type({
  tx: SpecificTxEthereumTx,
  receipt: SpecificTxEthereumReceipt,
}, 'SpecificTxEthereum')
export type SpecificTxEthereum = t.TypeOf<typeof SpecificTxEthereum>

/*
 * Get address
 */

export const TokenDetailsERC20 = t.type({
  type: TokenDetailsTypeERC20, // 'ERC20',
  name: t.string, // 'Carrots',
  contract: t.string, // '0x6e0646b014d99d79f4e875b6723fa8e46becbd15',
  transfers: t.number, // 1,
  symbol: t.string, // 'CEN',
}, 'TokenDetailsERC20')
export type TokenDetailsERC20 = t.TypeOf<typeof TokenDetailsERC20>

export const TokenDetailsERC20Balance = extendCodec(
  TokenDetailsERC20,
  {
    balance: t.string, // '8503600000000000000'
  },
  'TokenDetailsERC20Balance',
)
export type TokenDetailsERC20Balance = t.TypeOf<typeof TokenDetailsERC20Balance>

export const AddressDetailsEthereumBasic = extendCodec(
  AddressDetailsCommonBasic,
  {
    nonTokenTxs: t.number, // 29483,
    nonce: t.string, // '1',
  },
  'AddressDetailsEthereumBasic'
)
export type AddressDetailsEthereumBasic = t.TypeOf<typeof AddressDetailsEthereumBasic>

export const AddressDetailsEthereumTokens = extendCodec(
  AddressDetailsEthereumBasic,
  {},
  {
    tokens: TokenDetailsERC20,
  },
  'AddressDetailsEthereumTokens'
)
export type AddressDetailsEthereumTokens = t.TypeOf<typeof AddressDetailsEthereumTokens>

export const AddressDetailsEthereumTokenBalances = extendCodec(
  AddressDetailsEthereumBasic,
  {},
  {
    tokens: TokenDetailsERC20Balance,
  },
  'AddressDetailsEthereumTokenBalances'
)
export type AddressDetailsEthereumTokenBalances = t.TypeOf<typeof AddressDetailsEthereumTokenBalances>

export const AddressDetailsEthereumTxids = extendCodec(
  AddressDetailsEthereumTokenBalances,
  Paginated.props,
  {
    txids: t.array(t.string),
  },
  'AddressDetailsEthereumTxids',
)
export type AddressDetailsEthereumTxids = t.TypeOf<typeof AddressDetailsEthereumTxids>

export const AddressDetailsEthereumTxs = extendCodec(
  AddressDetailsEthereumTokenBalances,
  Paginated.props,
  {
    transactions: t.array(NormalizedTxEthereum),
  },
  'AddressDetailsEthereumTxs',
)
export type AddressDetailsEthereumTxs = t.TypeOf<typeof AddressDetailsEthereumTxs>

/*
 * Get block
 */

export const BlockInfoEthereum = extendCodec(
  BlockInfoCommon,
  {},
  {
    txs: t.array(NormalizedTxEthereum),
  },
  'BlockInfoEthereum',
)
export type BlockInfoEthereum = t.TypeOf<typeof BlockInfoEthereum>
