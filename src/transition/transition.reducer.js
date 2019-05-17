import { bindReducer } from "../utils/reducer";
import { SET_CANDIDATES } from "./transition.actions";

export const initialState = {
  candidates: []
};

const transition = {
  [SET_CANDIDATES]: (state, payload) => ({ ...state, candidates: payload })
};

export default (state, action) =>
  bindReducer(state, action, transition, initialState);
