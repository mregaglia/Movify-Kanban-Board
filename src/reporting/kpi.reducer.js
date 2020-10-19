import { bindReducer } from "../utils/reducer";

import {
  KPI_NOTE_ACTION,
  KPI_SET_NOTE_EMPLOYEE_ACTION,
  KPI_RESET_DATA,
  KPI_SET_JOBOFFER_EMPLOYEE_ACTION
} from "./kpi.actions"

export const initialState = {
  actionsCounted: [],
  jobOfferCounted: [],
  noteToSelectEmployee: {}
}

const kpi = {
  [KPI_NOTE_ACTION]: (state, payload) => (
    {
      ...state,
      noteToSelectEmployee: payload
    }),
  [KPI_RESET_DATA]: (state, payload) => ({
    ...state,
    actionsCounted: payload,
    jobOfferCounted: payload
  }),
  [KPI_SET_NOTE_EMPLOYEE_ACTION]: (state, payload) => ({
    ...state,
    actionsCounted: [...state.actionsCounted, payload]
  }),
  [KPI_SET_JOBOFFER_EMPLOYEE_ACTION]: (state, payload) => ({
    ...state,
    jobOfferCounted: [...state.jobOfferCounted, payload]
  }),

}

export default (state, action) =>
  bindReducer(state, action, kpi, initialState);