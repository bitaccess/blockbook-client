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

// Example methods using http
await blockbook.getStatus()
await blockbook.getBlockHash(100000) // -> '000000000003ba27aa200b1cecaad478d2b00432346c3f1f3986da1afd33e506'
await blockbook.getTx('b62aa5203fa27495ea431b91a5090aab741c8c39cc03ec4c1f4f4e157507595f')
await blockbook.getTxSpecific('b62aa5203fa27495ea431b91a5090aab741c8c39cc03ec4c1f4f4e157507595f')
await blockbook.getAddressDetails('193P6LtvS4nCnkDvM9uXn1gsSRqh4aDAz7')
await blockbook.getXpubDetails('xpub661MyMwAqRbcFtXgS5sYJABqqG9YLmC4Q1Rdap9gSE8NqtwybGhePY2gZ29ESFjqJoCu1Rupje8YtGqsefD265TMg7usUDFdp6W1EGMcet8', { details: 'txids' })
await blockbook.getUtxosForAddress('193P6LtvS4nCnkDvM9uXn1gsSRqh4aDAz7')
await blockbook.getUtxosForXpub('xpub661MyMwAqRbcFtXgS5sYJABqqG9YLmC4Q1Rdap9gSE8NqtwybGhePY2gZ29ESFjqJoCu1Rupje8YtGqsefD265TMg7usUDFdp6W1EGMcet8', { confirmed: true })
await blockbook.getBlock(100000)
await blockbook.sendTx('<hex tx data>')

// To use websockets
await blockbook.connect()
await blockbook.subscribeNewBlock(({ height, hash }) => console.log('new block', height, hash))
await blockbook.subscribeAddresses(['193P6LtvS4nCnkDvM9uXn1gsSRqh4aDAz7'], ({ address, tx }) => console.log('new tx for address', address, tx))
await blockbook.unsubscribeNewBlock()
await blockbook.unsubscribeAddresses()
await blockbook.disconnect()

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
