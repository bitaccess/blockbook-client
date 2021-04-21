import request from 'request-promise-native'
import requestErrors from 'request-promise-native/errors'
import { isString } from '@faast/ts-common'
import qs from 'qs'

export const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'

function tryParseJson(body: any): any {
  try {
    return JSON.parse(body)
  } catch (e) {
    return body
  }
}

export async function jsonRequest(
  host: string,
  method: 'GET' | 'POST',
  path: string,
  params?: object,
  body?: object,
  options?: Partial<request.Options>,
) {
  if (!host.startsWith('http')) {
    host = `https://${host}`
  }
  const fullOptions: request.RequestPromiseOptions = {
    method,
    body,
    json: true,
    ...options,
    headers: {
      'user-agent': USER_AGENT,
    }
  }
  const queryString = params ? qs.stringify(params, { addQueryPrefix: true }) : ''
  const uri = `${host}${path}${queryString}`
  try {
    let result = await request(uri, fullOptions)
    if (!fullOptions.json) {
      // Sometimes result is json format even when body wasn't
      result = tryParseJson(result)
    }
    if (result?.error?.message) {
      throw new Error(result.error.message)
    }
    return result
  } catch(e) {
    const eString = e.toString()
    if (eString.includes('StatusCodeError')) { // Can't use instanceof here because it's not portable
      const error = e as requestErrors.StatusCodeError
      const body = tryParseJson(error.response.body)
      if (isString(body?.error)) {
        throw new Error(body.error)
      } else if (isString(body?.error?.message)) {
        throw new Error(body.error.message)
      }
      if (error.statusCode === 522) {
        error.message = `StatusCodeError: 522 Origin Connection Time-out ${method} ${uri}`
      } else if (error.statusCode === 504) {
        error.message = `StatusCodeError: 504 Gateway Time-out ${method} ${uri}`
      }
    }
    throw e
  }
}
