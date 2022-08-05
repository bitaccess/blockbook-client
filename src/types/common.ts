import * as t from 'io-ts'
import { requiredOptionalCodec, extendCodec, Logger, nullable } from '@bitaccess/ts-common'

export type Resolve = (value: any) => void
export type Reject = (reason?: any) => void

export const Paginated = t.type({
  page: t.number, // 1,
  totalPages: t.number, // 30,
  itemsOnPage: t.number, // 1000,
}, 'Paginated')
export type Paginated = t.TypeOf<typeof Paginated>

export function paginated<C extends t.Mixed>(c: C) {
  return t.intersection([Paginated, c])
}

export const BlockbookConfig = requiredOptionalCodec(
  {
    /**
     * An array of blockbook nodes to query. Must not be empty.
     */
    nodes: t.array(t.string),
  },
  {
    /** Logger to use. undefined -> console, null -> disabled */
    logger: nullable(Logger),
    /**
     * Set true to disable response validation for performance, or use in javascript.
     *
     * Default: `false`
     */
    disableTypeValidation: t.boolean,
    /** Maximum ms to wait for an http or ws request to complete */
    requestTimeoutMs: t.number,
    /** Time to wait before reconnecting after an unexpected disconnect */
    reconnectDelayMs: t.number,
  },
  'BlockbookConfig',
)
export type BlockbookConfig = t.TypeOf<typeof BlockbookConfig>

/*
 * Get status
 */

export const BlockbookInfo = t.type({
  coin: t.string, // 'Bitcoin',
  host: t.string, // 'blockbook',
  version: t.string, // '0.3.1',
  gitCommit: t.string, // '3d9ad91',
  buildTime: t.string, // '2019-05-17T14:34:00+00:00',
  syncMode: t.boolean, // true,
  initialSync: t.boolean, // false,
  inSync: t.boolean, // true,
  bestHeight: t.number, // 577261,
  lastBlockTime: t.string, // '2019-05-22T18:03:33.547762973+02:00',
  inSyncMempool: t.boolean, // true,
  lastMempoolTime: t.string, // '2019-05-22T18:10:10.27929383+02:00',
  mempoolSize: t.number, // 17348,
  decimals: t.number, // 8,
  dbSize: t.number, // 191887866502,
  about: t.string, // 'Blockbook - blockchain indexer for ...'
}, 'BlockbookInfo')
export type BlockbookInfo = t.TypeOf<typeof BlockbookInfo>

export const BackendInfo = requiredOptionalCodec(
  {
    chain: t.string, // 'main',
    blocks: t.number, // 577261,
    bestBlockHash: t.string, // '0000000000000000000ca8c902aa58b3118a7f35d093e25a07f17bcacd91cabf',
    difficulty: t.string, // '6704632680587.417',
    version: t.string, // '180000',
  },
  {
    protocolVersion: t.string, // '70015',
    subversion: t.string, // '/Satoshi:0.18.0/',
    sizeOnDisk: t.number, // 250504188580,
    headers: t.number, // 577261,
    timeOffset: t.number, // 0,
    warnings: t.string, // ''
  },
  'BackendInfo',
)
export type BackendInfo = t.TypeOf<typeof BackendInfo>

export const SystemInfo = t.type({
  blockbook: BlockbookInfo,
  backend: BackendInfo,
}, 'ApiStatus')
export type SystemInfo = t.TypeOf<typeof SystemInfo>

/**
 * ws getInfo
 */
export const SystemInfoWs = t.type(
  {
    name: t.string,
    shortcut: t.string,
    decimals: t.number,
    version: t.string,
    bestHeight: t.number,
    bestHash: t.string,
    block0Hash: t.string,
    testnet: t.boolean,
  },
  'SystemInfoWs',
)
export type SystemInfoWs = t.TypeOf<typeof SystemInfoWs>

/*
 * Get transaction
 */

/*
type Vin struct {
	Txid       string                   `json:"txid,omitempty"`
	Vout       uint32                   `json:"vout,omitempty"`
	Sequence   int64                    `json:"sequence,omitempty"`
	N          int                      `json:"n"`
	AddrDesc   bchain.AddressDescriptor `json:"-"`
	Addresses  []string                 `json:"addresses,omitempty"`
	Searchable bool                     `json:"-"`
	ValueSat   *Amount                  `json:"value,omitempty"`
	Hex        string                   `json:"hex,omitempty"`
	Asm        string                   `json:"asm,omitempty"`
	Coinbase   string                   `json:"coinbase,omitempty"`
}
*/
export const NormalizedTxCommonVin = requiredOptionalCodec(
  {
    n: t.number, // 0
  },
  {
    txid: t.string,
    vout: t.number,
    sequence: t.number,
    addresses: t.array(t.string), // ['1DjPjQq4WZwjRvCy6LwdenCu6ynS2m3ob1']
    value: t.string,
    hex: t.string,
    asm: t.string,
    coinbase: t.string, // '044c86041b020602'
    isAddress: t.boolean, // true
  },
  'NormalizedTxCommonVin'
)

/*
type Vout struct {
	ValueSat    *Amount                  `json:"value,omitempty"`
	N           int                      `json:"n"`
	Spent       bool                     `json:"spent,omitempty"`
	SpentTxID   string                   `json:"spentTxId,omitempty"`
	SpentIndex  int                      `json:"spentIndex,omitempty"`
	SpentHeight int                      `json:"spentHeight,omitempty"`
	Hex         string                   `json:"hex,omitempty"`
	Asm         string                   `json:"asm,omitempty"`
	AddrDesc    bchain.AddressDescriptor `json:"-"`
	Addresses   []string                 `json:"addresses"`
	Searchable  bool                     `json:"-"`
	Type        string                   `json:"type,omitempty"`
}
*/
export const NormalizedTxCommonVout = requiredOptionalCodec(
  {
    n: t.number, // 0
    addresses: nullable(t.array(t.string)), // ['362wgRYYj8ybZwuQzxE2PNykjJAwStKARz']
  },
  {
    value: t.string, // '1351072'
    spent: t.boolean,
    spentTxId: t.string,
    spentIndex: t.number,
    spentHeight: t.number,
    hex: t.string,
    asm: t.string,
    type: t.string,
    isAddress: t.boolean, // true
  },
  'NormalizedTxCommonVout'
)

/*
type EthereumSpecific struct {
	Status   int      `json:"status"` // 1 OK, 0 Fail, -1 pending
	Nonce    uint64   `json:"nonce"`
	GasLimit *big.Int `json:"gasLimit"`
	GasUsed  *big.Int `json:"gasUsed"`
	GasPrice *Amount  `json:"gasPrice"`
}
*/
export const EthereumSpecific = t.type({
  status: t.number, // 1,
  nonce: t.number, // 2830,
  gasLimit: t.number, // 36591,
  gasUsed: t.number, // 36591,
  gasPrice: t.string, // '11000000000'
}, 'EthereumSpecific')
export type EthereumSpecific = t.TypeOf<typeof EthereumSpecific>

/*
type TokenTransfer struct {
	Type     TokenType `json:"type"`
	From     string    `json:"from"`
	To       string    `json:"to"`
	Token    string    `json:"token"`
	Name     string    `json:"name"`
	Symbol   string    `json:"symbol"`
	Decimals int       `json:"decimals"`
	Value    *Amount   `json:"value"`
}
 */
export const TokenTransfer = t.type({
  type: t.string, // 'ERC20',
  from: t.string, // '0x9c2e011c0ce0d75c2b62b9c5a0ba0a7456593803',
  to: t.string, // '0x583cbbb8a8443b38abcc0c956bece47340ea1367',
  token: t.string, // '0xc32ae45504ee9482db99cfa21066a59e877bc0e6',
  name: t.string, // 'Tangany Test Token',
  symbol: t.string, // 'TATETO',
  decimals: t.number, // 18,
  value: t.string, // '133800000'
}, 'TokenTransfer')
export type TokenTransfer = t.TypeOf<typeof TokenTransfer>

/*
type Tx struct {
	Txid             string            `json:"txid"`
	Version          int32             `json:"version,omitempty"`
	Locktime         uint32            `json:"lockTime,omitempty"`
	Vin              []Vin             `json:"vin"`
	Vout             []Vout            `json:"vout"`
	Blockhash        string            `json:"blockHash,omitempty"`
	Blockheight      int               `json:"blockHeight"`
	Confirmations    uint32            `json:"confirmations"`
	Blocktime        int64             `json:"blockTime"`
	Size             int               `json:"size,omitempty"`
	ValueOutSat      *Amount           `json:"value"`
	ValueInSat       *Amount           `json:"valueIn,omitempty"`
	FeesSat          *Amount           `json:"fees,omitempty"`
	Hex              string            `json:"hex,omitempty"`
	CoinSpecificData interface{}       `json:"-"`
	CoinSpecificJSON json.RawMessage   `json:"-"`
	TokenTransfers   []TokenTransfer   `json:"tokenTransfers,omitempty"`
	EthereumSpecific *EthereumSpecific `json:"ethereumSpecific,omitempty"`
}
*/
export const NormalizedTxCommon = requiredOptionalCodec(
  {
    txid: t.string, // '2266ea441e3fbd144e33dc6c62c0d354d59dc267b48efe9a98a6e2fe6584cbd1'
    vin: t.array(NormalizedTxCommonVin),
    vout: t.array(NormalizedTxCommonVout),
    blockHeight: t.number, // 605482
    confirmations: t.number, // 1
    blockTime: t.number, // 1574787637
    value: t.string, // '2592355'
  },
  {
    version: t.number, // 2
    lockTime: t.number,
    blockHash: t.string, // '0000000000000000000aac117ba0c0910956020b30e847154311d7d01d50476f'
    size: t.number,
    valueIn: t.string,
    fees: t.string, // '302808'
    hex: t.string,
    tokenTransfers: t.array(TokenTransfer),
    ethereumSpecific: EthereumSpecific,
  },
  'NormalizedTxCommon',
)
export type NormalizedTxCommon = t.TypeOf<typeof NormalizedTxCommon>

/*
 * Get block hash
 */

export const BlockHashResponse = t.type({
  blockHash: t.string, // 'ed8f3af8c10ca70a136901c6dd3adf037f0aea8a93fbe9e80939214034300f1e'
}, 'BlockHashResponse')
export type BlockHashResponse = t.TypeOf<typeof BlockHashResponse>

export const BlockHashResponseWs = t.type({
 hash: t.string, // 'ed8f3af8c10ca70a136901c6dd3adf037f0aea8a93fbe9e80939214034300f1e'
}, 'BlockHashResponseWs')
export type BlockHashResponseWs = t.TypeOf<typeof BlockHashResponseWs>

/**
 * subscribeNewBlock
 */

export const SubscribeNewBlockEvent = t.type({
  height: t.number,
  hash: t.string,
}, 'SubscribeNewBlockEvent')
export type SubscribeNewBlockEvent = t.TypeOf<typeof SubscribeNewBlockEvent>

/**
 * subscribeAddresses
 */

export const SubscribeAddressesEvent = t.type({
  address: t.string,
  tx: NormalizedTxCommon,
}, 'SubscribeAddressesEvent')
export type SubscribeAddressesEvent = t.TypeOf<typeof SubscribeAddressesEvent>

/**
 * Get address
 */

export const GetAddressDetailsLevels = t.keyof({
  basic: null,
  tokens: null,
  tokenBalances: null,
  txids: null,
  txs: null,
})
export type GetAddressDetailsLevels = t.TypeOf<typeof GetAddressDetailsLevels>

export const GetAddressDetailsOptions = t.partial({
  page: t.number,
  pageSize: t.number,
  from: t.number,
  to: t.number,
  details: GetAddressDetailsLevels,
})
export type GetAddressDetailsOptions = t.TypeOf<typeof GetAddressDetailsOptions>

export const TokenDetailsTypeERC20 = t.literal('ERC20')
export type TokenDetailsTypeERC20 = t.TypeOf<typeof TokenDetailsTypeERC20>

export const TokenDetailsTypeXpubAddress = t.literal('XPUBAddress')
export type TokenDetailsTypeXpubAddress = t.TypeOf<typeof TokenDetailsTypeXpubAddress>

export const TokenDetailsType = t.union(
  [
    TokenDetailsTypeERC20,
    TokenDetailsTypeXpubAddress,
  ],
  'TokenDetailsType',
)
export type TokenDetailsType = t.TypeOf<typeof TokenDetailsType>

/*
type Token struct {
	Type             TokenType `json:"type"`
	Name             string    `json:"name"`
	Path             string    `json:"path,omitempty"`
	Contract         string    `json:"contract,omitempty"`
	Transfers        int       `json:"transfers"`
	Symbol           string    `json:"symbol,omitempty"`
	Decimals         int       `json:"decimals,omitempty"`
	BalanceSat       *Amount   `json:"balance,omitempty"`
	TotalReceivedSat *Amount   `json:"totalReceived,omitempty"`
	TotalSentSat     *Amount   `json:"totalSent,omitempty"`
	ContractIndex    string    `json:"-"`
}
*/
export const TokenDetailsCommon = requiredOptionalCodec(
  {
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
  },
  'TokenDetailsCommon',
)
export type TokenDetailsCommon = t.TypeOf<typeof TokenDetailsCommon>

export const TokenDetailsCommonBalance = extendCodec(
  TokenDetailsCommon,
  {
    balance: t.string,
  },
  'TokenDetailsCommonBalance',
)
export type TokenDetailsCommonBalance = t.TypeOf<typeof TokenDetailsCommonBalance>

/*
type Address struct {
	Paging
	AddrStr               string                `json:"address"`
	BalanceSat            *Amount               `json:"balance"`
	TotalReceivedSat      *Amount               `json:"totalReceived,omitempty"`
	TotalSentSat          *Amount               `json:"totalSent,omitempty"`
	UnconfirmedBalanceSat *Amount               `json:"unconfirmedBalance"`
	UnconfirmedTxs        int                   `json:"unconfirmedTxs"`
	Txs                   int                   `json:"txs"`
	NonTokenTxs           int                   `json:"nonTokenTxs,omitempty"`
	Transactions          []*Tx                 `json:"transactions,omitempty"`
	Txids                 []string              `json:"txids,omitempty"`
	Nonce                 string                `json:"nonce,omitempty"`
	UsedTokens            int                   `json:"usedTokens,omitempty"`
	Tokens                []Token               `json:"tokens,omitempty"`
	Erc20Contract         *bchain.Erc20Contract `json:"erc20Contract,omitempty"`
}
*/
export const AddressDetailsCommonBasic = requiredOptionalCodec(
  {
    address: t.string, // '1DjPjQq4WZwjRvCy6LwdenCu6ynS2m3ob1',
    balance: t.string, // '1436057',
    unconfirmedBalance: t.string, // '0',
    unconfirmedTxs: t.number, // 0,
    txs: t.number, // 3,
  },
  {
    totalReceived: t.string,
    totalSent: t.string,
    nonTokenTxs: t.number,
    nonce: t.string,
    usedTokens: t.number,
    erc20Contract: t.any,
  },
  'AddressDetailsCommonBasic',
)
export type AddressDetailsCommonBasic = t.TypeOf<typeof AddressDetailsCommonBasic>

export const AddressDetailsCommonTokens = extendCodec(
  AddressDetailsCommonBasic,
  {
    tokens: t.array(TokenDetailsCommon),
  },
  'AddressDetailsCommonTokens',
)
export type AddressDetailsCommonTokens = t.TypeOf<typeof AddressDetailsCommonTokens>

export const AddressDetailsCommonTokenBalances = extendCodec(
  AddressDetailsCommonBasic,
  {},
  {
    tokens: t.array(TokenDetailsCommonBalance),
  },
  'AddressDetailsCommonTokenBalances',
)
export type AddressDetailsCommonTokenBalances = t.TypeOf<typeof AddressDetailsCommonTokenBalances>

export const AddressDetailsCommonTxids = paginated(extendCodec(
  AddressDetailsCommonTokenBalances,
  {},
  {
    txids: t.array(t.string),
  },
  'AddressDetailsCommonTxids',
))
export type AddressDetailsCommonTxids = t.TypeOf<typeof AddressDetailsCommonTxids>

export const AddressDetailsCommonTxs = paginated(extendCodec(
  AddressDetailsCommonTokenBalances,
  {},
  {
    txs: t.array(NormalizedTxCommon),
  },
  'AddressDetailsCommonTxs',
))
export type AddressDetailsCommonTxs = t.TypeOf<typeof AddressDetailsCommonTxs>

/**
 * Get utxos
 */

export const GetUtxosOptions = t.partial({
  confirmed: t.boolean,
}, 'GetUtxosOptions')
export type GetUtxosOptions = t.TypeOf<typeof GetAddressDetailsOptions>

export const UtxoDetails = requiredOptionalCodec(
  {
    txid: t.string, // 'a79e396a32e10856c97b95f43da7e9d2b9a11d446f7638dbd75e5e7603128cac',
    vout: t.number, // 1,
    value: t.string, // '39748685',
    confirmations: t.number, // 47,
  },
  {
    height: t.number, // 2648043,
    coinbase: t.boolean, // true,
    lockTime: t.number, // 2648100,
  },
  'UtxoDetails',
)
export type UtxoDetails = t.TypeOf<typeof UtxoDetails>

export const UtxoDetailsXpub = extendCodec(
  UtxoDetails,
  {},
  {
    address: t.string, // 'DUCd1B3YBiXL5By15yXgSLZtEkvwsgEdqS',
    path: t.string, // `m/44'/3'/0'/0/0`,
  },
  'UtxoDetailsXpub',
)
export type UtxoDetailsXpub = t.TypeOf<typeof UtxoDetailsXpub>

/**
 * Get block
 */

export const GetBlockOptions = t.partial({
  page: t.number,
}, 'GetBlockOptions')
export type GetBlockOptions = t.TypeOf<typeof GetBlockOptions>

 /*
type BlockInfo struct {
	Hash          string      `json:"hash"`
	Prev          string      `json:"previousBlockHash,omitempty"`
	Next          string      `json:"nextBlockHash,omitempty"`
	Height        uint32      `json:"height"`
	Confirmations int         `json:"confirmations"`
	Size          int         `json:"size"`
	Time          int64       `json:"time,omitempty"`
	Version       json.Number `json:"version"`
	MerkleRoot    string      `json:"merkleRoot"`
	Nonce         string      `json:"nonce"`
	Bits          string      `json:"bits"`
	Difficulty    string      `json:"difficulty"`
	Txids         []string    `json:"tx,omitempty"`
}
  */
 export const BlockInfoCommon = paginated(requiredOptionalCodec(
  {
    hash: t.string, // '760f8ed32894ccce9c1ea11c8a019cadaa82bcb434b25c30102dd7e43f326217',
    height: t.number, // 2648059,
    confirmations: t.number, // 47,
    size: t.number, // 951,
    version: t.number, // 6422787,
    merkleRoot: t.string, // '6783f6083788c4f69b8af23bd2e4a194cf36ac34d590dfd97e510fe7aebc72c8',
    nonce: t.string, // '0',
    bits: t.string, // '1a063f3b',
    difficulty: t.string, // '2685605.260733312',
    txCount: t.number, // 2,
  },
  {
    previousBlockHash: t.string, // '786a1f9f38493d32fd9f9c104d748490a070bc74a83809103bcadd93ae98288f',
    nextBlockHash: t.string, // '151615691b209de41dda4798a07e62db8429488554077552ccb1c4f8c7e9f57a',
    time: t.number, // 1553096617,
    txs: t.array(NormalizedTxCommon),
  },
  'BlockInfoCommon'
))
export type BlockInfoCommon = t.TypeOf<typeof BlockInfoCommon>

/**
 * Send transaction
 */

export const SendTxSuccess = t.type({
  result: t.string, // '7c3be24063f268aaa1ed81b64776798f56088757641a34fb156c4f51ed2e9d25'
}, 'SendTransactionSuccess')
export type SendTxSuccess = t.TypeOf<typeof SendTxSuccess>

export const SendTxError = t.type(
  {
    error: t.type({
      message: t.string, // 'error message'
    })
  },
  'SendTxFailed'
)
export type SendTxError = t.TypeOf<typeof SendTxError>

export const EstimateFeeResponse = t.type({
  result: t.string,
}, 'EstimateFeeResponse')
export type EstimateFeeResponse = t.TypeOf<typeof EstimateFeeResponse>
