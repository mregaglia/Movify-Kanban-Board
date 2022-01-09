import { bindReducer } from '../utils/reducer'

import { SET_PRIORITY_FILTER } from './priorityFilter.actions'

export const initialState = {
  filter: {
    P1: true,
    P2: true,
    P3: true,
    P4: true,
  },
}

const priorityFilter = {
  [SET_PRIORITY_FILTER]: (state, payload) => ({
    ...state,
    filter: { ...state.filter, ...payload },
  }),
}

export default (state, action) => bindReducer(state, action, priorityFilter, initialState)
