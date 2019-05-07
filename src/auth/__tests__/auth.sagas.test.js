import {
  login,
  loginWithToken,
  checkAuth,
  refreshToken,
  getAuthenticatedState
} from "../auth.sagas";
import {
  LOGIN,
  loginFail,
  loginSuccess,
  authSuccess,
  refreshToken as refreshTokenAction,
  authFail
} from "../auth.actions";
import { call, put, select } from "redux-saga/effects";
import {
  getAccessToken,
  login as loginService,
  ping,
  refreshToken as refreshTokenService
} from "../auth.service";
import {
  setRefreshToken,
  setToken as setTokenStorage,
  setBaseUrl as setBaseUrlStorage,
  getRefreshToken
} from "../../utils/storage";
import { setBaseUrl, setToken } from "../../utils/api";

describe("login saga", () => {
  describe("login successfully", () => {
    const code = "code";
    const action = { type: LOGIN, payload: code };
    const response = { refresh_token: "refresh_token" };
    const generator = login(action);

    it("should call getAccessToken", () => {
      expect(generator.next().value).toEqual(call(getAccessToken, code));
    });
    it("should call saga loginWithToken", () => {
      expect(generator.next(response).value).toEqual(
        call(loginWithToken, response)
      );
    });
    it("should be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });

  describe("login with error", () => {
    const code = "code";
    const action = { type: LOGIN, payload: code };
    const generator = login(action);

    it("should call getAccessToken", () => {
      expect(generator.next().value).toEqual(call(getAccessToken, code));
    });
    it("should put loginFail", () => {
      expect(generator.throw().value).toEqual(put(loginFail()));
    });
    it("should be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });
});

describe("loginWithToken saga", () => {
  describe("login with no refresh token and no access token", () => {
    const tokenResponse = {};
    const generator = loginWithToken(tokenResponse);

    it("should put loginFail", () => {
      expect(generator.next().value).toEqual(put(loginFail()));
    });
    it("should be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });
  describe("login with success", () => {
    const refresh_token = "refresh_token";
    const access_token = "access_token";
    const tokenResponse = {
      refresh_token,
      access_token
    };
    const token = "token";
    const restUrl = "restUrl";
    const loginResponse = { BhRestToken: token, restUrl };
    const generator = loginWithToken(tokenResponse);

    it("should call setRefreshToken", () => {
      expect(generator.next().value).toEqual(
        call(setRefreshToken, refresh_token)
      );
    });
    it("should call loginService", () => {
      expect(generator.next().value).toEqual(call(loginService, access_token));
    });
    it("should call setToken", () => {
      expect(generator.next(loginResponse).value).toEqual(
        call(setToken, token)
      );
    });
    it("should call setTokenStorage", () => {
      expect(generator.next().value).toEqual(call(setTokenStorage, token));
    });
    it("should call setBaseUrl", () => {
      expect(generator.next().value).toEqual(call(setBaseUrl, restUrl));
    });
    it("should call setBaseUrlStorage", () => {
      expect(generator.next().value).toEqual(call(setBaseUrlStorage, restUrl));
    });
    it("should put loginSuccess", () => {
      expect(generator.next().value).toEqual(put(loginSuccess()));
    });
    it("should be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });
});

describe("checkAuth saga", () => {
  describe("checkAuth with success", () => {
    const generator = checkAuth();

    it("should call ping", () => {
      expect(generator.next().value).toEqual(call(ping));
    });
    it("should put authSuccess", () => {
      expect(generator.next().value).toEqual(put(authSuccess()));
    });
    it("should be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });
  describe("checkAuth with error", () => {
    const generator = checkAuth();

    it("should call ping", () => {
      expect(generator.next().value).toEqual(call(ping));
    });
    it("should put refreshToken", () => {
      expect(generator.throw().value).toEqual(put(refreshTokenAction()));
    });
    it("should be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });
});

describe("refreshToken saga", () => {
  describe("refreshToken with success", () => {
    const refresh_token = "refreshToken";
    const refreshTokenResponse = {};
    const authenticated = true;
    const generator = refreshToken();

    it("should call getRefreshToken", () => {
      expect(generator.next().value).toEqual(call(getRefreshToken));
    });
    it("should call refreshToken service", () => {
      expect(generator.next(refresh_token).value).toEqual(
        call(refreshTokenService, refresh_token)
      );
    });
    it("should call loginWithToken", () => {
      expect(generator.next(refreshTokenResponse).value).toEqual(
        call(loginWithToken, refreshTokenResponse)
      );
    });
    it("should get authenticated state", () => {
      expect(generator.next().value).toEqual(select(getAuthenticatedState));
    });
    it("should put authSuccess", () => {
      expect(generator.next(authenticated).value).toEqual(put(authSuccess()));
    });
    it("should be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });
  describe("refreshToken with no refresh token stored", () => {
    const generator = refreshToken();

    it("should call getRefreshToken", () => {
      expect(generator.next().value).toEqual(call(getRefreshToken));
    });
    it("should put authFail", () => {
      expect(generator.next().value).toEqual(put(authFail()));
    });
    it("should be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });
  describe("refreshToken with failing authentication", () => {
    const refresh_token = "refreshToken";
    const refreshTokenResponse = {};
    const authenticated = false;
    const generator = refreshToken();

    it("should call getRefreshToken", () => {
      expect(generator.next().value).toEqual(call(getRefreshToken));
    });
    it("should call refreshToken service", () => {
      expect(generator.next(refresh_token).value).toEqual(
        call(refreshTokenService, refresh_token)
      );
    });
    it("should call loginWithToken", () => {
      expect(generator.next(refreshTokenResponse).value).toEqual(
        call(loginWithToken, refreshTokenResponse)
      );
    });
    it("should get authenticated state", () => {
      expect(generator.next().value).toEqual(select(getAuthenticatedState));
    });
    it("should put authFail", () => {
      expect(generator.next(authenticated).value).toEqual(put(authFail()));
    });
    it("should be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });
  describe("refreshToken with error", () => {
    const refresh_token = "refresh";
    const generator = refreshToken();

    it("should call getRefreshToken", () => {
      expect(generator.next().value).toEqual(call(getRefreshToken));
    });
    it("should call refreshToken service", () => {
      expect(generator.next(refresh_token).value).toEqual(
        call(refreshTokenService, refresh_token)
      );
    });
    it("should put authFail", () => {
      expect(generator.throw().value).toEqual(put(authFail()));
    });
    it("should be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });
});
