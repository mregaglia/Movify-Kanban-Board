import { all, put, select } from "redux-saga/effects";
import {
  getStateFilter,
  getStateBms,
  getStateBmIds,
  updateDepartmentFilter
} from "../departmentFilter.sagas";
import {
  UPDATE_DEPARTMENT_FILTER,
  setDepartmentFilter,
  setFilteredBms
} from "../departmentFilter.actions";

describe("updateDepartmentFilter saga", () => {
  const filter = { filter: true };
  const action = { type: UPDATE_DEPARTMENT_FILTER, payload: filter };
  const stateFilter = {
    filter2: false,
    ...filter
  };
  const stateBms = {
    1: { id: 1, primaryDepartment: { name: "filter" } },
    2: { id: 2, primaryDepartment: { name: "filter2" } },
    3: { id: 3, primaryDepartment: { name: "filter" } }
  };
  const stateBmIds = [1, 2, 3];
  const filteredBms = [1, 3];
  const generator = updateDepartmentFilter(action);

  it("should put setDepartmentFilter action", () => {
    expect(generator.next().value).toEqual(put(setDepartmentFilter(filter)));
  });
  it("should put get state filter", () => {
    expect(generator.next().value).toEqual(select(getStateFilter));
  });
  it("should put get state bms", () => {
    expect(generator.next(stateFilter).value).toEqual(select(getStateBms));
  });
  it("should put get state bm ids", () => {
    expect(generator.next(stateBms).value).toEqual(select(getStateBmIds));
  });
  it("should filter bms according to filters", () => {
    expect(generator.next(stateBmIds).value).toEqual(all(filteredBms));
  });
  it("should put put setFilteredBms", () => {
    expect(generator.next(filteredBms).value).toEqual(
      put(setFilteredBms(filteredBms))
    );
  });
  it("should be done", () => {
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });
});
