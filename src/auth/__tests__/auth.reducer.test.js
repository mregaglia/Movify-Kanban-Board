import { AUTH_FAIL, AUTH_SUCCESS, LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from '../auth.actions'
import authReducer, { initialState } from '../auth.reducer'

describe('auth reducer', () => {
  it('should return initial state', () => {
    expect(authReducer(initialState)).toEqual(initialState)
  })
  it('should apply login', () => {
    const action = { type: LOGIN }
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
    })
  })
  it('should apply login success', () => {
    const action = { type: LOGIN_SUCCESS }
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      loading: false,
      authenticated: true,
    })
  })
  it('should apply login fail', () => {
    const action = { type: LOGIN_FAIL }
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      loading: false,
      authenticated: false,
    })
  })
  it('should apply auth success', () => {
    const action = { type: AUTH_SUCCESS }
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      authenticated: true,
      isCheckingAuth: false,
    })
  })
  it('should apply auth fail', () => {
    const action = { type: AUTH_FAIL }
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      authenticated: false,
      isCheckingAuth: false,
    })
  })
})
