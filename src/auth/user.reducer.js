import { bindReducer } from "../utils/reducer"

import {
    UPDATE_REPORTONG_ACCESS
} from "./user.actions"

export const initialState = {
    accessToReportingTab: {},
}

const user = {
    [UPDATE_REPORTONG_ACCESS]: (state, payload) => ({
        ...state, 
        accessToReportingTab: payload
    })
}

export default (state, action) => bindReducer(state, action, user, initialState)