import { bindReducer } from "../utils/reducer";

import {
  KPI_DATA_EMPLOYEE_ACTION,
  KPI_SET_DATA_EMPLOYEE_ACTION,
  KPI_RESET_DATA
} from "./kpi.actions"

export const initialState = {
  actionsCounted: [],
  noteToSelectEmployee: {}
}

const kpi = {
  [KPI_DATA_EMPLOYEE_ACTION]: (state, payload) => (
    {
      ...state,
      noteToSelectEmployee: payload
    }),
  [KPI_RESET_DATA]: (state, payload) => ({
    ...state,
    actionsCounted: payload
  }),
  [KPI_SET_DATA_EMPLOYEE_ACTION]: (state, payload) => ({
    ...state,
    actionsCounted: [...state.actionsCounted, payload]
  })
}

export default (state, action) =>
  bindReducer(state, action, kpi, initialState);