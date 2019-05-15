import { mergeDeepWith, union } from "ramda";
import { bindReducer } from "../utils/reducer";
import { unionArrays } from "../utils/kanban";
import {
  GET_RECRUITMENT,
  UPDATE_RECRUITMENT_CLIENT_CORPORATIONS,
  UPDATE_RECRUITMENT_JOB_ORDERS,
  UPDATE_RECRUITMENT_JOB_SUBMISSIONS,
  UPDATE_RECRUITMENT_CLIENT_CORPORATIONS_IDS,
  UPDATE_HRS
} from "./recruitment.actions";

export const initialState = {
  loading: false,
  clientList: [],
  clientCorporations: {},
  jobOrders: {},
  jobSubmissions: {},
  hrs: []
};

const recruitment = {
  [GET_RECRUITMENT]: () => ({
    ...initialState,
    loading: true
  }),
  [UPDATE_RECRUITMENT_CLIENT_CORPORATIONS_IDS]: (state, payload) => ({
    ...state,
    clientList: union(state.clientList, payload)
  }),
  [UPDATE_RECRUITMENT_CLIENT_CORPORATIONS]: (state, payload) => ({
    ...state,
    clientCorporations: mergeDeepWith(
      unionArrays,
      state.clientCorporations,
      payload
    )
  }),
  [UPDATE_RECRUITMENT_JOB_ORDERS]: (state, payload) => ({
    ...state,
    jobOrders: mergeDeepWith(unionArrays, state.jobOrders, payload)
  }),
  [UPDATE_RECRUITMENT_JOB_SUBMISSIONS]: (state, payload) => ({
    ...state,
    loading: false,
    jobSubmissions: mergeDeepWith(unionArrays, state.jobSubmissions, payload)
  }),
  [UPDATE_HRS]: (state, payload) => ({
    ...state,
    hrs: union(state.hrs, payload)
  })
};

export default (state, action) =>
  bindReducer(state, action, recruitment, initialState);
