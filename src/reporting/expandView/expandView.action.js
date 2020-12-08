export const GET_DETAIL_DATA = "GET_DETAIL_DATA"
export const SET_PROSPECTION_DONE = "SET_PROSPECTION_DONE"

export const getDetailData = (id, data, type, weekLabel) => ({ type: GET_DETAIL_DATA, payload: { ID: id, DATA: data, TYPE: type, WEEK_LABEL: weekLabel } })

export const setProspectionDone = (type, weekLabel, detailString) => ({ type: SET_PROSPECTION_DONE, payload: { TYPE: type, WEEK_LABEL: weekLabel, DETAIL_STRING: detailString } })