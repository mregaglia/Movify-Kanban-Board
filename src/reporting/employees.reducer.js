import { bindReducer } from "../utils/reducer";

import {
  SET_EMPLOYEES
} from "./employees.actions"

export const initialState = {
  employeesToSet: []
}

const employees = {
  [SET_EMPLOYEES]: (state, payload) => (
    {
      ...state,
      employeesToSet: payload
    })
}

export default (state, action) =>
  bindReducer(state, action, employees, initialState);