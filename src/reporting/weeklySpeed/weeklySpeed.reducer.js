import { bindReducer } from "../../utils/reducer";

import { SET_GAUGE_LIMIT} from '../weeklySpeed/weeklySpeed.action'

export const initialState = {
  gaugeLimitForEmployeeSelected: {},
}

const weeklySpeed = {
  [SET_GAUGE_LIMIT]: (state, payload) => (
    {
      ...state,
      gaugeLimitForEmployeeSelected: payload
    })
}

export default (state, action) =>
  bindReducer(state, action, weeklySpeed, initialState);