import {
  GET_CANDIDATE_SUGGESTIONS,
  getSuggestions,
  SET_CANDIDATE_SUGGESTIONS,
  setSuggestions,
} from '../addCandidate.actions'

describe('getSuggestions action', () => {
  it('should create a GET_CANDIDATE_SUGGESTIONS action', () => {
    const query = 'query'
    const action = getSuggestions(query)
    const expectedAction = { type: GET_CANDIDATE_SUGGESTIONS, payload: query }
    expect(action).toEqual(expectedAction)
  })
})

describe('setSuggestions action', () => {
  it('should create a SET_CANDIDATE_SUGGESTIONS action', () => {
    const suggestions = [{ id: 1, firstName: 'Candida', lastName: 'te' }]
    const action = setSuggestions(suggestions)
    const expectedAction = {
      type: SET_CANDIDATE_SUGGESTIONS,
      payload: suggestions,
    }
    expect(action).toEqual(expectedAction)
  })
})
