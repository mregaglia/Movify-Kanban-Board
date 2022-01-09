export const SET_PRIORITY_FILTER = 'SET_PRIORITY_FILTER'
export const UPDATE_PRIORITY_FILTER = 'UPDATE_PRIORITY_FILTER'

export const updatePriorityFilter = (filter) => ({
  type: UPDATE_PRIORITY_FILTER,
  payload: filter,
})
export const setPriorityFilter = (filter) => ({
  type: SET_PRIORITY_FILTER,
  payload: filter,
})
