import request from 'request-promise-native'
import requestErrors from 'request-promise-native/errors'
import { isString } from '@faast/ts-common'
import qs from 'qs'
import { isObject, inspect } from 'util'
import { debounce } from 'debounce'

export const BLOCKBOOK_DEBOUNCE_INTERVAL = Number.parseInt(process.env.BLOCKBOOK_DEBOUNCE_INTERVAL || '200')

export async function jsonRequest(
  host: string,
  method: 'GET' | 'POST',
  path: string,
  params?: object,
  body?: object,
  options?: request.Options,
) {
  let origin = host
  if (!origin.startsWith('http')) {
    origin = `https://${host}`
  }
  try {
    return await request(`${origin}${path}${params ? qs.stringify(params, { addQueryPrefix: true }) : ''}`, {
      method,
      body,
      json: true,
      ...options,
    })
  } catch(e) {
    const eString = e.toString()
    if (eString.includes('StatusCodeError')) { // Can't use instanceof here because it's not portable
      const error = e as requestErrors.StatusCodeError
      const body = error.response.body
      if (isObject(body) && body.error) {
        if (isString(body.error)) {
          throw new Error(body.error)
        } else if (isObject(body.error) && isString(body.error.message)) {
          throw new Error(body.error.message)
        }
      }
    }
    throw e
  }
}

const blockbookBouncers: { [s: string]: typeof jsonRequest } = {}

export async function debouncedRequest(
  host: string,
  method: 'GET' | 'POST',
  path: string,
  params?: object,
  body?: object,
  options?: request.Options,
) {
  let bouncer = blockbookBouncers[host]
  if (!bouncer) {
    bouncer = debounce(jsonRequest, BLOCKBOOK_DEBOUNCE_INTERVAL, true)
    blockbookBouncers[host] = bouncer
  }
  return bouncer(host, method, path, params, body, options)
}

