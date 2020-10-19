import { bindReducer } from "../utils/reducer";

import {
  KPI_DATA_EMPLOYEE_ACTION
} from "./kpi.actions"

export const initialState = {
  noteEmployee: []
}

const kip = {
  [KPI_DATA_EMPLOYEE_ACTION]: (state, payload) => (
    {
      ...state,
      noteEmployee: payload
    })
}

export default (state, action) =>
  bindReducer(state, action, kip, initialState);