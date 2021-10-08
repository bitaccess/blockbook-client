import axios, { AxiosRequestConfig, AxiosError } from 'axios'
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
  options?: Partial<AxiosRequestConfig>,
) {
  if (!host.startsWith('http')) {
    host = `https://${host}`
  }
  const queryString = params ? qs.stringify(params, { addQueryPrefix: true }) : ''
  const uri = `${host}${path}${queryString}`
  const fullOptions: AxiosRequestConfig = {
    url: uri,
    method,
    data: body,
    responseType: 'json',
    ...options,
    headers: {
      'user-agent': USER_AGENT,
    }
  }
  try {
    let { data } = await axios.request(fullOptions)
    if (data?.error?.message) {
      throw new Error(data.error.message)
    }
    return data
  } catch(e) {
    if (axios.isAxiosError(e)) {
      const body = e.response?.data as any
      if (isString(body?.error)) {
        throw new Error(body.error)
      } else if (isString(body?.error?.message)) {
        throw new Error(body.error.message)
      }
      if (e.code === '522') {
        e.message = `StatusCodeError: 522 Origin Connection Time-out ${method} ${uri}`
      } else if (e.code === '504') {
        e.message = `StatusCodeError: 504 Gateway Time-out ${method} ${uri}`
      }
    }
    throw e
  }
}
