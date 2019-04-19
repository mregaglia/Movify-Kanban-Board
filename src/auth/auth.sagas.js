import { call, put, select, takeLatest } from "redux-saga/effects";
import { pathOr, prop } from "ramda";
import {
  LOGIN,
  CHECK_AUTH,
  loginSuccess,
  loginFail,
  authSuccess,
  authFail
} from "./auth.actions";
import { setBaseUrl, setToken } from "../utils/api";
import {
  setToken as setTokenStorage,
  setBaseUrl as setBaseUrlStorage,
  setRefreshToken,
  getRefreshToken
} from "../utils/storage";
import {
  getAccessToken,
  login as loginService,
  refreshToken as refreshTokenService
} from "./auth.service";

export function* login(action) {
  const code = prop("payload", action);
  try {
    const accessTokenResponse = yield call(getAccessToken, code);
    yield loginWithToken(accessTokenResponse);
  } catch (e) {
    yield put(loginFail());
  }
}

function* loginWithToken(tokenResponse) {
  if (prop("refresh_token", tokenResponse))
    yield call(setRefreshToken, prop("refresh_token", tokenResponse));

  if (prop("access_token", tokenResponse)) {
    const loginResponse = yield call(loginService, tokenResponse.access_token);

    const sessionToken = prop("BhRestToken", loginResponse);
    yield call(setToken, sessionToken);
    yield call(setTokenStorage, sessionToken);
    const baseUrl = prop("restUrl", loginResponse);
    yield call(setBaseUrl, baseUrl);
    yield call(setBaseUrlStorage, baseUrl);

    yield put(loginSuccess());
  } else {
    yield put(loginFail());
  }
}

const getAuthenticatedState = state =>
  pathOr(false, ["auth", "authenticated"], state);

export function* checkAuth() {
  try {
    const refresh = getRefreshToken();
    if (refresh) {
      const refreshTokenResponse = yield call(refreshTokenService, refresh);
      yield loginWithToken(refreshTokenResponse);
      const authenticated = yield select(getAuthenticatedState);
      yield put(authenticated ? authSuccess() : authFail());
    } else {
      yield put(authFail());
    }
  } catch (e) {
    yield put(authFail());
  }
}

export default function authSagas() {
  return [takeLatest(LOGIN, login), takeLatest(CHECK_AUTH, checkAuth)];
}
