export const ADD_CANDIDATE = 'ADD_CANDIDATE'
export const ADD_HOT_CANDIDATE = 'ADD_HOT_CANDIDATE'
export const REMOVE_CANDIDATE = 'REMOVE_CANDIDATE'
export const REMOVE_HOT_CANDIDATE = 'REMOVE_HOT_CANDIDATE'
export const SET_CANDIDATES = 'SET_CANDIDATES'
export const SET_HOT_CANDIDATES = 'SET_HOT_CANDIDATES'

export const addCandidate = (board, jobSubmissionId) => ({
  type: ADD_CANDIDATE,
  payload: { board, jobSubmissionId },
})
export const addHotCandidate = (board, candidateId) => ({
  type: ADD_HOT_CANDIDATE,
  payload: { board, candidateId },
})
export const removeCandidate = (candidateId) => ({
  type: REMOVE_CANDIDATE,
  payload: candidateId,
})
export const removeHotCandidate = (candidateId) => ({
  type: REMOVE_HOT_CANDIDATE,
  payload: candidateId,
})
export const setCandidates = (candidates) => ({
  type: SET_CANDIDATES,
  payload: candidates,
})
export const setHotCandidates = (candidates) => ({
  type: SET_HOT_CANDIDATES,
  payload: candidates,
})
