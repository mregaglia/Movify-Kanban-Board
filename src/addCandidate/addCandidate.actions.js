export const GET_CANDIDATE_SUGGESTIONS = "GET_CANDIDATE_SUGGESTIONS";
export const SET_CANDIDATE_SUGGESTIONS = "SET_CANDIDATE_SUGGESTIONS";

export const getSuggestions = query => ({
  type: GET_CANDIDATE_SUGGESTIONS,
  payload: query
});
export const setSuggestions = suggestions => ({
  type: SET_CANDIDATE_SUGGESTIONS,
  payload: suggestions
});
