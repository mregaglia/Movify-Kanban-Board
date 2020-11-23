import weeklySpeedSagas from "./weeklySpeed.sagas"

export const GET_GAUGE_LIMIT = "GET_GAUGE_LIMIT"
export const SET_GAUGE_LIMIT = "SET_GAUGE_LIMIT"

export const GET_CATEGORIES_FROM_CANDIDATES = "GET_CATEGORIES_FROM_CANDIDATES"

export const SET_WEEKLY_SPEED = "SET_WEEKLY_SPEED"

export const CALCULATE_WEEKLY_SPEED_BUSINESS_MANAGER = "CALCULATE_WEEKLY_SPEED_BUSINESS_MANAGER"

export const getGaugeLimit = () => ({ type: GET_GAUGE_LIMIT })
export const setGaugeLimit = (gaugeLimit) => ({ type: SET_GAUGE_LIMIT, payload: gaugeLimit })

export const getCategoriesFromCandidates = (candidatesID, occupation) => ({ type: GET_CATEGORIES_FROM_CANDIDATES, payload: {CANDIATES_ID: candidatesID, OCCUPATION: occupation }})

export const setWeeklySpeed = (weeklySpeed) => ({ type: SET_WEEKLY_SPEED, payload: weeklySpeed})

export const calculateWeeklySpeedBusinessManager = () => ({ type: CALCULATE_WEEKLY_SPEED_BUSINESS_MANAGER})
