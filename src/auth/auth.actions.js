export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const CHECK_AUTH = "CHECK_AUTH";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const REFRESH_TOKEN = "REFRESH_TOKEN"

export const login = code => ({ type: LOGIN, payload: code });
export const loginSuccess = () => ({ type: LOGIN_SUCCESS });
export const loginFail = () => ({ type: LOGIN_FAIL });
export const checkAuth = () => ({ type: CHECK_AUTH });
export const authSuccess = () => ({ type: AUTH_SUCCESS });
export const authFail = () => ({ type: AUTH_FAIL });
export const refreshToken = () => ({ type: REFRESH_TOKEN });
