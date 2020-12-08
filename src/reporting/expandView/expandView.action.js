export const GET_PROSPECTION_DONE_DETAIL = "GET_PROSPECTION_DONE_DETAIL"
export const SET_PROSPECTION_DONE = "SET_PROSPECTION_DONE"

export const getProspectionDoneDetail = (id, prospectionDone, weekLabel) => ({ type: GET_PROSPECTION_DONE_DETAIL, payload: { ID: id, PROSPECTION_DONE: prospectionDone, WEEK_LABEL: weekLabel } })
export const setProspectionDone = (weekLabel, detailString) => ({ type: SET_PROSPECTION_DONE, payload: { WEEK_LABEL: weekLabel, DETAIL_STRING: detailString } })