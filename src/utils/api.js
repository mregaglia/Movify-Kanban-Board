import { isEmpty, isNil } from "ramda";

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

const makeToken = () => {
  var cache = { BhRestToken: "" };
  return token => {
    if (!isNil(token)) cache.BhRestToken = token;
    return cache;
  };
};

const getToken = makeToken();

export const setToken = token => getToken(token);

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

export const get = (url, params = {}) => {
  params = { ...getToken(), ...params };
  const queryParams = formatQueryParams(params);
  return request(url + queryParams, {
    method: "GET"
  });
};

export const post = (url, body = {}) => {
  const queryParams = formatQueryParams(getToken());
  request(url + queryParams, {
    method: "POST",
    body: JSON.stringify(body)
  });
};

const request = (url, requestParams = {}) =>
  fetch(getBaseUrl() + url, requestParams).then(handleError);
