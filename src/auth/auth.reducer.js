import { bindReducer } from '../utils/reducer'

import { AUTH_FAIL, AUTH_SUCCESS, AUTHORIZE, LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from './auth.actions'

export const initialState = {
  isCheckingAuth: true,
  loading: false,
  authenticated: undefined,
}

const auth = {
  [AUTHORIZE]: (state) => ({
    ...state,
    loading: true,
  }),
  [LOGIN]: (state) => ({
    ...state,
    loading: true,
  }),
  [LOGIN_SUCCESS]: (state) => ({
    ...state,
    loading: false,
    authenticated: true,
  }),
  [LOGIN_FAIL]: (state) => ({
    ...state,
    loading: false,
    authenticated: false,
  }),
  [AUTH_SUCCESS]: (state) => ({
    ...state,
    authenticated: true,
    isCheckingAuth: false,
  }),
  [AUTH_FAIL]: (state) => ({
    ...state,
    authenticated: false,
    isCheckingAuth: false,
  }),
}

export default (state, action) => bindReducer(state, action, auth, initialState)
