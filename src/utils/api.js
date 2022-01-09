import { isEmpty, isNil, prop, propOr } from 'ramda'

import { login, refreshToken } from '../auth/auth.service'

import {
  getRefreshToken,
  setBaseUrl as setBaseUrlStorage,
  setRefreshToken,
  setToken as setTokenStorage,
} from './storage'

const DEFAULT_BASE_URL = process.env.REACT_APP_BASE_URL

const makeBaseUrl = () => {
  let cache = DEFAULT_BASE_URL
  return (baseUrl) => {
    if (!isNil(baseUrl) && !isEmpty(baseUrl)) cache = baseUrl
    return cache
  }
}

const getBaseUrl = makeBaseUrl()

export const setBaseUrl = (url) => getBaseUrl(url)

const makeToken = () => {
  const cache = { BhRestToken: '' }
  return (token) => {
    if (!isNil(token)) cache.BhRestToken = token
    return cache
  }
}

const getToken = makeToken()

export const setToken = (token) => getToken(token)

const getJson = (value) => {
  try {
    return value.json()
  } catch (_e) {
    return value
  }
}

const handleError = (res) => {
  const response = getJson(res)
  if (res.ok) {
    return response
  }
  throw new Error(propOr(response, 'error', response))
}

export const formatQueryParams = (params) => {
  const queryParams = []

  for (const [key, value] of Object.entries(params)) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      if (!isNil(value) && !isEmpty(value)) queryParams.push(`${key}=${value}`)
    }
  }
  return !isEmpty(queryParams) ? `?${queryParams.join('&')}` : ''
}

const req = (url, queryParams = {}, requestParams = {}) => {
  const params = formatQueryParams({ ...getToken(), ...queryParams })
  const requestUrl = getBaseUrl() + url + params

  return fetch(requestUrl, requestParams).then(handleError)
}

const request = (url, queryParams = {}, requestParams = {}) =>
  req(url, queryParams, requestParams).catch((error) => {
    const refresh = getRefreshToken()
    if (refresh)
      return refreshToken(refresh)
        .then((refreshTokenResponse) => {
          const accessToken = prop('access_token', refreshTokenResponse)
          const refreshTokenProp = prop('refresh_token', refreshTokenResponse)
          if (refreshTokenProp) setRefreshToken(refreshTokenProp)
          if (accessToken) return login(accessToken)
          throw new Error('Unauthorized')
        })
        .then((loginResponse) => {
          const sessionToken = prop('BhRestToken', loginResponse)
          const baseUrl = prop('restUrl', loginResponse)
          if (sessionToken && baseUrl) {
            setToken(sessionToken)
            setTokenStorage(sessionToken)
            setBaseUrl(baseUrl)
            setBaseUrlStorage(baseUrl)

            return req(url, queryParams, requestParams)
          }
          throw new Error('Unauthorized')
        })
    throw new Error(error)
  })

export const get = (url, queryParams = {}) =>
  request(url, queryParams, {
    method: 'GET',
  })

export const post = (url, body = {}, queryParams = {}) =>
  request(url, queryParams, {
    method: 'POST',
    body: JSON.stringify(body),
  })

export const put = (url, body = {}, queryParams = {}) =>
  request(url, queryParams, {
    method: 'PUT',
    body: JSON.stringify(body),
  })

export const del = (url, body = {}, queryParams = {}) =>
  request(url, queryParams, {
    method: 'DELETE',
    body: JSON.stringify(body),
  })
