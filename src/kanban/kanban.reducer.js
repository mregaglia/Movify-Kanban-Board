import { concat, mergeDeepWith } from "ramda";
import { bindReducer } from "../utils/reducer";
import {
  GET_KANBAN,
  SET_BMS,
  UPDATE_BMS,
  UPDATE_CLIENT_CORPORATIONS,
  SET_JOB_ORDERS,
  UPDATE_JOB_ORDERS,
  SET_JOB_SUBMISSIONS,
  UPDATE_JOB_SUBMISSIONS
} from "./kanban.actions";

export const initialState = {
  loading: false,
  bms: {},
  clientCorporations: {},
  jobOrders: {},
  jobSubmissions: {}
};

const kanban = {
  [GET_KANBAN]: () => ({
    ...initialState,
    loading: true
  }),
  [SET_BMS]: (state, payload) => ({
    ...state,
    bms: payload
  }),
  [UPDATE_BMS]: (state, payload) => ({
    ...state,
    bms: mergeDeepWith(concat, state.bms, payload)
  }),
  [UPDATE_CLIENT_CORPORATIONS]: (state, payload) => ({
    ...state,
    clientCorporations: mergeDeepWith(concat, state.clientCorporations, payload)
  }),
  [SET_JOB_ORDERS]: (state, payload) => ({
    ...state,
    jobOrders: payload
  }),
  [UPDATE_JOB_ORDERS]: (state, payload) => ({
    ...state,
    jobOrders: mergeDeepWith(concat, state.jobOrders, payload)
  }),
  [SET_JOB_SUBMISSIONS]: (state, payload) => ({
    ...state,
    loading: false,
    jobSubmissions: payload
  }),
  [UPDATE_JOB_SUBMISSIONS]: (state, payload) => ({
    ...state,
    loading: false,
    jobSubmissions: mergeDeepWith(concat, state.jobSubmissions, payload)
  })
};

export default (state, action) =>
  bindReducer(state, action, kanban, initialState);
