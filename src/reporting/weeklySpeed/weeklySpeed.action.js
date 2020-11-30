export const GET_GAUGE_LIMIT = "GET_GAUGE_LIMIT"
export const SET_GAUGE_LIMIT = "SET_GAUGE_LIMIT"

export const SET_CALCULATING_WEEKLYSPEED = "SET_CALCULATING_WEEKLYSPEED"
export const SET_WEEKLY_SPEED = "SET_WEEKLY_SPEED"

export const getGaugeLimit = () => ({ type: GET_GAUGE_LIMIT })
export const setGaugeLimit = (gaugeLimit) => ({ type: SET_GAUGE_LIMIT, payload: gaugeLimit })

export const setCalculatingWeeklySpeed = (isCalculatingWeeklySpeed) => ({ type: SET_CALCULATING_WEEKLYSPEED, payload: isCalculatingWeeklySpeed })
export const setWeeklySpeed = (weekLabel, weeklySpeed) => ({ type: SET_WEEKLY_SPEED, payload: { WEEK_LABEL: weekLabel, SCORE: weeklySpeed } })