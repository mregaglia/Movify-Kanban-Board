import { isEmpty, isNil, propOr } from "ramda";

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
  const response = getJson(res);
  if (res.ok) {
    return response;
  } else {
    throw new Error(propOr(response, "error", response));
  }
};

const getJson = value => {
  try {
    return value.json();
  } catch (_e) {
    return value;
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

export const post = (url, body = {}, queryParams: {}) => {
  const params = formatQueryParams({ ...getToken(), ...queryParams });
  return request(url + params, {
    method: "POST",
    body: JSON.stringify(body)
  });
};

const request = (url, requestParams = {}) =>
  fetch(getBaseUrl() + url, requestParams).then(handleError);
