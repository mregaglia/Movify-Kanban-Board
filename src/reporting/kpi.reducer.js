import { bindReducer } from "../utils/reducer";

import {
  KPI_DATA_EMPLOYEE_ACTION,
  KPI_SET_DATA_EMPLOYEE_ACTION
} from "./kpi.actions"

export const initialState = {
  notesEmployee: [],
  noteToSelectEmployee: {}
}

const kpi = {
  [KPI_DATA_EMPLOYEE_ACTION]: (state, payload) => (
    {
      ...state,
      noteToSelectEmployee: payload
    }),
  [KPI_SET_DATA_EMPLOYEE_ACTION]: (state, payload) => ({
    ...state,
    notesEmployee: [...state.notesEmployee, payload]
  })
}

export default (state, action) =>
  bindReducer(state, action, kpi, initialState);