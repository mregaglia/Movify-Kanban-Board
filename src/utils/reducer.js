import { has, prop } from 'ramda'

export const bindReducer = (state, action, reducer, initialState) => {
  if (state === undefined) return initialState

  if (prop('type', action) && has(action.type, reducer)) return reducer[action.type](state, prop('payload', action))

  return state
}
