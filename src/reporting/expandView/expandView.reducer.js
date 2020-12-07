import { bindReducer } from "../../utils/reducer";
import { initializeObjectByDates } from '../../utils/reporting'

const objectByDates = initializeObjectByDates()

export const initialState = {
  INTERVIEW_SCHEDULED: objectByDates,
  INTERVIEW_DONE:objectByDates,
  LINKEDIN_MAIL:objectByDates,
  PROSPECTION_MEETING_DONE: objectByDates,
  INTAKE: objectByDates
}

const expandView = {

}

export default (state, action) =>
  bindReducer(state, action, expandView, initialState);