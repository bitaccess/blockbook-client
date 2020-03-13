import request from 'request-promise-native';
import { isString } from '@faast/ts-common';
import qs from 'qs';
import { isObject } from 'util';
function tryParseJson(body) {
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
        const fullOptions = {
            method,
            body,
            json: true,
            ...options,
        };
        const queryString = params ? qs.stringify(params, { addQueryPrefix: true }) : '';
        const result = await request(`${origin}${path}${queryString}`, fullOptions);
        if (!fullOptions.json) {
            return tryParseJson(result);
        }
        return result;
    }
    catch (e) {
        const eString = e.toString();
        if (eString.includes('StatusCodeError')) {
            const error = e;
            const body = tryParseJson(error.response.body);
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