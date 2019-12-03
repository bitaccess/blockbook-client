# blockbook-client

Typescript library for interacting with Trezor's [blockbook](https://github.com/trezor/blockbook) API.

## Usage

```bash
npm i blockbook-client
```

### In typescript

```typescript
import { Blockbook } from 'blockbook-client'

const blockbook = new Blockbook({
  nodes: ['btc1.trezor.io', 'btc2.trezor.io'],
})

// Example methods
await blockbook.getStatus()
await blockbook.getBlockHash(100000) // -> '000000000003ba27aa200b1cecaad478d2b00432346c3f1f3986da1afd33e506'
await blockbook.getTx('2266ea441e3fbd144e33dc6c62c0d354d59dc267b48efe9a98a6e2fe6584cbd1')
await blockbook.getTxSpecific('2266ea441e3fbd144e33dc6c62c0d354d59dc267b48efe9a98a6e2fe6584cbd1')
await blockbook.getAddressDetails('1HWqMzw1jfpXb3xyuUZ4uWXY4tqL2cW47J')
await blockbook.getXpubDetails('dgub8sbe5Mi8LA4dXB9zPfLZW8arm...9Vjp2HHx91xdDEmWYpmD49fpoUYF', { details: 'txids' })
await blockbook.getUtxosForAddress('1HWqMzw1jfpXb3xyuUZ4uWXY4tqL2cW47J')
await blockbook.getUtxosForXpub('dgub8sbe5Mi8LA4dXB9zPfLZW8arm...9Vjp2HHx91xdDEmWYpmD49fpoUYF', { confirmed: true })
await blockbook.getBlock(100000)
await blockbook.sendTx('<hex tx data>')

// For more specific typings of bitcoin-like or ethereum-like coins use one of
// the following classes instead. The `Blockbook` class will work with any coin
// but returns more optional fields than the following.
import { BlockbookBitcoin, BlockbookEthereum } from 'blockbook-client'
```

### In javascript

```javascript
const { Blockbook } = require('blockbook-client')

const blockbook = new Blockbook({
  nodes: ['btc1.trezor.io', 'btc2.trezor.io'],
  disableTypeValidation: true, // Turns off runtime type validation
})
```

## Docs

```bash
open docs/index.html
```
