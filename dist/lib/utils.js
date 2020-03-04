import request from 'request-promise-native';
import { isString } from '@faast/ts-common';
import qs from 'qs';
import { isObject } from 'util';
import { debounce } from 'debounce';
export const BLOCKBOOK_DEBOUNCE_INTERVAL = Number.parseInt(process.env.BLOCKBOOK_DEBOUNCE_INTERVAL || '200');
export async function jsonRequest(host, method, path, params, body, options) {
    let origin = host;
    if (!origin.startsWith('http')) {
        origin = `https://${host}`;
    }
    try {
        return await request(`${origin}${path}${params ? qs.stringify(params, { addQueryPrefix: true }) : ''}`, {
            method,
            body,
            json: true,
            ...options,
        });
    }
    catch (e) {
        const eString = e.toString();
        if (eString.includes('StatusCodeError')) {
            const error = e;
            const body = error.response.body;
            if (isObject(body) && body.error) {
                if (isString(body.error)) {
                    throw new Error(body.error);
                }
                else if (isObject(body.error) && isString(body.error.message)) {
                    throw new Error(body.error.message);
                }
            }
        }
        throw e;
    }
}
const blockbookBouncers = {};
export async function debouncedRequest(host, method, path, params, body, options) {
    let bouncer = blockbookBouncers[host];
    if (!bouncer) {
        bouncer = debounce(jsonRequest, BLOCKBOOK_DEBOUNCE_INTERVAL, true);
        blockbookBouncers[host] = bouncer;
    }
    return bouncer(host, method, path, params, body, options);
}
//# sourceMappingURL=utils.js.map