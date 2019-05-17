import {
  SET_DEPARTMENT_FILTER,
  UPDATE_DEPARTMENT_FILTER,
  SET_FILTERED_BMS,
  setDepartmentFilter,
  updateDepartmentFilter,
  setFilteredBms
} from "../departmentFilter.actions";

describe("updateDepartmentFilter action", () => {
  it("should create UPDATE_DEPARTMENT_FILTER action", () => {
    const filter = { filter: true };
    expect(updateDepartmentFilter(filter)).toEqual({
      type: UPDATE_DEPARTMENT_FILTER,
      payload: filter
    });
  });
});

describe("setDepartmentFilter action", () => {
  it("should create SET_DEPARTMENT_FILTER action", () => {
    const filter = { filter: true };
    expect(setDepartmentFilter(filter)).toEqual({
      type: SET_DEPARTMENT_FILTER,
      payload: filter
    });
  });
});

describe("setFilteredBms action", () => {
  it("should create SET_FILTERED_BMS action", () => {
    const bms = [1, 2, 3];
    expect(setFilteredBms(bms)).toEqual({
      type: SET_FILTERED_BMS,
      payload: bms
    });
  });
});
