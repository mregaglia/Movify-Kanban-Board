import { put, select, takeEvery } from "redux-saga/effects";
import { pathOr, prop, propOr } from "ramda";
import {
  UPDATE_PRIORITY_FILTER,
  setPriorityFilter
} from "./priorityFilter.actions";
import { updateFilteredJobOrdersInCCS } from "../kanban/kanban.actions";

export const getStateFilter = state =>
  pathOr({}, ["priorityFilter", "filter"], state);

const getClientCorporations = state =>
  pathOr({}, ["kanban", "clientCorporations"], state);

export const filterJobOrdersPerPriority = (jobOrders, priorityFilters) =>
  jobOrders.filter(jobOrder => propOr(false, prop("employmentType", jobOrder), priorityFilters));

export function* updatePriorityFilter(action) {
  const filter = prop("payload", action);
  yield put(setPriorityFilter(filter));

  const stateFilter = yield select(getStateFilter);
  const ccs = yield select(getClientCorporations);

  yield put(setPriorityFilter(filter));

  const clientCorporations = Object.keys(ccs).reduce((acc, ccId) => {
    const bmIds = pathOr([], [ccId, "bmIds"], ccs);

    acc[ccId] = {
      bmIds: Object.keys(bmIds).reduce((bmAcc, bmId) => {
        const jobOrders = pathOr([], [ccId, "bmIds", bmId, "jobOrders"], ccs);

        bmAcc[bmId] = {
          filteredJobOrders: filterJobOrdersPerPriority(jobOrders, stateFilter)
        }
        return bmAcc;
      }, {})
    }
    return acc;
  }, {});

  yield put(updateFilteredJobOrdersInCCS(clientCorporations))
}

export default function priorityFilterSagas() {
  return [takeEvery(UPDATE_PRIORITY_FILTER, updatePriorityFilter)];
}
