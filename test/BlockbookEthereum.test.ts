import { BlockbookEthereum } from '../src'

const NODES = process.env.ETHEREUM_SERVER_URL?.split(',') ?? ['eth1.trezor.io', 'eth2.trezor.io']
const BLOCK_NUMBER = 1000000
const BLOCK_HASH = '0x8e38b4dbf6b11fcc3b9dee84fb7986e29ca0a02cecd8977c161ff7333329681e'
const ADDRESS = '0xFc32E838dD435c1904C3AAD640Dc7B419e9c891d'
const TXID = '0xf09499a7e72ccf66a0cac01eeb5f5616f275dd4f103e3c0415fbb6e1997ed373'
const RAW_TX =
  '0xf870830162988502540be40083186a0094fc32e838dd435c1904c3aad640dc7b419e9c891d8801e062bbbd1d11008026a01f4ba49998c3f4f34ffea6e05eb94bca642e532f776f28fa10c32e1081d42673a01016ad652bb3b4a3b9b68bd81fe48a15b3f1b53385434e395d3990a396652238'

describe('BlockbookEthereum', () => {
  const bb = new BlockbookEthereum({
    nodes: NODES,
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
  })
  describe('getTxSpecific', () => {
    it('succeeds', async () => {
      expect(await bb.getTxSpecific(TXID)).toBeDefined()
    })
  })

  describe('getAddressDetails', () => {
    it('succeeds', async () => {
      expect(await bb.getAddressDetails(ADDRESS)).toBeDefined()
    })
  })

  describe('getAddressDetails2', () => {
    it('succeeds', async () => {
      expect(await bb.getAddressDetails('0x176366cFD97885245fAEA72f8cB6951e52655Adf')).toBeDefined()
    })
  })

  describe('getAddressDetails - faa.st wallet', () => {
    it('succeeds', async () => {
      expect(await bb.getAddressDetails('0x94fe3ad91dacba8ec4b82f56ff7c122181f1535d')).toBeDefined()
    })
  })
  describe('getXpubDetails', () => {
    it('throws unsupported', async () => {
      await expect(bb.getXpubDetails()).rejects.toThrow('not supported')
    })
  })
  describe('getUtxosForAddress', () => {
    it('throws unsupported', async () => {
      await expect(bb.getUtxosForAddress()).rejects.toThrow('not supported')
    })
  })
  describe('getUtxosForXpub', () => {
    it('throws unsupported', async () => {
      await expect(bb.getUtxosForXpub()).rejects.toThrow('not supported')
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
      await expect(bb.sendTx(RAW_TX)).rejects.toThrow('nonce too low')
    })
  })
  describe('estimateFee', () => {
    it('succeeds', async () => {
      const result = Number.parseFloat(await bb.estimateFee(1))
      expect(result).toBeGreaterThan(0)
    })
  })
})
