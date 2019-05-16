export const ADD_CANDIDATE = "ADD_CANDIDATE";
export const REMOVE_CANDIDATE = "REMOVE_CANDIDATE";
export const SET_CANDIDATES = "SET_CANDIDATES";

export const addCandidate = (board, jobSubmissionId) => ({
  type: ADD_CANDIDATE,
  payload: { board, jobSubmissionId }
});
export const removeCandidate = candidateId => ({
  type: REMOVE_CANDIDATE,
  payload: candidateId
});
export const setCandidates = candidates => ({
  type: SET_CANDIDATES,
  payload: candidates
});
