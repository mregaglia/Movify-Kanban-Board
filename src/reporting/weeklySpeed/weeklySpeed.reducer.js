import { bindReducer } from "../../utils/reducer";

import { SET_GAUGE_LIMIT, SET_WEEKLY_SPEED, INITIALIZE_STATE_WEEKLY_SPEED_CALCUL } from './weeklySpeed.action'

export const initialState = {
  gaugeLimitForEmployeeSelected: {},
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
      },
      numberOfWeeklySpeedCalculated: state.numberOfWeeklySpeedCalculated + 1,
      hasCalculatedWeeklySpeed: state.numberOfWeeklySpeedCalculated >= 3
    }),
    [INITIALIZE_STATE_WEEKLY_SPEED_CALCUL]: (state) => (
      {
        ...state,
        hasCalculatedWeeklySpeed: false,
        numberOfWeeklySpeedCalculated: 0
      }),
}

export default (state, action) =>
  bindReducer(state, action, weeklySpeed, initialState);