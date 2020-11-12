import { bindReducer } from "../../utils/reducer";

import {
  SET_EMPLOYEE_KPI,
  SET_LOADING_KPI,
  SET_GAUGE_LIMIT,
  SET_CALCULATION_YTD,
  SET_OBJECT_YTD,
  SET_CV_SENT,
  SET_YTD_TOTAL_BUSINESS_MANAGER,
  SET_YTD_TOTAL_RECRUITMENT,
  SET_AVERAGE_YTD_BUSINESS_MANAGER,
  SET_AVERAGE_YTD_RECRUITMENT,
  SET_CONVERSION_YTD_BUSINESS_MANAGER,
  SET_CONVERSION_YTD_RECRUITMENT
} from "./kpi.actions"

export const initialState = {
  dataEmployee: {},
  dataYTDEmployee: {},
  isLoadingKpi: false,
  isCalculatingYTD: false,
  gaugeLimit: {},
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
  [SET_CV_SENT]: (state, payload) => ({
    ...state,
    dataEmployee: {
      ...state.dataEmployee,
      datasBusinessManager: {
        ...state.dataEmployee.datasBusinessManager,
        CV_SENT: payload
      }
    },
  }),
  [SET_YTD_TOTAL_BUSINESS_MANAGER]: (state, payload) => ({
    ...state,
    dataYTDEmployee: {
      ...state.dataYTDEmployee,
      TOTAL_YTD_BM : payload
    }
  }),
  [SET_YTD_TOTAL_RECRUITMENT]: (state, payload) => ({
    ...state,
    dataYTDEmployee: {
      ...state.dataYTDEmployee,
      TOTAL_YTD_RE : payload
    }
  }),
  [SET_AVERAGE_YTD_BUSINESS_MANAGER]: (state, payload) => ({
    ...state,
    dataYTDEmployee: {
      ...state.dataYTDEmployee,
      AVERAGE_YTD_BM : payload
    }
  }),
  [SET_AVERAGE_YTD_RECRUITMENT]: (state, payload) => ({
    ...state,
    dataYTDEmployee: {
      ...state.dataYTDEmployee,
      AVERAGE_YTD_RE : payload
    }
  }),
  [SET_CONVERSION_YTD_BUSINESS_MANAGER]: (state, payload) => ({
    ...state,
    dataYTDEmployee: {
      ...state.dataYTDEmployee,
      CONVERSION_YTD_BM : payload
    }
  }),
  [SET_CONVERSION_YTD_RECRUITMENT]: (state, payload) => ({
    ...state,
    dataYTDEmployee: {
      ...state.dataYTDEmployee,
      CONVERSION_YTD_RE : payload
    }
  }),

}

export default (state, action) =>
  bindReducer(state, action, kpi, initialState);