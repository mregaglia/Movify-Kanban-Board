import { bindReducer } from "../../utils/reducer";
import { initializeObjectByDatesTable } from '../../utils/reporting'
import { SET_DATA_EXPAND_VIEW, INITIALIZE_EXPAND_VIEW } from './expandView.action'

const objectByDates = initializeObjectByDatesTable()

export const initialState = {
}

const expandView = {
  [SET_DATA_EXPAND_VIEW]: (state, payload) => (
    {
      ...state,
      [payload.TYPE]: {
        ...state[payload.TYPE],
        [payload.WEEK_LABEL]: [...state[payload.TYPE][payload.WEEK_LABEL], payload.DETAIL_STRING]
      }
    }),
  [INITIALIZE_EXPAND_VIEW]: (state) => (
    {
      ...state,
      INTERVIEW_SCHEDULED: objectByDates,
      INTERVIEW_DONE: objectByDates,
      LINKED_INMAIL: objectByDates,
      PROSPECTION_MEETING_DONE: objectByDates,
      INTAKES: objectByDates,
      PROSPECTION_MEETING_SCHEDULED: objectByDates,
      NEW_VACANCY: objectByDates,
    }),

}

export default (state, action) =>
  bindReducer(state, action, expandView, initialState);