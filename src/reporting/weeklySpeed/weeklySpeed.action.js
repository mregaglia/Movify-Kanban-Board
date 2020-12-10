export const GET_GAUGE_LIMIT = "GET_GAUGE_LIMIT"
export const SET_GAUGE_LIMIT = "SET_GAUGE_LIMIT"

export const SET_WEEKLY_SPEED = "SET_WEEKLY_SPEED"
export const INITIALIZE_STATE_WEEKLY_SPEED_CALCUL = "INITIALIZE_STATE_WEEKLY_SPEED_CALCUL"

export const getGaugeLimit = () => ({ type: GET_GAUGE_LIMIT })
export const setGaugeLimit = (gaugeLimit) => ({ type: SET_GAUGE_LIMIT, payload: gaugeLimit })

export const setWeeklySpeed = (weekLabel, weeklySpeed) => ({ type: SET_WEEKLY_SPEED, payload: { WEEK_LABEL: weekLabel, SCORE: weeklySpeed } })
export const initializeStateWeeklySpeedCalcul = () => ({ type: INITIALIZE_STATE_WEEKLY_SPEED_CALCUL})