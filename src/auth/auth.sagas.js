import { call, put, select, takeLatest } from "redux-saga/effects";
import { pathOr, prop } from "ramda";
import {
  AUTHORIZE,
  LOGIN,
  CHECK_AUTH,
  REFRESH_TOKEN,
  login as loginAction,
  loginSuccess,
  loginFail,
  authSuccess,
  authFail,
  refreshToken as refreshTokenAction
} from "./auth.actions";
import { setBaseUrl, setToken } from "../utils/api";
import {
  setToken as setTokenStorage,
  setBaseUrl as setBaseUrlStorage,
  setRefreshToken,
  getRefreshToken
} from "../utils/storage";
import {
  authorize as authorizeService,
  getAccessToken,
  login as loginService,
  refreshToken as refreshTokenService,
  ping
} from "./auth.service";
import {
  getReportingAccess
} from "./user.sagas"

export function* authorize(action) {
  const { username, password } = prop("payload", action);
  try {
    const authCode = yield call(authorizeService, username, password);
    if (authCode !== undefined) {
      yield login(loginAction(authCode))
    } else {
      yield put(loginFail());
    }
  } catch (e) {
    yield put(loginFail());
  }
}

export function* login(action) {
  const code = prop("payload", action);
  try {
    const accessTokenResponse = yield call(getAccessToken, code);
    yield call(loginWithToken, accessTokenResponse);
  } catch (e) {
    yield put(loginFail());
  }
}

export function* loginWithToken(tokenResponse) {
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
    
    yield call(getReportingAccess);
    
    yield put(loginSuccess());
  } else {
    yield put(loginFail());
  }
}



export const getAuthenticatedState = state =>
  pathOr(false, ["auth", "authenticated"], state);

export function* checkAuth() {
  try {
    yield call(ping);
    yield call(getReportingAccess);
    yield put(authSuccess());
  } catch (e) {
    yield put(refreshTokenAction());
  }
}

export function* refreshToken() {
  try {
    const refresh = yield call(getRefreshToken);
    if (refresh) {
      const refreshTokenResponse = yield call(refreshTokenService, refresh);
      yield call(loginWithToken, refreshTokenResponse);
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
  return [
    takeLatest(AUTHORIZE, authorize),
    takeLatest(LOGIN, login),
    takeLatest(CHECK_AUTH, checkAuth),
    takeLatest(REFRESH_TOKEN, refreshToken)
  ];
}
