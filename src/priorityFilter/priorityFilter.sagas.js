import { all, put, select, takeEvery } from "redux-saga/effects";
import { path, pathOr, prop, propOr } from "ramda";
import {
  UPDATE_PRIORITY_FILTER,
  setPriorityFilter
} from "./priorityFilter.actions";

export const getStateFilter = state =>
  pathOr({}, ["priorityFilter", "filter"], state);

export function* updatePriorityFilter(action) {
  const filter = prop("payload", action);
  yield put(setPriorityFilter(filter));

  // TODO: filter list dans clientCorporations: clientCorporations.[id].bmIds.[id]

  const stateFilter = yield select(getStateFilter);
}

export default function priorityFilterSagas() {
  return [takeEvery(UPDATE_PRIORITY_FILTER, updatePriorityFilter)];
}
