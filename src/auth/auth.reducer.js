import { bindReducer } from "../utils/reducer";
import {
  AUTHORIZE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_SUCCESS,
  AUTH_FAIL
} from "./auth.actions";

export const initialState = {
  isCheckingAuth: true,
  loading: false,
  authenticated: undefined
};

const auth = {
  [AUTHORIZE]: state => ({
    ...state,
    loading: true
  }),
  [LOGIN_SUCCESS]: state => ({
    ...state,
    loading: false,
    authenticated: true
  }),
  [LOGIN_FAIL]: state => ({
    ...state,
    loading: false,
    authenticated: false
  }),
  [AUTH_SUCCESS]: state => ({
    ...state,
    authenticated: true,
    isCheckingAuth: false
  }),
  [AUTH_FAIL]: state => ({
    ...state,
    authenticated: false,
    isCheckingAuth: false
  })
};

export default (state, action) =>
  bindReducer(state, action, auth, initialState);
