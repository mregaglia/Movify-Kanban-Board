import { all, put, select, takeEvery } from "redux-saga/effects";
import { pathOr, prop, propOr } from "ramda";
import {
  ADD_CANDIDATE,
  ADD_HOT_CANDIDATE,
  REMOVE_CANDIDATE,
  setCandidates,
  setHotCandidates,
} from "./transition.actions";

const getHotCandidates = ({ transition }) => transition?.hotCandidates ?? []

export const getStateCandidates = state =>
  pathOr([], ["transition", "candidates"], state);

export const getStateJobSubmission = (state, board, jobSubmissionId) =>
  pathOr({}, [board, "jobSubmissions", jobSubmissionId], state);

export function* addCandidate(action) {
  const { board, jobSubmissionId } = prop("payload", action);
  const jobSubmission = yield select(
    getStateJobSubmission,
    board,
    jobSubmissionId
  );
  const candidate = propOr({}, "candidate", jobSubmission);
  const stateCandidates = yield select(getStateCandidates);
  if (!stateCandidates.find(c => prop("id", c) === prop("id", candidate)))
    stateCandidates.push(candidate);
  yield put(setCandidates([...stateCandidates]));
}

export function* addHotCandidate(action) {
  const { candidateId } = action?.payload

  let hotCandidates = yield select(getHotCandidates)
  hotCandidates = [...new Set([...hotCandidates, candidateId])]

  yield put(setHotCandidates(hotCandidates));
}

export function* removeCandidate(action) {
  const candidate = prop("payload", action);
  const stateCandidates = yield select(getStateCandidates);

  const candidates = yield all(
    stateCandidates.filter(c => prop("id", c) !== prop("id", candidate))
  );

  yield put(setCandidates(candidates));
}

export default function transitionSagas() {
  return [
    takeEvery(ADD_CANDIDATE, addCandidate),
    takeEvery(ADD_HOT_CANDIDATE, addHotCandidate),
    takeEvery(REMOVE_CANDIDATE, removeCandidate)
  ];
}
