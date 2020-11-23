import { bindReducer } from "../../utils/reducer";

import { SET_GAUGE_LIMIT, SET_WEEKLY_SPEED } from '../weeklySpeed/weeklySpeed.action'

export const initialState = {
  gaugeLimitForEmployeeSelected: {},
  pointWeeklySpeed: 0
}

const weeklySpeed = {
  [SET_GAUGE_LIMIT]: (state, payload) => (
    {
      ...state,
      gaugeLimitForEmployeeSelected: payload
    }),
  [SET_WEEKLY_SPEED]: (state, payload) => (
    {
      ...state,
      pointWeeklySpeed: payload
    }),
}

export default (state, action) =>
  bindReducer(state, action, weeklySpeed, initialState);