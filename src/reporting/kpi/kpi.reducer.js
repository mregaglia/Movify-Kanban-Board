import { bindReducer } from "../../utils/reducer";

import {
  SET_EMPLOYEE_KPI,
  SET_LOADING_KPI,
  SET_GAUGE_LIMIT,
  SET_CALCULATION_YTD,
  SET_OBJECT_YTD
} from "./kpi.actions"

export const initialState = {
  dataEmployee: {},
  isLoadingKpi: false,
  isCalculatingYTD: false,
  gaugeLimit: {}
}

const kpi = {
  [SET_EMPLOYEE_KPI]: (state, payload) => ({
    ...state,
    dataEmployee: payload
  }),
  [SET_OBJECT_YTD]: (state, payload) => ({
    ...state,
    dataYTDEmployee: payload
  }),
  [SET_LOADING_KPI]: (state, payload) => ({
    ...state,
    isLoadingKpi: payload
  }),
  [SET_CALCULATION_YTD]: (state, payload) => ({
    ...state,
    isCalculatingYTD: payload
  }),
  [SET_GAUGE_LIMIT]: (state, payload) => ({
    ...state,
    gaugeLimit: payload
  }),

}

export default (state, action) =>
  bindReducer(state, action, kpi, initialState);