import { all, call, put, takeEvery } from "redux-saga/effects";
import { isEmpty, isNil, propOr } from "ramda";
import { searchCandidates } from "../kanban.service";
import {
  GET_CANDIDATE_SUGGESTIONS,
  setSuggestions
} from "./addCandidate.actions";

export function* getCandidateSuggestions(action) {
  const query = propOr("", "payload", action);
  if (isNil(query) || isEmpty(query)) yield put(setSuggestions([]));
  else {
    try {
      const candidateResponse = yield call(searchCandidates, query);
      const suggestions = yield all(propOr([], "data", candidateResponse));
      yield put(setSuggestions(suggestions));
    } catch (e) {
      yield put(setSuggestions([]));
    }
  }
}

export default function addCandidateSagas() {
  return [takeEvery(GET_CANDIDATE_SUGGESTIONS, getCandidateSuggestions)];
}
