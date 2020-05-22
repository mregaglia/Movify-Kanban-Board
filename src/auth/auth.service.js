import { prop } from "ramda";
import { formatQueryParams, get } from "../utils/api";

const AUTH_URL = process.env.REACT_APP_AUTH_URL;

const getCurrentLocation = () => prop(0, window.location.href.split("?"));

export const authorize = (username, password) =>
  fetch(
    AUTH_URL +
    "authorize" +
    formatQueryParams({
      client_id: process.env.REACT_APP_BH_CLIENT_ID,
      response_type: "code",
      action: "Login",
      username: username,
      password: password,
      redirect_uri: getCurrentLocation()
    }),
    {
      method: "POST"
    }
  ).then(res => getCode(prop("url", res)));

const hasCode = url => (url || "").split("code=").length > 1;

export const getCode = url =>
  hasCode(url) ? url.split("code=")[1].split("&")[0] : "";

export const getAccessToken = code =>
  fetch(
    AUTH_URL +
    "token" +
    formatQueryParams({
      grant_type: "authorization_code",
      code,
      client_id: process.env.REACT_APP_BH_CLIENT_ID,
      client_secret: process.env.REACT_APP_BH_CLIENT_SECRET,
      redirect_uri: getCurrentLocation()
    }),
    {
      method: "POST"
    }
  ).then(res => res.json());

export const login = accessToken =>
  fetch(
    process.env.REACT_APP_BASE_URL +
    "login" +
    formatQueryParams({
      version: "*",
      access_token: accessToken
    }),
    {
      method: "GET"
    }
  ).then(res => res.json());

export const ping = () => get("ping");

export const refreshToken = refreshToken =>
  fetch(
    AUTH_URL +
    "token" +
    formatQueryParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: process.env.REACT_APP_BH_CLIENT_ID,
      client_secret: process.env.REACT_APP_BH_CLIENT_SECRET
    }),
    { method: "POST" }
  ).then(res => res.json());
