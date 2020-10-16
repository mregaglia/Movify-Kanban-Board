import { bindReducer } from "../utils/reducer";

import {
  GET_DATA_EMPLOYEE
} from "./dataemployee.actions"

export const initialState = {
  noteEmployee: []
}

const dateemployee = {
  [GET_DATA_EMPLOYEE]: (state, payload) => (
    {
      ...state,
      noteEmployee: payload
    })
}

export default (state, action) =>
  bindReducer(state, action, dateemployee, initialState);