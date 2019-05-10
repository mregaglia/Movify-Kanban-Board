import {
  SET_DEPARTMENT_FILTER,
  SET_FILTERED_BMS
} from "../departmentFilter.actions";
import reducer, { initialState } from "../departmentFilter.reducer";

describe("departmentFilter reducer", () => {
  it("should return initial state", () => {
    expect(reducer()).toEqual(initialState);
  });
  it("should apply SET_DEPARTMENT_FILTER", () => {
    const filter = { Brussels: false };
    const action = { type: SET_DEPARTMENT_FILTER, payload: filter };
    const expectedState = {
      ...initialState,
      filter: {
        ...initialState.filter,
        ...filter
      }
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
  it("should apply SET_FILTERED_BMS", () => {
    const bms = [1, 2, 3];
    const action = { type: SET_FILTERED_BMS, payload: bms };
    const expectedState = {
      ...initialState,
      filteredBms: bms
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
