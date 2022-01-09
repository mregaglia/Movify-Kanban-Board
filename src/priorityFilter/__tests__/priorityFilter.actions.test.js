import {
  SET_DEPARTMENT_FILTER,
  SET_FILTERED_BMS,
  setFilteredBms,
  setPriorityFilter,
  UPDATE_DEPARTMENT_FILTER,
  updatePriorityFilter,
} from '../priorityFilter.actions'

describe('updatePriorityFilter action', () => {
  it('should create UPDATE_DEPARTMENT_FILTER action', () => {
    const filter = { filter: true }
    expect(updatePriorityFilter(filter)).toEqual({
      type: UPDATE_DEPARTMENT_FILTER,
      payload: filter,
    })
  })
})

describe('setPriorityFilter action', () => {
  it('should create SET_DEPARTMENT_FILTER action', () => {
    const filter = { filter: true }
    expect(setPriorityFilter(filter)).toEqual({
      type: SET_DEPARTMENT_FILTER,
      payload: filter,
    })
  })
})

describe('setFilteredBms action', () => {
  it('should create SET_FILTERED_BMS action', () => {
    const bms = [1, 2, 3]
    expect(setFilteredBms(bms)).toEqual({
      type: SET_FILTERED_BMS,
      payload: bms,
    })
  })
})
