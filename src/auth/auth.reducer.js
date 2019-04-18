import { bindReducer } from "../utils/reducer";
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from "./auth.actions";

export const initialState = {
  isCheckingAuth: true,
  loading: false,
  authenticated: undefined
};

const auth = {
  [LOGIN]: state => ({
    ...state,
    loading: true
  }),
  [LOGIN_SUCCESS]: state => ({
    ...state,
    loading: false,
    authenticated: true,
    isCheckingAuth: false
  }),
  [LOGIN_FAIL]: state => ({
    ...state,
    loading: false,
    authenticated: false,
    isCheckingAuth: false
  })
};

export default (state, action) =>
  bindReducer(state, action, auth, initialState);
