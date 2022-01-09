import { dissoc, mergeDeepRight, mergeDeepWith } from 'ramda'

import { unionArrays } from '../utils/kanban'
import { bindReducer } from '../utils/reducer'

import {
  GET_KANBAN,
  REMOVE_JOB_SUBMISSION,
  SET_BMS,
  SET_JOB_ORDERS,
  SET_JOB_SUBMISSIONS,
  UPDATE_BMS,
  UPDATE_CLIENT_CORPORATIONS,
  UPDATE_FILTERED_JOB_ORDERS,
  UPDATE_JOB_ORDERS,
  UPDATE_JOB_SUBMISSIONS,
} from './kanban.actions'

export const initialState = {
  loading: false,
  bmList: [],
  bms: {},
  clientCorporations: {},
  jobOrders: {},
  jobSubmissions: {},
}

const kanban = {
  [GET_KANBAN]: () => ({
    ...initialState,
    loading: true,
  }),
  [SET_BMS]: (state, payload) => ({
    ...state,
    bmList: payload,
  }),
  [UPDATE_BMS]: (state, payload) => ({
    ...state,
    bms: mergeDeepWith(unionArrays, state.bms, payload),
  }),
  [UPDATE_CLIENT_CORPORATIONS]: (state, payload) => ({
    ...state,
    clientCorporations: mergeDeepWith(unionArrays, state.clientCorporations, payload),
  }),
  [UPDATE_FILTERED_JOB_ORDERS]: (state, payload) => ({
    ...state,
    clientCorporations: mergeDeepRight(state.clientCorporations, payload),
  }),
  [SET_JOB_ORDERS]: (state, payload) => ({
    ...state,
    jobOrders: payload,
  }),
  [UPDATE_JOB_ORDERS]: (state, payload) => ({
    ...state,
    jobOrders: mergeDeepWith(unionArrays, state.jobOrders, payload),
  }),
  [SET_JOB_SUBMISSIONS]: (state, payload) => ({
    ...state,
    loading: false,
    jobSubmissions: payload,
  }),
  [UPDATE_JOB_SUBMISSIONS]: (state, payload) => ({
    ...state,
    loading: false,
    jobSubmissions: mergeDeepWith(unionArrays, state.jobSubmissions, payload),
  }),
  [REMOVE_JOB_SUBMISSION]: (state, payload) => ({
    ...state,
    jobSubmissions: dissoc(payload, state.jobSubmissions),
  }),
}

export default (state, action) => bindReducer(state, action, kanban, initialState)
