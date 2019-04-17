import { formatQueryParams, get } from "../utils/api";

const AUTH_URL = process.env.REACT_APP_AUTH_URL;

export const getAuthorizeUrl = () =>
  AUTH_URL +
  "authorize" +
  formatQueryParams({
    client_id: process.env.REACT_APP_BH_CLIENT_ID,
    response_type: "code",
    redirect_uri: "http://localhost:4200"
  });

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
        redirect_uri: "http://localhost:4200"
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
