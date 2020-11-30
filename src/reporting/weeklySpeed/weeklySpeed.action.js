export const GET_GAUGE_LIMIT = "GET_GAUGE_LIMIT"
export const SET_GAUGE_LIMIT = "SET_GAUGE_LIMIT"

export const SET_CALCULATING_WEEKLYSPEED = "SET_CALCULATING_WEEKLYSPEED"

export const GET_CATEGORIES_FROM_CANDIDATES = "GET_CATEGORIES_FROM_CANDIDATES"

export const SET_WEEKLY_SPEED = "SET_WEEKLY_SPEED"

export const CALCULATE_WEEKLY_SPEED_BUSINESS_MANAGER = "CALCULATE_WEEKLY_SPEED_BUSINESS_MANAGER"
export const CALCULATE_WEEKLY_SPEED_RECRUITMENT = "CALCULATE_WEEKLY_SPEED_RECRUITMENT"
export const CALCULATE_WEEKLY_SPEED_SOURCING_OFFICER = "CALCULATE_WEEKLY_SPEED_SOURCING_OFFICER"

export const getGaugeLimit = () => ({ type: GET_GAUGE_LIMIT })
export const setGaugeLimit = (gaugeLimit) => ({ type: SET_GAUGE_LIMIT, payload: gaugeLimit })

export const setCalculatingWeeklySpeed = (isCalculatingWeeklySpeed) => ({ type: SET_CALCULATING_WEEKLYSPEED, payload: isCalculatingWeeklySpeed })

export const calculateWeeklySpeedSourcingOfficer = (weekLabel, categories) => ({ type: CALCULATE_WEEKLY_SPEED_SOURCING_OFFICER, payload: { WEEK_LABEL: weekLabel, CATEGORIES: categories } })

export const setWeeklySpeed = (weekLabel, weeklySpeed) => ({ type: SET_WEEKLY_SPEED, payload: { WEEK_LABEL: weekLabel, SCORE: weeklySpeed } })

export const calculateWeeklySpeedBusinessManager = (idEmployee, dates, prospectionsDone) => ({ type: CALCULATE_WEEKLY_SPEED_BUSINESS_MANAGER, payload: { EMPLOYEE_ID: idEmployee, PROSPECTION_DONE: prospectionsDone, DATES: dates } })
