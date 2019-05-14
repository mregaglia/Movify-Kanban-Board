import { SET_CANDIDATE_SUGGESTIONS } from "../addCandidate.actions";
import reducer, { initialState } from "../addCandidate.reducer";

describe("addCandidate reducer", () => {
  it("should return initial state", () => {
    expect(reducer()).toEqual(initialState);
  });
  it("should apply SET_CANDIDATE_SUGGESTIONS", () => {
    const suggestions = [{ id: 1, firstName: "Candi", lastName: "Date" }];
    const action = { type: SET_CANDIDATE_SUGGESTIONS, payload: suggestions };
    const expectedState = {
      ...initialState,
      suggestions
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
