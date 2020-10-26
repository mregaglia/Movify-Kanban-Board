import { bindReducer } from "../../utils/reducer";

import {
  KPI_RESET_DATA,
  SET_EMPLOYEE_KPI
} from "./kpi.actions"

export const initialState = {
  dataEmployee: {},
}

const kpi = {
  [KPI_RESET_DATA]: (state, payload) => ({
    ...state,
    dataEmployee: payload
  }),
  [SET_EMPLOYEE_KPI]: (state, payload) => ({
    ...state,
    dataEmployee: payload
  })
}

export default (state, action) =>
  bindReducer(state, action, kpi, initialState);