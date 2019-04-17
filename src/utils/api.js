import { isEmpty, isNil } from "ramda";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json"
};

const DEFAULT_BASE_URL = process.env.REACT_APP_BASE_URL;

const makeBaseUrl = () => {
  var cache = DEFAULT_BASE_URL;
  return baseUrl => {
    if (!isNil(baseUrl) && !isEmpty(baseUrl)) cache = baseUrl;
    return cache;
  };
};

const getBaseUrl = makeBaseUrl();

export const setBaseUrl = url => getBaseUrl(url);

const makeHeaders = () => {
  var cache = DEFAULT_HEADERS;
  return (headers = {}) => {
    cache = { ...cache, ...headers };
    return cache;
  };
};

const getHeaders = makeHeaders();

export const setToken = token => getHeaders({ BhRestToken: token });

const handleError = res => {
  try {
    return res.json();
  } catch (error) {
    return res;
  }
};

export const formatQueryParams = params => {
  const queryParams = [];
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key];
      if (!isNil(value) && !isEmpty(value)) queryParams.push(`${key}=${value}`);
    }
  }
  return !isEmpty(queryParams) ? `?${queryParams.join("&")}` : "";
};

export const get = (url, params = {}, headers = {}) => {
  const queryParams = formatQueryParams(params);
  return request(url + queryParams, {
    method: "GET",
    headers: { ...getHeaders(), ...headers }
  });
};

export const post = (url, body = {}, headers = {}) =>
  request(url, {
    method: "POST",
    headers: { ...getHeaders(), ...headers },
    body: JSON.stringify(body)
  });

const request = (url, requestParams = {}) =>
  fetch(getBaseUrl() + url, requestParams).then(handleError);
