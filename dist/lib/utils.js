import request from 'request-promise-native';
import { isString } from '@faast/ts-common';
import qs from 'qs';
import { isObject } from 'util';
function parseJson(body) {
    try {
        return JSON.parse(body);
    }
    catch (e) {
        return body;
    }
}
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
            const body = parseJson(error.response.body);
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
//# sourceMappingURL=utils.js.map