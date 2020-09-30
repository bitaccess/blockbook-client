import request from 'request-promise-native'
import requestErrors from 'request-promise-native/errors'
import { isString } from '@faast/ts-common'
import qs from 'qs'
import { isObject } from 'util'

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
  let origin = host
  if (!origin.startsWith('http')) {
    origin = `https://${host}`
  }
  const fullOptions: request.RequestPromiseOptions = {
    method,
    body,
    json: true,
    timeout: 5000, // fail fast
    ...options,
  }
  const queryString = params ? qs.stringify(params, { addQueryPrefix: true }) : ''
  const uri = `${origin}${path}${queryString}`
  try {
    const result = await request(uri, fullOptions)
    if (!fullOptions.json) {
      // Sometimes result is json format even when body wasn't
      return tryParseJson(result)
    }
    return result
  } catch(e) {
    const eString = e.toString()
    if (eString.includes('StatusCodeError')) { // Can't use instanceof here because it's not portable
      const error = e as requestErrors.StatusCodeError
      const body = tryParseJson(error.response.body)
      if (isObject(body) && body.error) {
        if (isString(body.error)) {
          throw new Error(body.error)
        } else if (isObject(body.error) && isString(body.error.message)) {
          throw new Error(body.error.message)
        }
      } else if (error.statusCode === 522) {
        error.message = `StatusCodeError: 522 Origin Connection Time-out ${method} ${uri}`
      } else if (error.statusCode === 504) {
        error.message = `StatusCodeError: 504 Gateway Time-out ${method} ${uri}`
      }
    }
    throw e
  }
}
