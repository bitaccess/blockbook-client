import request from 'request-promise-native';
import * as t from 'io-ts';
import { XpubDetailsBasic, XpubDetailsTokens, XpubDetailsTokenBalances, XpubDetailsTxids, XpubDetailsTxs, BlockbookConfig, SystemInfo, GetAddressDetailsOptions, UtxoDetails, UtxoDetailsXpub, GetUtxosOptions, GetXpubDetailsOptions } from './types';
export declare abstract class BaseBlockbook<NormalizedTx, SpecificTx, BlockInfo, AddressDetailsBasic, AddressDetailsTokens, AddressDetailsTokenBalances, AddressDetailsTxids, AddressDetailsTxs> {
    private normalizedTxCodec;
    private specificTxCodec;
    private blockInfoCodec;
    private addressDetailsCodecs;
    nodes: string[];
    disableTypeValidation: boolean;
    constructor(config: BlockbookConfig, normalizedTxCodec: t.Type<NormalizedTx>, specificTxCodec: t.Type<SpecificTx>, blockInfoCodec: t.Type<BlockInfo>, addressDetailsCodecs: {
        basic: t.Type<AddressDetailsBasic>;
        tokens: t.Type<AddressDetailsTokens>;
        tokenBalances: t.Type<AddressDetailsTokenBalances>;
        txids: t.Type<AddressDetailsTxids>;
        txs: t.Type<AddressDetailsTxs>;
    });
    doAssertType<T>(codec: t.Type<T, any, unknown>, value: unknown, ...rest: any[]): T;
    doRequest(method: 'GET' | 'POST', path: string, params?: object, body?: object, options?: request.Options): Promise<any>;
    getStatus(): Promise<SystemInfo>;
    getBlockHash(blockNumber: number): Promise<string>;
    getTx(txid: string): Promise<NormalizedTx>;
    getTxSpecific(txid: string): Promise<SpecificTx>;
    getAddressDetails(address: string, options: GetAddressDetailsOptions & {
        details: 'basic';
    }): Promise<AddressDetailsBasic>;
    getAddressDetails(address: string, options: GetAddressDetailsOptions & {
        details: 'tokens';
    }): Promise<AddressDetailsTokens>;
    getAddressDetails(address: string, options: GetAddressDetailsOptions & {
        details: 'tokenBalances';
    }): Promise<AddressDetailsTokenBalances>;
    getAddressDetails(address: string, options?: (GetAddressDetailsOptions & {
        details: 'txids' | undefined;
    }) | Omit<GetAddressDetailsOptions, 'details'>): Promise<AddressDetailsTxids>;
    getAddressDetails(address: string, options: GetAddressDetailsOptions & {
        details: 'txs';
    }): Promise<AddressDetailsTxs>;
    getXpubDetails(xpub: string, options: GetXpubDetailsOptions & {
        details: 'basic';
    }): Promise<XpubDetailsBasic>;
    getXpubDetails(xpub: string, options: GetXpubDetailsOptions & {
        details: 'tokens';
    }): Promise<XpubDetailsTokens>;
    getXpubDetails(xpub: string, options: GetXpubDetailsOptions & {
        details: 'tokenBalances';
    }): Promise<XpubDetailsTokenBalances>;
    getXpubDetails(xpub: string, options?: (GetXpubDetailsOptions & {
        details: 'txids' | undefined;
    }) | Omit<GetXpubDetailsOptions, 'details'>): Promise<XpubDetailsTxids>;
    getXpubDetails(xpub: string, options: GetXpubDetailsOptions & {
        details: 'txs';
    }): Promise<XpubDetailsTxs>;
    getUtxosForAddress(address: string, options?: GetUtxosOptions): Promise<UtxoDetails[]>;
    getUtxosForXpub(xpub: string, options?: GetUtxosOptions): Promise<UtxoDetailsXpub[]>;
    getBlock(block: string | number): Promise<BlockInfo>;
    sendTx(txHex: string): Promise<string>;
}
