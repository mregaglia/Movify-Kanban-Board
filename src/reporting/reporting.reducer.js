import { bindReducer } from "../utils/reducer";

import {
    SET_DATE
} from "./reporting.action"

export const initialState = {
  dates: []
}

const reporting = {
  [SET_DATE]: (state, payload) => (
    {
      ...state,
      dates: payload
    })
}

export default (state, action) =>
  bindReducer(state, action, reporting, initialState);