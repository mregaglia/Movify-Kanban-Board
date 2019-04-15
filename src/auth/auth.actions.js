export const LOGIN = "LOGIN";
export const SET_USER = "SET_USER";

export const login = values => ({ type: LOGIN, payload: values });
export const setUser = user => ({ type: SET_USER, payload: user });
