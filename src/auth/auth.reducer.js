import { bindReducer } from "../utils/reducer";
import { LOGIN, SET_USER } from "./auth.actions";

export const initialState = {
  loading: true,
  data: {}
};

const auth = {
  [LOGIN]: state => ({
    ...state,
    loading: true
  }),
  [SET_USER]: (state, payload) => ({
    ...state,
    loading: false,
    data: payload
  })
};

export default (state, action) =>
  bindReducer(state, action, auth, initialState);
