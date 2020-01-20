import { BlockbookBitcoin } from '../src'

const BLOCK_NUMBER = 100000
const BLOCK_HASH = '000000000003ba27aa200b1cecaad478d2b00432346c3f1f3986da1afd33e506'
const XPUB = 'xpub661MyMwAqRbcFtXgS5sYJABqqG9YLmC4Q1Rdap9gSE8NqtwybGhePY2gZ29ESFjqJoCu1Rupje8YtGqsefD265TMg7usUDFdp6W1EGMcet8'
const ADDRESS = '193P6LtvS4nCnkDvM9uXn1gsSRqh4aDAz7'
const TXID = '251b9c567fc7bca1cd354ce7aa278d48af79438ccae871a585b4b89d10aaa649'
const RAW_TX = '0200000001d1442246db3345a611d864e7753ee1e4dd7476817aacf53c4fbfa17447c5e8ab000000006b483045022100910d62240028c179011c2cd15ded7353422db26c17f95225683c412a8d89e1ee0220017c427c8e4252d7d28fac5b95068ff8604d15755c7ff3b36459824041446ec8012102430848768b5fba28c043fd71ba01acf38e7ae356fc27f1312bd8b283c1d22358fdffffff020c200100000000001976a91420745eb623e0103fdc499a7369b91c96655df09588ac88e703000000000017a914751ef966546056ee26ffeeee3cf9dc33b42da8bb875f420900'

describe('BlockbookBitcoin', () => {
  const bb = new BlockbookBitcoin({
    nodes: ['btc1.trezor.io'],
  })
  describe('getStatus', () => {
    it('succeeds', async () => {
      expect(await bb.getStatus()).toBeDefined()
    })
  })
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
    it('succeeds', async () => {
      const block = await bb.getBlock(BLOCK_NUMBER)
      expect(block).toBeDefined()
      expect(block.hash).toBe(BLOCK_HASH)
    })
  })
  describe('sendTx throws on already broadcast', () => {
    it('succeeds', async () => {
      await expect(bb.sendTx(RAW_TX)).rejects.toThrow()
    })
  })
})
