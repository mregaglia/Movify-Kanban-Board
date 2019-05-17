import { bindReducer } from "../utils/reducer";
import {
  SET_DEPARTMENT_FILTER,
  SET_FILTERED_BMS,
  SET_FILTERED_CCS
} from "./departmentFilter.actions";

export const initialState = {
  filter: {
    Antwerp: true,
    Brussels: true,
    Luxembourg: true
  },
  kanbanBms: [],
  recruitmentCcs: []
};

const departmentFilter = {
  [SET_DEPARTMENT_FILTER]: (state, payload) => ({
    ...state,
    filter: { ...state.filter, ...payload }
  }),
  [SET_FILTERED_BMS]: (state, payload) => ({
    ...state,
    kanbanBms: payload
  }),
  [SET_FILTERED_CCS]: (state, payload) => ({
    ...state,
    recruitmentCcs: payload
  })
};

export default (state, action) =>
  bindReducer(state, action, departmentFilter, initialState);
