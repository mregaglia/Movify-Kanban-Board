import { bindReducer } from "../../utils/reducer";
import { SET_CANDIDATE_SUGGESTIONS } from "./addCandidate.actions";

export const initialState = {
  suggestions: []
};

const addCandidate = {
  [SET_CANDIDATE_SUGGESTIONS]: (state, payload) => ({
    ...state,
    suggestions: payload
  })
};

export default (state, action) =>
  bindReducer(state, action, addCandidate, initialState);
