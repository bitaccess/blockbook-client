import { BlockbookBitcoin } from '../src'
const axios = require('axios')
// jest.mock('axios')

const NODES = process.env.BITCOIN_SERVER_URL?.split(',') ?? ['btc1.trezor.io', 'btc2.trezor.io', 'btc3.trezor.io']
const BLOCK_NUMBER = 666666
const BLOCK_HASH = '0000000000000000000b7b8574bc6fd285825ec2dbcbeca149121fc05b0c828c'
const XPUB =
  'xpub661MyMwAqRbcFtXgS5sYJABqqG9YLmC4Q1Rdap9gSE8NqtwybGhePY2gZ29ESFjqJoCu1Rupje8YtGqsefD265TMg7usUDFdp6W1EGMcet8'
const ADDRESS = '193P6LtvS4nCnkDvM9uXn1gsSRqh4aDAz7'
const TXID = '251b9c567fc7bca1cd354ce7aa278d48af79438ccae871a585b4b89d10aaa649'
const RAW_TX =
  '0200000001d1442246db3345a611d864e7753ee1e4dd7476817aacf53c4fbfa17447c5e8ab000000006b483045022100910d62240028c179011c2cd15ded7353422db26c17f95225683c412a8d89e1ee0220017c427c8e4252d7d28fac5b95068ff8604d15755c7ff3b36459824041446ec8012102430848768b5fba28c043fd71ba01acf38e7ae356fc27f1312bd8b283c1d22358fdffffff020c200100000000001976a91420745eb623e0103fdc499a7369b91c96655df09588ac88e703000000000017a914751ef966546056ee26ffeeee3cf9dc33b42da8bb875f420900'
const mockedCoinbaseResponse = {
  page: 1,
  totalPages: 3,
  itemsOnPage: 1000,
  hash: '0000000000000000000b7b8574bc6fd285825ec2dbcbeca149121fc05b0c828c',
  previousBlockHash: '0000000000000000000d3ac711558b41b477e4d2c178aa816f267ee9e82c71a3',
  nextBlockHash: '00000000000000000006ab70890dee2655cffb5b722c4d65ae3b41a6560dc861',
  height: 666666,
  confirmations: 66857,
  size: 1252868,
  time: 1611012483,
  version: 536870912,
  merkleRoot: 'f0ee88d161a79234fe61e5d109daa8ab2b8ca605cdf3a5fa6acc31853b16426c',
  nonce: '1795946055',
  bits: '170da8a1',
  difficulty: '20607418304385.63',
  txCount: 2728,
  txs: [
    {
      txid: '01d2b94605d01eb2015c437399398da45dbcf27af8dbc68f019c885593aad568',
      vin: [
        {
          sequence: 4294967295,
          n: 0,
          isAddress: false,
          coinbase:
            '03822f0b182f5669614254432f4d696e656420627920717565656e6c2f2cfabe6d6d8dde6179768149149dd904d8f65585c7ca93d086d9c476e0ae6ce79ad24bf19f1000000000000000103fc96500b7e2b1e1c45e7001748a000000000000',
        },
      ],
      vout: [],
      blockHash: '0000000000000000000b7b8574bc6fd285825ec2dbcbeca149121fc05b0c828c',
      blockHeight: 666666,
      confirmations: 66856,
      blockTime: 1611012483,
      value: '146131',
      valueIn: '155173',
      fees: '9042',
    },
  ],
}
describe('BlockbookBitcoin', () => {
  function runStandardTests(bb: BlockbookBitcoin) {
    describe('getBlockHash', () => {
      it('returns correct hash', async () => {
        expect(await bb.getBlockHash(BLOCK_NUMBER)).toBe(BLOCK_HASH)
      })
    })
    describe('getTx', () => {
      it('succeeds', async () => {
        expect(await bb.getTx(TXID)).toBeDefined()
      })
      it('throws on invalid txid', async () => {
        await expect(bb.getTx('1234')).rejects.toThrow("Transaction '1234' not found")
      })
    })
    describe('getTxSpecific', () => {
      it('succeeds', async () => {
        expect(await bb.getTxSpecific(TXID)).toBeDefined()
      })
    })
    describe('getAddressDetails', () => {
      it('succeeds with only address', async () => {
        expect(await bb.getAddressDetails(ADDRESS)).toBeDefined()
      })
      it('succeeds with custom details level', async () => {
        expect(await bb.getAddressDetails(ADDRESS, { details: 'basic' })).toBeDefined()
      })
    })
    describe('getXpubDetails', () => {
      it('succeeds', async () => {
        expect(await bb.getXpubDetails(XPUB)).toBeDefined()
      })
    })
    describe('getUtxosForAddress', () => {
      it('succeeds', async () => {
        expect(await bb.getUtxosForAddress(ADDRESS)).toBeDefined()
      })
    })
    describe('getUtxosForXpub', () => {
      it('succeeds', async () => {
        expect(await bb.getUtxosForXpub(XPUB)).toBeDefined()
      })
    })
    describe('getBlock', () => {
      it('succeeds without options', async () => {
        const block = await bb.getBlock(BLOCK_NUMBER)
        expect(block).toBeDefined()
        expect(block.hash).toBe(BLOCK_HASH)
        expect(block.page).toBe(1)
        expect(block.totalPages).toBe(3)
        expect(block.itemsOnPage).toBe(1000)
      })
      it('succeeds with page number', async () => {
        const blockP2 = await bb.getBlock(BLOCK_NUMBER, { page: 2 })
        expect(blockP2).toBeDefined()
        expect(blockP2.hash).toBe(BLOCK_HASH)
        expect(blockP2.page).toBe(2)
        expect(blockP2.totalPages).toBe(3)
        expect(blockP2.itemsOnPage).toBe(1000)
      })
      it('succeeds when coinbase block vin has no value', async () => {
        const mock = jest.spyOn(axios, 'request')
        try {
          mock.mockReturnValue({ status: 200, data: mockedCoinbaseResponse })
          const blockP3 = await bb.getBlock(BLOCK_NUMBER, { page: 1 })
          expect(blockP3).toBeDefined()
        } finally {
          // close mock even if this test fail
          mock.mockRestore()
        }
      })
    })
    describe('sendTx throws on already broadcast', () => {
      it('succeeds', async () => {
        await expect(bb.sendTx(RAW_TX)).rejects.toThrow()
      })
    })
    describe('estimateFee', () => {
      it('succeeds', async () => {
        const result = Number.parseFloat(await bb.estimateFee(1))
        expect(result).toBeGreaterThan(0)
      })
    })
    describe('getBestBlock', () => {
      it('succeeds', async () => {
        const result = await bb.getBestBlock()
        expect(result.height).toBeGreaterThan(0)
        expect(result.hash).toMatch(/^[0-9a-f]{64}$/)
      })
    })
  }

  describe('http', () => {
    const bb = new BlockbookBitcoin({
      nodes: NODES,
    })

    describe('getStatus', () => {
      it('succeeds', async () => {
        expect(await bb.getStatus()).toBeDefined()
      })
      it('throws for bad node then succeeds for good', async () => {
        const bb2 = new BlockbookBitcoin({
          nodes: ['btc1234.trezor.io', ...NODES],
        })
        await expect(bb2.getStatus()).rejects.toThrow('ENOTFOUND')
        expect(await bb2.getStatus()).toBeDefined()
      })
    })

    runStandardTests(bb)
  })

  describe('ws', () => {
    let bb = new BlockbookBitcoin({
      nodes: NODES,
    })
    const blockEvents = []
    const addressEvents = []

    beforeAll(async () => {
      await bb.connect()
    })

    afterAll(async () => {
      await bb.disconnect()
    })

    describe('getInfo', () => {
      it('succeeds', async () => {
        expect(await bb.getInfo()).toBeDefined()
      })
      it('throws for bad node then succeeds for good', async () => {
        const bb2 = new BlockbookBitcoin({
          nodes: ['btc1234.trezor.io', ...NODES],
        })
        await expect(bb2.connect()).rejects.toThrow('ENOTFOUND')
        try {
          await bb2.connect()
        } finally {
          await bb2.disconnect()
        }
      })
    })

    describe('subscribeNewBlock', () => {
      it('can subscribe', async () => {
        const result = await bb.subscribeNewBlock(console.log)
        expect(result).toEqual({ subscribed: true })
      })
      it('can unsubscribe', async () => {
        const result = await bb.unsubscribeNewBlock()
        expect(result).toEqual({ subscribed: false })
      })
    })

    describe('subscribeAddresses', () => {
      it('can subscribe to address', async () => {
        const result = await bb.subscribeAddresses([ADDRESS], console.log)
        expect(result).toEqual({ subscribed: true })
      })
      it('can unsubscribe', async () => {
        const result = await bb.unsubscribeAddresses()
        expect(result).toEqual({ subscribed: false })
      })
    })

    runStandardTests(bb)
  })
})
