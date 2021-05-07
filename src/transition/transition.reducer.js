import { bindReducer } from "../utils/reducer";
import { SET_CANDIDATES, SET_HOT_CANDIDATES } from "./transition.actions";

export const initialState = {
  candidates: [],
  hotCandidates: [],
};

const transition = {
  [SET_CANDIDATES]: (state, payload) => ({ ...state, candidates: payload }),
  [SET_HOT_CANDIDATES]: (state, payload) => ({ ...state, hotCandidates: payload }),
};

export default (state, action) =>
  bindReducer(state, action, transition, initialState);
