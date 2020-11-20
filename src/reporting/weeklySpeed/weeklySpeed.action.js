export const GET_GAUGE_LIMIT = "GET_GAUGE_LIMIT"
export const SET_GAUGE_LIMIT = "SET_GAUGE_LIMIT"

export const GET_CATEGORIES_FROM_CANDIDATES = "GET_CATEGORIES_FROM_CANDIDATES"

export const getGaugeLimit = () => ({ type: GET_GAUGE_LIMIT })
export const setGaugeLimit = (gaugeLimit) => ({ type: SET_GAUGE_LIMIT, payload: gaugeLimit })

export const getCategoriesFromCandidates = (candidatesID) => ({ type: GET_CATEGORIES_FROM_CANDIDATES, payload: candidatesID })
