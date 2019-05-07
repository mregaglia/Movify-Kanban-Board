import {
  LOGIN,
  login,
  loginSuccess,
  LOGIN_SUCCESS,
  loginFail,
  LOGIN_FAIL,
  CHECK_AUTH,
  checkAuth,
  authSuccess,
  AUTH_SUCCESS,
  AUTH_FAIL,
  authFail,
  refreshToken,
  REFRESH_TOKEN
} from "../auth.actions";

describe("login action", () => {
  it("should return LOGIN action", () => {
    const code = "code";
    expect(login(code)).toEqual({
      type: LOGIN,
      payload: code
    });
  });
});

describe("loginSuccess action", () => {
  it("should return LOGIN_SUCCESS action", () => {
    expect(loginSuccess()).toEqual({
      type: LOGIN_SUCCESS
    });
  });
});

describe("loginFail action", () => {
  it("should return LOGIN_FAIL action", () => {
    expect(loginFail()).toEqual({
      type: LOGIN_FAIL
    });
  });
});

describe("checkAuth action", () => {
  it("should return CHECK_AUTH action", () => {
    expect(checkAuth()).toEqual({
      type: CHECK_AUTH
    });
  });
});

describe("authSuccess action", () => {
  it("should return AUTH_SUCCESS action", () => {
    expect(authSuccess()).toEqual({
      type: AUTH_SUCCESS
    });
  });
});

describe("authFail action", () => {
  it("should return AUTH_FAIL action", () => {
    expect(authFail()).toEqual({
      type: AUTH_FAIL
    });
  });
});

describe("refreshToken action", () => {
  it("should return REFRESH_TOKEN action", () => {
    expect(refreshToken()).toEqual({
      type: REFRESH_TOKEN
    });
  });
});
