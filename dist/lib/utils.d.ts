import request from 'request-promise-native';
export declare const BLOCKBOOK_DEBOUNCE_INTERVAL: number;
export declare function jsonRequest(host: string, method: 'GET' | 'POST', path: string, params?: object, body?: object, options?: request.Options): Promise<any>;
export declare function debouncedRequest(host: string, method: 'GET' | 'POST', path: string, params?: object, body?: object, options?: request.Options): Promise<any>;
