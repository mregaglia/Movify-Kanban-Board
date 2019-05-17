export const SET_DEPARTMENT_FILTER = "SET_DEPARTMENT_FILTER";
export const UPDATE_DEPARTMENT_FILTER = "UPDATE_DEPARTMENT_FILTER";
export const SET_FILTERED_BMS = "SET_FILTERED_BMS";

export const updateDepartmentFilter = filter => ({
  type: UPDATE_DEPARTMENT_FILTER,
  payload: filter
});
export const setDepartmentFilter = filter => ({
  type: SET_DEPARTMENT_FILTER,
  payload: filter
});

export const setFilteredBms = bms => ({
  type: SET_FILTERED_BMS,
  payload: bms
});
