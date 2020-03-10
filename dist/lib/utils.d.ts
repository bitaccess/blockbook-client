import request from 'request-promise-native';
export declare function jsonRequest(host: string, method: 'GET' | 'POST', path: string, params?: object, body?: object, options?: Partial<request.Options>): Promise<any>;
