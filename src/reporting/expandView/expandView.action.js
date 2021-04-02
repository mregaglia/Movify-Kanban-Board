export const GET_DETAIL_DATA = "GET_DETAIL_DATA"
export const SET_DATA_EXPAND_VIEW = "SET_DATA_EXPAND_VIEW"
export const INITIALIZE_EXPAND_VIEW = "INITIALIZE_EXPAND_VIEW"

// ClientId only gets used for type INTAKES,
// were we need data from both client and candidate
export const getDetailData = (id, data, type, weekLabel, clientOrCandidate, clientId = null) => ({ type: GET_DETAIL_DATA, payload: { ID: id, DATA: data, TYPE: type, WEEK_LABEL: weekLabel, CLIENT_OR_CANDIDATE: clientOrCandidate, CLIENT_ID: clientId } })

export const setDataExpandView = (type, weekLabel, detailString) => ({ type: SET_DATA_EXPAND_VIEW, payload: { TYPE: type, WEEK_LABEL: weekLabel, DETAIL_STRING: detailString } })
export const initializeExpandView = () => ({ type: INITIALIZE_EXPAND_VIEW })