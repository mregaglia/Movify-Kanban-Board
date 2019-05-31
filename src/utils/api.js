import { isEmpty, isNil, prop, propOr } from "ramda";
import {
  getRefreshToken,
  setRefreshToken,
  setToken as setTokenStorage,
  setBaseUrl as setBaseUrlStorage
} from "./storage";
import { refreshToken, login } from "../auth/auth.service";

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

export const get = (url, queryParams = {}) =>
  request(url, queryParams, {
    method: "GET"
  });

export const post = (url, body = {}, queryParams = {}) =>
  request(url, queryParams, {
    method: "POST",
    body: JSON.stringify(body)
  });

export const put = (url, body = {}, queryParams = {}) =>
  request(url, queryParams, {
    method: "PUT",
    body: JSON.stringify(body)
  });

export const del = (url, body = {}, queryParams = {}) =>
  request(url, queryParams, {
    method: "DELETE",
    body: JSON.stringify(body)
  });

const req = (url, queryParams = {}, requestParams = {}) => {
  const params = formatQueryParams({ ...getToken(), ...queryParams });
  const requestUrl = getBaseUrl() + url + params;

  return fetch(requestUrl, requestParams).then(handleError);
};

const request = (url, queryParams = {}, requestParams = {}) =>
  req(url, queryParams, requestParams).catch(error => {
    const refresh = getRefreshToken();
    if (refresh)
      return refreshToken(refresh)
        .then(refreshTokenResponse => {
          const accessToken = prop("access_token", refreshTokenResponse);
          const refreshToken = prop("refresh_token", refreshTokenResponse);
          if (refreshToken) setRefreshToken(refreshToken);
          if (accessToken) return login(accessToken);
          else throw new Error("Unauthorized");
        })
        .then(loginResponse => {
          const sessionToken = prop("BhRestToken", loginResponse);
          const baseUrl = prop("restUrl", loginResponse);
          if (sessionToken && baseUrl) {
            setToken(sessionToken);
            setTokenStorage(sessionToken);
            setBaseUrl(baseUrl);
            setBaseUrlStorage(baseUrl);

            return req(url, queryParams, requestParams);
          }
          throw new Error("Unauthorized");
        });
    else throw new Error(error);
  });
