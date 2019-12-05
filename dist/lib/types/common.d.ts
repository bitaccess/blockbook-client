import * as t from 'io-ts';
export declare const Paginated: t.TypeC<{
    page: t.NumberC;
    totalPages: t.NumberC;
    itemsOnPage: t.NumberC;
}>;
export declare type Paginated = t.TypeOf<typeof Paginated>;
export declare const BlockbookConfig: t.IntersectionC<[t.TypeC<{
    nodes: t.ArrayC<t.StringC>;
}>, t.PartialC<{
    disableTypeValidation: t.BooleanC;
}>]>;
export declare type BlockbookConfig = t.TypeOf<typeof BlockbookConfig>;
export declare const BlockbookInfo: t.TypeC<{
    coin: t.StringC;
    host: t.StringC;
    version: t.StringC;
    gitCommit: t.StringC;
    buildTime: t.StringC;
    syncMode: t.BooleanC;
    initialSync: t.BooleanC;
    inSync: t.BooleanC;
    bestHeight: t.NumberC;
    lastBlockTime: t.StringC;
    inSyncMempool: t.BooleanC;
    lastMempoolTime: t.StringC;
    mempoolSize: t.NumberC;
    decimals: t.NumberC;
    dbSize: t.NumberC;
    about: t.StringC;
}>;
export declare type BlockbookInfo = t.TypeOf<typeof BlockbookInfo>;
export declare const BackendInfo: t.IntersectionC<[t.TypeC<{
    chain: t.StringC;
    blocks: t.NumberC;
    bestBlockHash: t.StringC;
    difficulty: t.StringC;
    version: t.StringC;
}>, t.PartialC<{
    protocolVersion: t.StringC;
    subversion: t.StringC;
    sizeOnDisk: t.NumberC;
    headers: t.NumberC;
    timeOffset: t.NumberC;
    warnings: t.StringC;
}>]>;
export declare type BackendInfo = t.TypeOf<typeof BackendInfo>;
export declare const SystemInfo: t.TypeC<{
    blockbook: t.TypeC<{
        coin: t.StringC;
        host: t.StringC;
        version: t.StringC;
        gitCommit: t.StringC;
        buildTime: t.StringC;
        syncMode: t.BooleanC;
        initialSync: t.BooleanC;
        inSync: t.BooleanC;
        bestHeight: t.NumberC;
        lastBlockTime: t.StringC;
        inSyncMempool: t.BooleanC;
        lastMempoolTime: t.StringC;
        mempoolSize: t.NumberC;
        decimals: t.NumberC;
        dbSize: t.NumberC;
        about: t.StringC;
    }>;
    backend: t.IntersectionC<[t.TypeC<{
        chain: t.StringC;
        blocks: t.NumberC;
        bestBlockHash: t.StringC;
        difficulty: t.StringC;
        version: t.StringC;
    }>, t.PartialC<{
        protocolVersion: t.StringC;
        subversion: t.StringC;
        sizeOnDisk: t.NumberC;
        headers: t.NumberC;
        timeOffset: t.NumberC;
        warnings: t.StringC;
    }>]>;
}>;
export declare type SystemInfo = t.TypeOf<typeof SystemInfo>;
export declare const BlockHashResponse: t.TypeC<{
    blockHash: t.StringC;
}>;
export declare type BlockHashResponse = t.TypeOf<typeof BlockHashResponse>;
export declare const NormalizedTxCommonVin: t.IntersectionC<[t.TypeC<{
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
}>]>;
export declare const NormalizedTxCommonVout: t.IntersectionC<[t.TypeC<{
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
}>]>;
export declare const EthereumSpecific: t.TypeC<{
    status: t.NumberC;
    nonce: t.NumberC;
    gasLimit: t.NumberC;
    gasUsed: t.NumberC;
    gasPrice: t.StringC;
}>;
export declare type EthereumSpecific = t.TypeOf<typeof EthereumSpecific>;
export declare const TokenTransfer: t.TypeC<{
    type: t.StringC;
    from: t.StringC;
    to: t.StringC;
    token: t.StringC;
    name: t.StringC;
    symbol: t.StringC;
    decimals: t.NumberC;
    value: t.StringC;
}>;
export declare type TokenTransfer = t.TypeOf<typeof TokenTransfer>;
export declare const NormalizedTxCommon: t.IntersectionC<[t.TypeC<{
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
}>]>;
export declare type NormalizedTxCommon = t.TypeOf<typeof NormalizedTxCommon>;
export declare const GetAddressDetailsLevels: t.KeyofC<{
    basic: null;
    tokens: null;
    tokenBalances: null;
    txids: null;
    txs: null;
}>;
export declare type GetAddressDetailsLevels = t.TypeOf<typeof GetAddressDetailsLevels>;
export declare const GetAddressDetailsOptions: t.PartialC<{
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
}>;
export declare type GetAddressDetailsOptions = t.TypeOf<typeof GetAddressDetailsOptions>;
export declare const TokenDetailsTypeERC20: t.LiteralC<"ERC20">;
export declare type TokenDetailsTypeERC20 = t.TypeOf<typeof TokenDetailsTypeERC20>;
export declare const TokenDetailsTypeXpubAddress: t.LiteralC<"XPUBAddress">;
export declare type TokenDetailsTypeXpubAddress = t.TypeOf<typeof TokenDetailsTypeXpubAddress>;
export declare const TokenDetailsType: t.UnionC<[t.LiteralC<"ERC20">, t.LiteralC<"XPUBAddress">]>;
export declare type TokenDetailsType = t.TypeOf<typeof TokenDetailsType>;
export declare const TokenDetailsCommon: t.IntersectionC<[t.TypeC<{
    type: t.UnionC<[t.LiteralC<"ERC20">, t.LiteralC<"XPUBAddress">]>;
    name: t.StringC;
    transfers: t.NumberC;
}>, t.PartialC<{
    path: t.StringC;
    contract: t.StringC;
    symbol: t.StringC;
    decimals: t.NumberC;
    balance: t.StringC;
    totalReceived: t.StringC;
    totalSent: t.StringC;
}>]>;
export declare type TokenDetailsCommon = t.TypeOf<typeof TokenDetailsCommon>;
export declare const TokenDetailsCommonBalance: t.IntersectionC<[t.IntersectionC<[t.TypeC<{
    type: t.UnionC<[t.LiteralC<"ERC20">, t.LiteralC<"XPUBAddress">]>;
    name: t.StringC;
    transfers: t.NumberC;
}>, t.PartialC<{
    path: t.StringC;
    contract: t.StringC;
    symbol: t.StringC;
    decimals: t.NumberC;
    balance: t.StringC;
    totalReceived: t.StringC;
    totalSent: t.StringC;
}>]>, t.TypeC<{
    balance: t.StringC;
}>]>;
export declare type TokenDetailsCommonBalance = t.TypeOf<typeof TokenDetailsCommonBalance>;
export declare const AddressDetailsCommonBasic: t.IntersectionC<[t.TypeC<{
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
}>]>;
export declare type AddressDetailsCommonBasic = t.TypeOf<typeof AddressDetailsCommonBasic>;
export declare const AddressDetailsCommonTokens: t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
    tokens: t.ArrayC<t.IntersectionC<[t.TypeC<{
        type: t.UnionC<[t.LiteralC<"ERC20">, t.LiteralC<"XPUBAddress">]>;
        name: t.StringC;
        transfers: t.NumberC;
    }>, t.PartialC<{
        path: t.StringC;
        contract: t.StringC;
        symbol: t.StringC;
        decimals: t.NumberC;
        balance: t.StringC;
        totalReceived: t.StringC;
        totalSent: t.StringC;
    }>]>>;
}>]>;
export declare type AddressDetailsCommonTokens = t.TypeOf<typeof AddressDetailsCommonTokens>;
export declare const AddressDetailsCommonTokenBalances: t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
}>]>, t.PartialC<{
    tokens: t.ArrayC<t.IntersectionC<[t.IntersectionC<[t.TypeC<{
        type: t.UnionC<[t.LiteralC<"ERC20">, t.LiteralC<"XPUBAddress">]>;
        name: t.StringC;
        transfers: t.NumberC;
    }>, t.PartialC<{
        path: t.StringC;
        contract: t.StringC;
        symbol: t.StringC;
        decimals: t.NumberC;
        balance: t.StringC;
        totalReceived: t.StringC;
        totalSent: t.StringC;
    }>]>, t.TypeC<{
        balance: t.StringC;
    }>]>>;
}>]>;
export declare type AddressDetailsCommonTokenBalances = t.TypeOf<typeof AddressDetailsCommonTokenBalances>;
export declare const AddressDetailsCommonTxids: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
}>]>, t.PartialC<{
    tokens: t.ArrayC<t.IntersectionC<[t.IntersectionC<[t.TypeC<{
        type: t.UnionC<[t.LiteralC<"ERC20">, t.LiteralC<"XPUBAddress">]>;
        name: t.StringC;
        transfers: t.NumberC;
    }>, t.PartialC<{
        path: t.StringC;
        contract: t.StringC;
        symbol: t.StringC;
        decimals: t.NumberC;
        balance: t.StringC;
        totalReceived: t.StringC;
        totalSent: t.StringC;
    }>]>, t.TypeC<{
        balance: t.StringC;
    }>]>>;
}>]>, t.PartialC<{
    txids: t.ArrayC<t.StringC>;
}>]>;
export declare type AddressDetailsCommonTxids = t.TypeOf<typeof AddressDetailsCommonTxids>;
export declare const AddressDetailsCommonTxs: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
}>]>, t.PartialC<{
    tokens: t.ArrayC<t.IntersectionC<[t.IntersectionC<[t.TypeC<{
        type: t.UnionC<[t.LiteralC<"ERC20">, t.LiteralC<"XPUBAddress">]>;
        name: t.StringC;
        transfers: t.NumberC;
    }>, t.PartialC<{
        path: t.StringC;
        contract: t.StringC;
        symbol: t.StringC;
        decimals: t.NumberC;
        balance: t.StringC;
        totalReceived: t.StringC;
        totalSent: t.StringC;
    }>]>, t.TypeC<{
        balance: t.StringC;
    }>]>>;
}>]>, t.PartialC<{
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
}>]>;
export declare type AddressDetailsCommonTxs = t.TypeOf<typeof AddressDetailsCommonTxs>;
export declare const GetUtxosOptions: t.PartialC<{
    confirmed: t.BooleanC;
}>;
export declare type GetUtxosOptions = t.TypeOf<typeof GetAddressDetailsOptions>;
export declare const UtxoDetails: t.IntersectionC<[t.TypeC<{
    txid: t.StringC;
    vout: t.NumberC;
    value: t.StringC;
    confirmations: t.NumberC;
}>, t.PartialC<{
    height: t.NumberC;
    coinbase: t.BooleanC;
    lockTime: t.NumberC;
}>]>;
export declare type UtxoDetails = t.TypeOf<typeof UtxoDetails>;
export declare const UtxoDetailsXpub: t.IntersectionC<[t.IntersectionC<[t.TypeC<{
    txid: t.StringC;
    vout: t.NumberC;
    value: t.StringC;
    confirmations: t.NumberC;
}>, t.PartialC<{
    height: t.NumberC;
    coinbase: t.BooleanC;
    lockTime: t.NumberC;
}>]>, t.PartialC<{
    address: t.StringC;
    path: t.StringC;
}>]>;
export declare type UtxoDetailsXpub = t.TypeOf<typeof UtxoDetailsXpub>;
export declare const BlockInfoCommon: t.IntersectionC<[t.TypeC<{
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
}>]>;
export declare type BlockInfoCommon = t.TypeOf<typeof BlockInfoCommon>;
export declare const SendTxSuccess: t.TypeC<{
    result: t.StringC;
}>;
export declare type SendTxSuccess = t.TypeOf<typeof SendTxSuccess>;
export declare const SendTxError: t.TypeC<{
    error: t.TypeC<{
        message: t.StringC;
    }>;
}>;
export declare type SendTxError = t.TypeOf<typeof SendTxError>;
