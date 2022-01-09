import { dissoc, mergeDeepWith, union } from 'ramda'

import { unionArrays } from '../utils/kanban'
import { bindReducer } from '../utils/reducer'

import {
  GET_RECRUITMENT,
  REMOVE_RECRUITMENT_JOB_SUBMISSION,
  SET_RECRUITMENT_JOB_ORDERS,
  SET_RECRUITMENT_JOB_SUBMISSIONS,
  UPDATE_HRS,
  UPDATE_RECRUITMENT_CLIENT_CORPORATIONS,
  UPDATE_RECRUITMENT_CLIENT_CORPORATIONS_IDS,
  UPDATE_RECRUITMENT_JOB_ORDERS,
  UPDATE_RECRUITMENT_JOB_SUBMISSIONS,
} from './recruitment.actions'

export const initialState = {
  loading: false,
  clientList: [],
  clientCorporations: {},
  jobOrders: {},
  jobSubmissions: {},
  hrs: [],
}

const recruitment = {
  [GET_RECRUITMENT]: () => ({
    ...initialState,
    loading: true,
  }),
  [UPDATE_RECRUITMENT_CLIENT_CORPORATIONS_IDS]: (state, payload) => ({
    ...state,
    clientList: union(state.clientList, payload),
  }),
  [UPDATE_RECRUITMENT_CLIENT_CORPORATIONS]: (state, payload) => ({
    ...state,
    clientCorporations: mergeDeepWith(unionArrays, state.clientCorporations, payload),
  }),
  [SET_RECRUITMENT_JOB_ORDERS]: (state, payload) => ({
    ...state,
    jobOrders: payload,
  }),
  [UPDATE_RECRUITMENT_JOB_ORDERS]: (state, payload) => ({
    ...state,
    jobOrders: mergeDeepWith(unionArrays, state.jobOrders, payload),
  }),
  [SET_RECRUITMENT_JOB_SUBMISSIONS]: (state, payload) => ({
    ...state,
    jobSubmissions: payload,
  }),
  [UPDATE_RECRUITMENT_JOB_SUBMISSIONS]: (state, payload) => ({
    ...state,
    loading: false,
    jobSubmissions: mergeDeepWith(unionArrays, state.jobSubmissions, payload),
  }),
  [UPDATE_HRS]: (state, payload) => ({
    ...state,
    hrs: union(state.hrs, payload),
  }),
  [REMOVE_RECRUITMENT_JOB_SUBMISSION]: (state, payload) => ({
    ...state,
    jobSubmissions: dissoc(payload, state.jobSubmissions),
  }),
}

export default (state, action) => bindReducer(state, action, recruitment, initialState)
