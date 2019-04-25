import { bindReducer } from "../utils/reducer";
import {
  GET_KANBAN,
  SET_BMS,
  SET_CLIENT_CORPORATIONS,
  SET_JOB_ORDERS,
  SET_JOB_SUBMISSIONS
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
  [SET_CLIENT_CORPORATIONS]: (state, payload) => ({
    ...state,
    clientCorporations: payload
  }),
  [SET_JOB_ORDERS]: (state, payload) => ({
    ...state,
    jobOrders: payload
  }),
  [SET_JOB_SUBMISSIONS]: (state, payload) => ({
    ...state,
    loading: false,
    jobSubmissions: payload
  })
};

export default (state, action) =>
  bindReducer(state, action, kanban, initialState);
