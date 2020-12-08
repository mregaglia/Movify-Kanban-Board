export const GET_DETAIL_DATA = "GET_DETAIL_DATA"
export const SET_DATA_EXPAND_VIEW = "SET_DATA_EXPAND_VIEW"

export const getDetailData = (id, data, type, weekLabel, clientOrCandidate) => ({ type: GET_DETAIL_DATA, payload: { ID: id, DATA: data, TYPE: type, WEEK_LABEL: weekLabel, CLIENT_OR_CANDIDATE: clientOrCandidate } })

export const setDataExpandView = (type, weekLabel, detailString) => ({ type: SET_DATA_EXPAND_VIEW, payload: { TYPE: type, WEEK_LABEL: weekLabel, DETAIL_STRING: detailString } })