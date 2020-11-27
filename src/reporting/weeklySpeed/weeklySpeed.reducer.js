import { bindReducer } from "../../utils/reducer";

import { SET_GAUGE_LIMIT, SET_WEEKLY_SPEED, SET_CALCULATING_WEEKLYSPEED } from './weeklySpeed.action'

export const initialState = {
  gaugeLimitForEmployeeSelected: {},
  pointWeeklySpeed: 0,
  isCalculatingWeeklySpeed: false
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
  [SET_CALCULATING_WEEKLYSPEED]: (state, payload) => (
    {
      ...state,
      isCalculatingWeeklySpeed: payload
    })
}

export default (state, action) =>
  bindReducer(state, action, weeklySpeed, initialState);