import * as t from 'io-ts';
export declare const NormalizedTxEthereumVin: t.IntersectionC<[t.IntersectionC<[t.TypeC<{
    n: t.NumberC;
}>, t.PartialC<{
    txid: t.StringC;
    vout: t.NumberC;
    sequence: t.NumberC;
    addresses: t.ArrayC<t.StringC>;
    value: t.StringC;
    hex: t.StringC;
    asm: t.StringC;
    coinbase: t.StringC;
    isAddress: t.BooleanC;
}>]>, t.TypeC<{
    addresses: t.ArrayC<t.StringC>;
}>]>;
export declare type NormalizedTxEthereumVin = t.TypeOf<typeof NormalizedTxEthereumVin>;
export declare const NormalizedTxEthereumVout: t.IntersectionC<[t.IntersectionC<[t.TypeC<{
    n: t.NumberC;
    addresses: t.ArrayC<t.StringC>;
}>, t.PartialC<{
    value: t.StringC;
    spent: t.BooleanC;
    spentTxId: t.StringC;
    spentIndex: t.NumberC;
    spentHeight: t.NumberC;
    hex: t.StringC;
    asm: t.StringC;
    type: t.StringC;
    isAddress: t.BooleanC;
}>]>, t.TypeC<{
    value: t.StringC;
}>]>;
export declare type NormalizedTxEthereumVout = t.TypeOf<typeof NormalizedTxEthereumVout>;
export declare const NormalizedTxEthereum: t.IntersectionC<[t.IntersectionC<[t.TypeC<{
    txid: t.StringC;
    vin: t.ArrayC<t.IntersectionC<[t.TypeC<{
        n: t.NumberC;
    }>, t.PartialC<{
        txid: t.StringC;
        vout: t.NumberC;
        sequence: t.NumberC;
        addresses: t.ArrayC<t.StringC>;
        value: t.StringC;
        hex: t.StringC;
        asm: t.StringC;
        coinbase: t.StringC;
        isAddress: t.BooleanC;
    }>]>>;
    vout: t.ArrayC<t.IntersectionC<[t.TypeC<{
        n: t.NumberC;
        addresses: t.ArrayC<t.StringC>;
    }>, t.PartialC<{
        value: t.StringC;
        spent: t.BooleanC;
        spentTxId: t.StringC;
        spentIndex: t.NumberC;
        spentHeight: t.NumberC;
        hex: t.StringC;
        asm: t.StringC;
        type: t.StringC;
        isAddress: t.BooleanC;
    }>]>>;
    blockHeight: t.NumberC;
    confirmations: t.NumberC;
    blockTime: t.NumberC;
    value: t.StringC;
}>, t.PartialC<{
    version: t.NumberC;
    lockTime: t.NumberC;
    blockHash: t.StringC;
    size: t.NumberC;
    valueIn: t.StringC;
    fees: t.StringC;
    hex: t.StringC;
    tokenTransfers: t.ArrayC<t.TypeC<{
        type: t.StringC;
        from: t.StringC;
        to: t.StringC;
        token: t.StringC;
        name: t.StringC;
        symbol: t.StringC;
        decimals: t.NumberC;
        value: t.StringC;
    }>>;
    ethereumSpecific: t.TypeC<{
        status: t.NumberC;
        nonce: t.NumberC;
        gasLimit: t.NumberC;
        gasUsed: t.NumberC;
        gasPrice: t.StringC;
    }>;
}>]>, t.TypeC<{
    vin: t.ArrayC<t.IntersectionC<[t.IntersectionC<[t.TypeC<{
        n: t.NumberC;
    }>, t.PartialC<{
        txid: t.StringC;
        vout: t.NumberC;
        sequence: t.NumberC;
        addresses: t.ArrayC<t.StringC>;
        value: t.StringC;
        hex: t.StringC;
        asm: t.StringC;
        coinbase: t.StringC;
        isAddress: t.BooleanC;
    }>]>, t.TypeC<{
        addresses: t.ArrayC<t.StringC>;
    }>]>>;
    vout: t.ArrayC<t.IntersectionC<[t.IntersectionC<[t.TypeC<{
        n: t.NumberC;
        addresses: t.ArrayC<t.StringC>;
    }>, t.PartialC<{
        value: t.StringC;
        spent: t.BooleanC;
        spentTxId: t.StringC;
        spentIndex: t.NumberC;
        spentHeight: t.NumberC;
        hex: t.StringC;
        asm: t.StringC;
        type: t.StringC;
        isAddress: t.BooleanC;
    }>]>, t.TypeC<{
        value: t.StringC;
    }>]>>;
    fees: t.StringC;
    ethereumSpecific: t.TypeC<{
        status: t.NumberC;
        nonce: t.NumberC;
        gasLimit: t.NumberC;
        gasUsed: t.NumberC;
        gasPrice: t.StringC;
    }>;
}>]>;
export declare type NormalizedTxEthereum = t.TypeOf<typeof NormalizedTxEthereum>;
export declare const SpecificTxEthereumTx: t.TypeC<{
    nonce: t.StringC;
    gasPrice: t.StringC;
    gas: t.StringC;
    to: t.StringC;
    value: t.StringC;
    input: t.StringC;
    hash: t.StringC;
    blockNumber: t.StringC;
    blockHash: t.StringC;
    from: t.StringC;
    transactionIndex: t.StringC;
}>;
export declare type SpecificTxEthereumTx = t.TypeOf<typeof SpecificTxEthereumTx>;
export declare const SpecificTxEthereumReceipt: t.TypeC<{
    gasUsed: t.StringC;
    status: t.StringC;
    logs: t.ArrayC<t.AnyC>;
}>;
export declare type SpecificTxEthereumReceipt = t.TypeOf<typeof SpecificTxEthereumReceipt>;
export declare const SpecificTxEthereum: t.TypeC<{
    tx: t.TypeC<{
        nonce: t.StringC;
        gasPrice: t.StringC;
        gas: t.StringC;
        to: t.StringC;
        value: t.StringC;
        input: t.StringC;
        hash: t.StringC;
        blockNumber: t.StringC;
        blockHash: t.StringC;
        from: t.StringC;
        transactionIndex: t.StringC;
    }>;
    receipt: t.TypeC<{
        gasUsed: t.StringC;
        status: t.StringC;
        logs: t.ArrayC<t.AnyC>;
    }>;
}>;
export declare type SpecificTxEthereum = t.TypeOf<typeof SpecificTxEthereum>;
export declare const TokenDetailsERC20: t.TypeC<{
    type: t.LiteralC<"ERC20">;
    name: t.StringC;
    contract: t.StringC;
    transfers: t.NumberC;
    symbol: t.StringC;
}>;
export declare type TokenDetailsERC20 = t.TypeOf<typeof TokenDetailsERC20>;
export declare const TokenDetailsERC20Balance: t.IntersectionC<[t.TypeC<{
    type: t.LiteralC<"ERC20">;
    name: t.StringC;
    contract: t.StringC;
    transfers: t.NumberC;
    symbol: t.StringC;
}>, t.TypeC<{
    balance: t.StringC;
}>]>;
export declare type TokenDetailsERC20Balance = t.TypeOf<typeof TokenDetailsERC20Balance>;
export declare const AddressDetailsEthereumBasic: t.IntersectionC<[t.IntersectionC<[t.TypeC<{
    address: t.StringC;
    balance: t.StringC;
    unconfirmedBalance: t.StringC;
    unconfirmedTxs: t.NumberC;
    txs: t.NumberC;
}>, t.PartialC<{
    totalReceived: t.StringC;
    totalSent: t.StringC;
    nonTokenTxs: t.NumberC;
    nonce: t.StringC;
    usedTokens: t.NumberC;
    erc20Contract: t.AnyC;
}>]>, t.TypeC<{
    nonTokenTxs: t.NumberC;
    nonce: t.StringC;
}>]>;
export declare type AddressDetailsEthereumBasic = t.TypeOf<typeof AddressDetailsEthereumBasic>;
export declare const AddressDetailsEthereumTokens: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.TypeC<{
    address: t.StringC;
    balance: t.StringC;
    unconfirmedBalance: t.StringC;
    unconfirmedTxs: t.NumberC;
    txs: t.NumberC;
}>, t.PartialC<{
    totalReceived: t.StringC;
    totalSent: t.StringC;
    nonTokenTxs: t.NumberC;
    nonce: t.StringC;
    usedTokens: t.NumberC;
    erc20Contract: t.AnyC;
}>]>, t.TypeC<{
    nonTokenTxs: t.NumberC;
    nonce: t.StringC;
}>]>, t.PartialC<{
    tokens: t.TypeC<{
        type: t.LiteralC<"ERC20">;
        name: t.StringC;
        contract: t.StringC;
        transfers: t.NumberC;
        symbol: t.StringC;
    }>;
}>]>;
export declare type AddressDetailsEthereumTokens = t.TypeOf<typeof AddressDetailsEthereumTokens>;
export declare const AddressDetailsEthereumTokenBalances: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.TypeC<{
    address: t.StringC;
    balance: t.StringC;
    unconfirmedBalance: t.StringC;
    unconfirmedTxs: t.NumberC;
    txs: t.NumberC;
}>, t.PartialC<{
    totalReceived: t.StringC;
    totalSent: t.StringC;
    nonTokenTxs: t.NumberC;
    nonce: t.StringC;
    usedTokens: t.NumberC;
    erc20Contract: t.AnyC;
}>]>, t.TypeC<{
    nonTokenTxs: t.NumberC;
    nonce: t.StringC;
}>]>, t.PartialC<{
    tokens: t.IntersectionC<[t.TypeC<{
        type: t.LiteralC<"ERC20">;
        name: t.StringC;
        contract: t.StringC;
        transfers: t.NumberC;
        symbol: t.StringC;
    }>, t.TypeC<{
        balance: t.StringC;
    }>]>;
}>]>;
export declare type AddressDetailsEthereumTokenBalances = t.TypeOf<typeof AddressDetailsEthereumTokenBalances>;
export declare const AddressDetailsEthereumTxids: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.TypeC<{
    address: t.StringC;
    balance: t.StringC;
    unconfirmedBalance: t.StringC;
    unconfirmedTxs: t.NumberC;
    txs: t.NumberC;
}>, t.PartialC<{
    totalReceived: t.StringC;
    totalSent: t.StringC;
    nonTokenTxs: t.NumberC;
    nonce: t.StringC;
    usedTokens: t.NumberC;
    erc20Contract: t.AnyC;
}>]>, t.TypeC<{
    nonTokenTxs: t.NumberC;
    nonce: t.StringC;
}>]>, t.PartialC<{
    tokens: t.IntersectionC<[t.TypeC<{
        type: t.LiteralC<"ERC20">;
        name: t.StringC;
        contract: t.StringC;
        transfers: t.NumberC;
        symbol: t.StringC;
    }>, t.TypeC<{
        balance: t.StringC;
    }>]>;
}>]>, t.PartialC<{
    txids: t.ArrayC<t.StringC>;
}>]>;
export declare type AddressDetailsEthereumTxids = t.TypeOf<typeof AddressDetailsEthereumTxids>;
export declare const AddressDetailsEthereumTxs: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.TypeC<{
    address: t.StringC;
    balance: t.StringC;
    unconfirmedBalance: t.StringC;
    unconfirmedTxs: t.NumberC;
    txs: t.NumberC;
}>, t.PartialC<{
    totalReceived: t.StringC;
    totalSent: t.StringC;
    nonTokenTxs: t.NumberC;
    nonce: t.StringC;
    usedTokens: t.NumberC;
    erc20Contract: t.AnyC;
}>]>, t.TypeC<{
    nonTokenTxs: t.NumberC;
    nonce: t.StringC;
}>]>, t.PartialC<{
    tokens: t.IntersectionC<[t.TypeC<{
        type: t.LiteralC<"ERC20">;
        name: t.StringC;
        contract: t.StringC;
        transfers: t.NumberC;
        symbol: t.StringC;
    }>, t.TypeC<{
        balance: t.StringC;
    }>]>;
}>]>, t.PartialC<{
    transactions: t.ArrayC<t.IntersectionC<[t.IntersectionC<[t.TypeC<{
        txid: t.StringC;
        vin: t.ArrayC<t.IntersectionC<[t.TypeC<{
            n: t.NumberC;
        }>, t.PartialC<{
            txid: t.StringC;
            vout: t.NumberC;
            sequence: t.NumberC;
            addresses: t.ArrayC<t.StringC>;
            value: t.StringC;
            hex: t.StringC;
            asm: t.StringC;
            coinbase: t.StringC;
            isAddress: t.BooleanC;
        }>]>>;
        vout: t.ArrayC<t.IntersectionC<[t.TypeC<{
            n: t.NumberC;
            addresses: t.ArrayC<t.StringC>;
        }>, t.PartialC<{
            value: t.StringC;
            spent: t.BooleanC;
            spentTxId: t.StringC;
            spentIndex: t.NumberC;
            spentHeight: t.NumberC;
            hex: t.StringC;
            asm: t.StringC;
            type: t.StringC;
            isAddress: t.BooleanC;
        }>]>>;
        blockHeight: t.NumberC;
        confirmations: t.NumberC;
        blockTime: t.NumberC;
        value: t.StringC;
    }>, t.PartialC<{
        version: t.NumberC;
        lockTime: t.NumberC;
        blockHash: t.StringC;
        size: t.NumberC;
        valueIn: t.StringC;
        fees: t.StringC;
        hex: t.StringC;
        tokenTransfers: t.ArrayC<t.TypeC<{
            type: t.StringC;
            from: t.StringC;
            to: t.StringC;
            token: t.StringC;
            name: t.StringC;
            symbol: t.StringC;
            decimals: t.NumberC;
            value: t.StringC;
        }>>;
        ethereumSpecific: t.TypeC<{
            status: t.NumberC;
            nonce: t.NumberC;
            gasLimit: t.NumberC;
            gasUsed: t.NumberC;
            gasPrice: t.StringC;
        }>;
    }>]>, t.TypeC<{
        vin: t.ArrayC<t.IntersectionC<[t.IntersectionC<[t.TypeC<{
            n: t.NumberC;
        }>, t.PartialC<{
            txid: t.StringC;
            vout: t.NumberC;
            sequence: t.NumberC;
            addresses: t.ArrayC<t.StringC>;
            value: t.StringC;
            hex: t.StringC;
            asm: t.StringC;
            coinbase: t.StringC;
            isAddress: t.BooleanC;
        }>]>, t.TypeC<{
            addresses: t.ArrayC<t.StringC>;
        }>]>>;
        vout: t.ArrayC<t.IntersectionC<[t.IntersectionC<[t.TypeC<{
            n: t.NumberC;
            addresses: t.ArrayC<t.StringC>;
        }>, t.PartialC<{
            value: t.StringC;
            spent: t.BooleanC;
            spentTxId: t.StringC;
            spentIndex: t.NumberC;
            spentHeight: t.NumberC;
            hex: t.StringC;
            asm: t.StringC;
            type: t.StringC;
            isAddress: t.BooleanC;
        }>]>, t.TypeC<{
            value: t.StringC;
        }>]>>;
        fees: t.StringC;
        ethereumSpecific: t.TypeC<{
            status: t.NumberC;
            nonce: t.NumberC;
            gasLimit: t.NumberC;
            gasUsed: t.NumberC;
            gasPrice: t.StringC;
        }>;
    }>]>>;
}>]>;
export declare type AddressDetailsEthereumTxs = t.TypeOf<typeof AddressDetailsEthereumTxs>;
export declare const BlockInfoEthereum: t.IntersectionC<[t.IntersectionC<[t.TypeC<{
    hash: t.StringC;
    height: t.NumberC;
    confirmations: t.NumberC;
    size: t.NumberC;
    version: t.NumberC;
    merkleRoot: t.StringC;
    nonce: t.StringC;
    bits: t.StringC;
    difficulty: t.StringC;
    txCount: t.NumberC;
    page: t.NumberC;
    totalPages: t.NumberC;
    itemsOnPage: t.NumberC;
}>, t.PartialC<{
    previousBlockHash: t.StringC;
    nextBlockHash: t.StringC;
    time: t.NumberC;
    txs: t.ArrayC<t.IntersectionC<[t.TypeC<{
        txid: t.StringC;
        vin: t.ArrayC<t.IntersectionC<[t.TypeC<{
            n: t.NumberC;
        }>, t.PartialC<{
            txid: t.StringC;
            vout: t.NumberC;
            sequence: t.NumberC;
            addresses: t.ArrayC<t.StringC>;
            value: t.StringC;
            hex: t.StringC;
            asm: t.StringC;
            coinbase: t.StringC;
            isAddress: t.BooleanC;
        }>]>>;
        vout: t.ArrayC<t.IntersectionC<[t.TypeC<{
            n: t.NumberC;
            addresses: t.ArrayC<t.StringC>;
        }>, t.PartialC<{
            value: t.StringC;
            spent: t.BooleanC;
            spentTxId: t.StringC;
            spentIndex: t.NumberC;
            spentHeight: t.NumberC;
            hex: t.StringC;
            asm: t.StringC;
            type: t.StringC;
            isAddress: t.BooleanC;
        }>]>>;
        blockHeight: t.NumberC;
        confirmations: t.NumberC;
        blockTime: t.NumberC;
        value: t.StringC;
    }>, t.PartialC<{
        version: t.NumberC;
        lockTime: t.NumberC;
        blockHash: t.StringC;
        size: t.NumberC;
        valueIn: t.StringC;
        fees: t.StringC;
        hex: t.StringC;
        tokenTransfers: t.ArrayC<t.TypeC<{
            type: t.StringC;
            from: t.StringC;
            to: t.StringC;
            token: t.StringC;
            name: t.StringC;
            symbol: t.StringC;
            decimals: t.NumberC;
            value: t.StringC;
        }>>;
        ethereumSpecific: t.TypeC<{
            status: t.NumberC;
            nonce: t.NumberC;
            gasLimit: t.NumberC;
            gasUsed: t.NumberC;
            gasPrice: t.StringC;
        }>;
    }>]>>;
}>]>, t.PartialC<{
    txs: t.ArrayC<t.IntersectionC<[t.IntersectionC<[t.TypeC<{
        txid: t.StringC;
        vin: t.ArrayC<t.IntersectionC<[t.TypeC<{
            n: t.NumberC;
        }>, t.PartialC<{
            txid: t.StringC;
            vout: t.NumberC;
            sequence: t.NumberC;
            addresses: t.ArrayC<t.StringC>;
            value: t.StringC;
            hex: t.StringC;
            asm: t.StringC;
            coinbase: t.StringC;
            isAddress: t.BooleanC;
        }>]>>;
        vout: t.ArrayC<t.IntersectionC<[t.TypeC<{
            n: t.NumberC;
            addresses: t.ArrayC<t.StringC>;
        }>, t.PartialC<{
            value: t.StringC;
            spent: t.BooleanC;
            spentTxId: t.StringC;
            spentIndex: t.NumberC;
            spentHeight: t.NumberC;
            hex: t.StringC;
            asm: t.StringC;
            type: t.StringC;
            isAddress: t.BooleanC;
        }>]>>;
        blockHeight: t.NumberC;
        confirmations: t.NumberC;
        blockTime: t.NumberC;
        value: t.StringC;
    }>, t.PartialC<{
        version: t.NumberC;
        lockTime: t.NumberC;
        blockHash: t.StringC;
        size: t.NumberC;
        valueIn: t.StringC;
        fees: t.StringC;
        hex: t.StringC;
        tokenTransfers: t.ArrayC<t.TypeC<{
            type: t.StringC;
            from: t.StringC;
            to: t.StringC;
            token: t.StringC;
            name: t.StringC;
            symbol: t.StringC;
            decimals: t.NumberC;
            value: t.StringC;
        }>>;
        ethereumSpecific: t.TypeC<{
            status: t.NumberC;
            nonce: t.NumberC;
            gasLimit: t.NumberC;
            gasUsed: t.NumberC;
            gasPrice: t.StringC;
        }>;
    }>]>, t.TypeC<{
        vin: t.ArrayC<t.IntersectionC<[t.IntersectionC<[t.TypeC<{
            n: t.NumberC;
        }>, t.PartialC<{
            txid: t.StringC;
            vout: t.NumberC;
            sequence: t.NumberC;
            addresses: t.ArrayC<t.StringC>;
            value: t.StringC;
            hex: t.StringC;
            asm: t.StringC;
            coinbase: t.StringC;
            isAddress: t.BooleanC;
        }>]>, t.TypeC<{
            addresses: t.ArrayC<t.StringC>;
        }>]>>;
        vout: t.ArrayC<t.IntersectionC<[t.IntersectionC<[t.TypeC<{
            n: t.NumberC;
            addresses: t.ArrayC<t.StringC>;
        }>, t.PartialC<{
            value: t.StringC;
            spent: t.BooleanC;
            spentTxId: t.StringC;
            spentIndex: t.NumberC;
            spentHeight: t.NumberC;
            hex: t.StringC;
            asm: t.StringC;
            type: t.StringC;
            isAddress: t.BooleanC;
        }>]>, t.TypeC<{
            value: t.StringC;
        }>]>>;
        fees: t.StringC;
        ethereumSpecific: t.TypeC<{
            status: t.NumberC;
            nonce: t.NumberC;
            gasLimit: t.NumberC;
            gasUsed: t.NumberC;
            gasPrice: t.StringC;
        }>;
    }>]>>;
}>]>;
export declare type BlockInfoEthereum = t.TypeOf<typeof BlockInfoEthereum>;
