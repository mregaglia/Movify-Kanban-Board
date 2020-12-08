export const SET_PROSPECTION_DONE = "SET_PROSPECTION_DONE"

export const setProspectionDone = (id, weekLabel) => ({ type: SET_PROSPECTION_DONE, payload: {ID: id, WEEK_LABEL: weekLabel} })
