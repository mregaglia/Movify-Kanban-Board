import { all, call, put } from 'redux-saga/effects'

import { searchCandidates } from '../../kanban/kanban.service'
import { GET_CANDIDATE_SUGGESTIONS, setSuggestions } from '../addCandidate.actions'
import { getCandidateSuggestions } from '../addCandidate.sagas'

describe('getCandidateSuggestions saga', () => {
  describe('getCandidateSuggestions saga with empty query', () => {
    const action = { type: GET_CANDIDATE_SUGGESTIONS }
    const generator = getCandidateSuggestions(action)

    it('should put setSuggestions with empty array', () => {
      expect(generator.next().value).toEqual(put(setSuggestions([])))
    })
    it('should be done', () => {
      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })
  describe('getCandidateSuggestions saga with success', () => {
    const query = 'query'
    const action = { type: GET_CANDIDATE_SUGGESTIONS, payload: query }
    const suggestions = [{ id: 1, firstName: 'Cand', lastName: 'Idate' }]
    const candidatesResponse = { data: suggestions }
    const generator = getCandidateSuggestions(action)

    it('should call searchCandidates service', () => {
      expect(generator.next().value).toEqual(call(searchCandidates, query))
    })
    it('should get suggestions from response', () => {
      expect(generator.next(candidatesResponse).value).toEqual(all(suggestions))
    })
    it('should put setSuggestions with empty array', () => {
      expect(generator.next(suggestions).value).toEqual(put(setSuggestions(suggestions)))
    })
    it('should be done', () => {
      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })
  describe('getCandidateSuggestions saga with error', () => {
    const query = 'query'
    const action = { type: GET_CANDIDATE_SUGGESTIONS, payload: query }
    const generator = getCandidateSuggestions(action)

    it('should call searchCandidates service', () => {
      expect(generator.next().value).toEqual(call(searchCandidates, query))
    })
    it('should put setSuggestions with empty array', () => {
      expect(generator.throw().value).toEqual(put(setSuggestions([])))
    })
    it('should be done', () => {
      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })
})
