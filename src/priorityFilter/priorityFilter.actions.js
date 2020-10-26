export const SET_PRIORITY_FILTER = "SET_PRIORITY_FILTER";
export const UPDATE_PRIORITY_FILTER = "UPDATE_PRIORITY_FILTER";
export const SET_FILTERED_BMS = "SET_FILTERED_BMS";
export const SET_FILTERED_CCS = "SET_FILTERED_CCS";

export const updatePriorityFilter = filter => ({
  type: UPDATE_PRIORITY_FILTER,
  payload: filter
});
export const setPriorityFilter = filter => ({
  type: SET_PRIORITY_FILTER,
  payload: filter
});

export const setFilteredBms = bms => ({
  type: SET_FILTERED_BMS,
  payload: bms
});
export const setFilteredCcs = ccs => ({
  type: SET_FILTERED_CCS,
  payload: ccs
});
