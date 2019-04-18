import { put, takeLatest } from "redux-saga/effects";
import { prop } from "ramda";
import { LOGIN, CHECK_AUTH, loginSuccess, loginFail } from "./auth.actions";
import { setBaseUrl, setToken } from "../utils/api";
import {
  setToken as setTokenStorage,
  setBaseUrl as setBaseUrlStorage
} from "../utils/storage";
import { getAccessToken, login as loginService, ping } from "./auth.service";

export function* login(action) {
  const code = prop("payload", action);

  try {
    const accessTokenResponse = yield getAccessToken(code);

    if (prop("access_token", accessTokenResponse)) {
      const loginResponse = yield loginService(
        accessTokenResponse.access_token
      );

      const sessionToken = prop("BhRestToken", loginResponse);
      yield setToken(sessionToken);
      yield setTokenStorage(sessionToken);
      const baseUrl = prop("restUrl", loginResponse);
      yield setBaseUrl(baseUrl);
      yield setBaseUrlStorage(baseUrl);

      yield put(loginSuccess());
    } else {
      yield put(loginFail());
    }
  } catch (e) {
    yield put(loginFail());
  }
}

export function* checkAuth() {
  try {
    yield ping();
    yield put(loginSuccess());
  } catch (e) {
    yield put(loginFail());
  }
}

export default function authSagas() {
  return [takeLatest(LOGIN, login), takeLatest(CHECK_AUTH, checkAuth)];
}
