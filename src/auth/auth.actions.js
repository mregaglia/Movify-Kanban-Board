export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const CHECK_AUTH = "CHECK_AUTH";

export const login = code => ({ type: LOGIN, payload: code });
export const loginSuccess = () => ({ type: LOGIN_SUCCESS });
export const loginFail = () => ({ type: LOGIN_FAIL });
export const checkAuth = () => ({ type: CHECK_AUTH });
