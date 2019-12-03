import { Blockbook } from '../src'

describe('Blockbook', () => {
  const bb = new Blockbook({
    nodes: ['btc1.trezor.io'],
  })
  describe('getStatus', () => {
    it('succeeds', async () => {
      expect(await bb.getStatus()).toBeDefined()
    })
  })
  describe('getBlockHash', () => {
    it('returns correct hash for block 100000', async () => {
      expect(await bb.getBlockHash(100000)).toBe('000000000003ba27aa200b1cecaad478d2b00432346c3f1f3986da1afd33e506')
    })
  })
})
