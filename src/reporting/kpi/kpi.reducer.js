import { bindReducer } from "../../utils/reducer";

import {
  SET_EMPLOYEE_KPI
} from "./kpi.actions"

export const initialState = {
  dataEmployee: {},
}

const kpi = {
  [SET_EMPLOYEE_KPI]: (state, payload) => ({
    ...state,
    dataEmployee: payload
  })
}

export default (state, action) =>
  bindReducer(state, action, kpi, initialState);