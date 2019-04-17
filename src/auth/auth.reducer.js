import { bindReducer } from "../utils/reducer";
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from "./auth.actions";

export const initialState = {
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
    authenticated: true
  }),
  [LOGIN_FAIL]: state => ({
    ...state,
    loading: false,
    authenticated: false
  })
};

export default (state, action) =>
  bindReducer(state, action, auth, initialState);
