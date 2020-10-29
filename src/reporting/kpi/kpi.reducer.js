import { bindReducer } from "../../utils/reducer";

import {
  SET_EMPLOYEE_KPI,
  SET_LOADING_KPI,
  SET_GAUGE_LIMIT
} from "./kpi.actions"

export const initialState = {
  dataEmployee: {},
  isLoadingKpi: false,
  gaugeLimit: {}
}

const kpi = {
  [SET_EMPLOYEE_KPI]: (state, payload) => ({
    ...state,
    dataEmployee: payload
  }),
  [SET_LOADING_KPI]: (state, payload) => ({
    ...state,
    isLoadingKpi: payload
  }),
  [SET_GAUGE_LIMIT]: (state, payload) => ({
    ...state,
    gaugeLimit: payload
  }),

}

export default (state, action) =>
  bindReducer(state, action, kpi, initialState);