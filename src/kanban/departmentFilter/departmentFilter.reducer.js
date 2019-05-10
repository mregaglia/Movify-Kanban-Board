import { bindReducer } from "../../utils/reducer";
import {
  SET_DEPARTMENT_FILTER,
  SET_FILTERED_BMS
} from "./departmentFilter.actions";

export const initialState = {
  filter: {
    Brussels: true,
    Luxembourg: true
  },
  filteredBms: []
};

const departmentFilter = {
  [SET_DEPARTMENT_FILTER]: (state, payload) => ({
    ...state,
    filter: { ...state.filter, ...payload }
  }),
  [SET_FILTERED_BMS]: (state, payload) => ({
    ...state,
    filteredBms: payload
  })
};

export default (state, action) =>
  bindReducer(state, action, departmentFilter, initialState);
