import * as t from 'io-ts';
export declare const NormalizedTxBitcoinVin: t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
    value: t.StringC;
}>]>;
export declare type NormalizedTxBitcoinVin = t.TypeOf<typeof NormalizedTxBitcoinVin>;
export declare const NormalizedTxBitcoinVout: t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
export declare type NormalizedTxBitcoinVout = t.TypeOf<typeof NormalizedTxBitcoinVout>;
export declare const NormalizedTxBitcoin: t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
        value: t.StringC;
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
    valueIn: t.StringC;
    fees: t.StringC;
}>]>;
export declare type NormalizedTxBitcoin = t.TypeOf<typeof NormalizedTxBitcoin>;
export declare const SpecificTxBitcoinVinScriptSig: t.TypeC<{
    asm: t.StringC;
    hex: t.StringC;
}>;
export declare type SpecificTxBitcoinVinScriptSig = t.TypeOf<typeof SpecificTxBitcoinVinScriptSig>;
export declare const SpecificTxBitcoinVin: t.TypeC<{
    txid: t.StringC;
    vout: t.NumberC;
    scriptSig: t.TypeC<{
        asm: t.StringC;
        hex: t.StringC;
    }>;
    sequence: t.NumberC;
}>;
export declare type SpecificTxBitcoinVin = t.TypeOf<typeof SpecificTxBitcoinVin>;
export declare const SpecificTxBitcoinVoutScriptPubKey: t.TypeC<{
    asm: t.StringC;
    hex: t.StringC;
    reqSigs: t.NumberC;
    type: t.StringC;
    addresses: t.ArrayC<t.StringC>;
}>;
export declare type SpecificTxBitcoinVoutScriptPubKey = t.TypeOf<typeof SpecificTxBitcoinVoutScriptPubKey>;
export declare const SpecificTxBitcoinVout: t.TypeC<{
    value: t.NumberC;
    n: t.NumberC;
    scriptPubKey: t.TypeC<{
        asm: t.StringC;
        hex: t.StringC;
        reqSigs: t.NumberC;
        type: t.StringC;
        addresses: t.ArrayC<t.StringC>;
    }>;
}>;
export declare type SpecificTxBitcoinVout = t.TypeOf<typeof SpecificTxBitcoinVout>;
export declare const SpecificTxBitcoin: t.TypeC<{
    txid: t.StringC;
    hash: t.StringC;
    version: t.NumberC;
    size: t.NumberC;
    vsize: t.NumberC;
    weight: t.NumberC;
    locktime: t.NumberC;
    vin: t.ArrayC<t.TypeC<{
        txid: t.StringC;
        vout: t.NumberC;
        scriptSig: t.TypeC<{
            asm: t.StringC;
            hex: t.StringC;
        }>;
        sequence: t.NumberC;
    }>>;
    vout: t.ArrayC<t.TypeC<{
        value: t.NumberC;
        n: t.NumberC;
        scriptPubKey: t.TypeC<{
            asm: t.StringC;
            hex: t.StringC;
            reqSigs: t.NumberC;
            type: t.StringC;
            addresses: t.ArrayC<t.StringC>;
        }>;
    }>>;
    hex: t.StringC;
    blockhash: t.StringC;
    confirmations: t.NumberC;
    time: t.NumberC;
    blocktime: t.NumberC;
}>;
export declare type SpecificTxBitcoin = t.TypeOf<typeof SpecificTxBitcoin>;
export declare const AddressDetailsBitcoinBasic: t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
    totalReceived: t.StringC;
    totalSent: t.StringC;
}>]>;
export declare type AddressDetailsBitcoinBasic = t.TypeOf<typeof AddressDetailsBitcoinBasic>;
export declare const AddressDetailsBitcoinTokens: t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
    totalReceived: t.StringC;
    totalSent: t.StringC;
}>]>;
export declare type AddressDetailsBitcoinTokens = t.TypeOf<typeof AddressDetailsBitcoinTokens>;
export declare const AddressDetailsBitcoinTokenBalances: t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
    totalReceived: t.StringC;
    totalSent: t.StringC;
}>]>;
export declare type AddressDetailsBitcoinTokenBalances = t.TypeOf<typeof AddressDetailsBitcoinTokenBalances>;
export declare const AddressDetailsBitcoinTxids: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
    totalReceived: t.StringC;
    totalSent: t.StringC;
}>]>, t.PartialC<{
    txids: t.ArrayC<t.StringC>;
}>]>;
export declare type AddressDetailsBitcoinTxids = t.TypeOf<typeof AddressDetailsBitcoinTxids>;
export declare const AddressDetailsBitcoinTxs: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
    totalReceived: t.StringC;
    totalSent: t.StringC;
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
            value: t.StringC;
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
        valueIn: t.StringC;
        fees: t.StringC;
    }>]>>;
}>]>;
export declare type AddressDetailsBitcoinTxs = t.TypeOf<typeof AddressDetailsBitcoinTxs>;
export declare const GetXpubDetailsTokensOption: t.KeyofC<{
    nonzero: null;
    used: null;
    derived: null;
}>;
export declare type GetXpubDetailsTokensOption = t.TypeOf<typeof GetXpubDetailsTokensOption>;
export declare const GetXpubDetailsOptions: t.IntersectionC<[t.PartialC<{
    page: t.NumberC;
    pageSize: t.NumberC;
    from: t.NumberC;
    to: t.NumberC;
    details: t.KeyofC<{
        basic: null;
        tokens: null;
        tokenBalances: null;
        txids: null;
        txs: null;
    }>;
}>, t.PartialC<{
    usedTokens: t.NumberC;
    tokens: t.KeyofC<{
        nonzero: null;
        used: null;
        derived: null;
    }>;
}>]>;
export declare type GetXpubDetailsOptions = t.TypeOf<typeof GetXpubDetailsOptions>;
export declare const TokenDetailsXpubAddress: t.TypeC<{
    type: t.LiteralC<"XPUBAddress">;
    name: t.StringC;
    path: t.StringC;
    transfers: t.NumberC;
    decimals: t.NumberC;
    balance: t.StringC;
    totalReceived: t.StringC;
    totalSent: t.StringC;
}>;
export declare type TokenDetailsXpubAddress = t.TypeOf<typeof TokenDetailsXpubAddress>;
export declare const TokenDetailsXpubAddressBalance: t.IntersectionC<[t.TypeC<{
    type: t.LiteralC<"XPUBAddress">;
    name: t.StringC;
    path: t.StringC;
    transfers: t.NumberC;
    decimals: t.NumberC;
    balance: t.StringC;
    totalReceived: t.StringC;
    totalSent: t.StringC;
}>, t.TypeC<{
    balance: t.StringC;
}>]>;
export declare type TokenDetailsXpubAddressBalance = t.TypeOf<typeof TokenDetailsXpubAddressBalance>;
export declare const XpubDetailsBasic: t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
    totalReceived: t.StringC;
    totalSent: t.StringC;
}>]>;
export declare type XpubDetailsBasic = t.TypeOf<typeof XpubDetailsBasic>;
export declare const XpubDetailsTokens: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
    totalReceived: t.StringC;
    totalSent: t.StringC;
}>]>, t.PartialC<{
    tokens: t.TypeC<{
        type: t.LiteralC<"XPUBAddress">;
        name: t.StringC;
        path: t.StringC;
        transfers: t.NumberC;
        decimals: t.NumberC;
        balance: t.StringC;
        totalReceived: t.StringC;
        totalSent: t.StringC;
    }>;
}>]>;
export declare type XpubDetailsTokens = t.TypeOf<typeof XpubDetailsTokens>;
export declare const XpubDetailsTokenBalances: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
    totalReceived: t.StringC;
    totalSent: t.StringC;
}>]>, t.PartialC<{
    tokens: t.IntersectionC<[t.TypeC<{
        type: t.LiteralC<"XPUBAddress">;
        name: t.StringC;
        path: t.StringC;
        transfers: t.NumberC;
        decimals: t.NumberC;
        balance: t.StringC;
        totalReceived: t.StringC;
        totalSent: t.StringC;
    }>, t.TypeC<{
        balance: t.StringC;
    }>]>;
}>]>;
export declare type XpubDetailsTokenBalances = t.TypeOf<typeof XpubDetailsTokenBalances>;
export declare const XpubDetailsTxids: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
    totalReceived: t.StringC;
    totalSent: t.StringC;
}>]>, t.PartialC<{
    tokens: t.IntersectionC<[t.TypeC<{
        type: t.LiteralC<"XPUBAddress">;
        name: t.StringC;
        path: t.StringC;
        transfers: t.NumberC;
        decimals: t.NumberC;
        balance: t.StringC;
        totalReceived: t.StringC;
        totalSent: t.StringC;
    }>, t.TypeC<{
        balance: t.StringC;
    }>]>;
}>]>, t.PartialC<{
    txids: t.ArrayC<t.StringC>;
}>]>;
export declare type XpubDetailsTxids = t.TypeOf<typeof XpubDetailsTxids>;
export declare const XpubDetailsTxs: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
    totalReceived: t.StringC;
    totalSent: t.StringC;
}>]>, t.PartialC<{
    tokens: t.IntersectionC<[t.TypeC<{
        type: t.LiteralC<"XPUBAddress">;
        name: t.StringC;
        path: t.StringC;
        transfers: t.NumberC;
        decimals: t.NumberC;
        balance: t.StringC;
        totalReceived: t.StringC;
        totalSent: t.StringC;
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
            value: t.StringC;
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
        valueIn: t.StringC;
        fees: t.StringC;
    }>]>>;
}>]>;
export declare type XpubDetailsTxs = t.TypeOf<typeof XpubDetailsTxs>;
export declare const BlockInfoBitcoin: t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
            value: t.StringC;
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
        valueIn: t.StringC;
        fees: t.StringC;
    }>]>>;
}>]>;
export declare type BlockInfoBitcoin = t.TypeOf<typeof BlockInfoBitcoin>;
