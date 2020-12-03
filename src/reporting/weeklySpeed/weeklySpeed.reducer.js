import { bindReducer } from "../../utils/reducer";

import { SET_GAUGE_LIMIT, SET_WEEKLY_SPEED, SET_CALCULATING_WEEKLYSPEED } from './weeklySpeed.action'

export const initialState = {
  gaugeLimitForEmployeeSelected: {},
  isCalculatingWeeklySpeed: false,
  weeklySpeedScores: {
    FIRST_WEEK: 0,
    SECOND_WEEK: 0,
    THIRD_WEEK: 0,
    FOURTH_WEEK: 0
  }
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
      weeklySpeedScores: {
        ...state.weeklySpeedScores,
        [payload.WEEK_LABEL]: payload.SCORE
      }
    }),
  [SET_CALCULATING_WEEKLYSPEED]: (state, payload) => (
    {
      ...state,
      isCalculatingWeeklySpeed: payload
    })
}

export default (state, action) =>
  bindReducer(state, action, weeklySpeed, initialState);