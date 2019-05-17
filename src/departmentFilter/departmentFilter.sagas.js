import { all, put, select, takeEvery } from "redux-saga/effects";
import { path, pathOr, prop, propOr } from "ramda";
import {
  UPDATE_DEPARTMENT_FILTER,
  setDepartmentFilter,
  setFilteredBms,
  setFilteredCcs
} from "./departmentFilter.actions";

export const getStateFilter = state =>
  pathOr({}, ["departmentFilter", "filter"], state);
export const getStateKanbanBms = state => pathOr({}, ["kanban", "bms"], state);
export const getStateKanbanBmIds = state =>
  pathOr([], ["kanban", "bmList"], state);
export const getStateClientCorporations = state =>
  pathOr({}, ["recruitment", "clientCorporations"], state);
export const getStateClientCorporationIds = state =>
  pathOr([], ["recruitment", "clientList"], state);

export function* updateDepartmentFilter(action) {
  const filter = prop("payload", action);
  yield put(setDepartmentFilter(filter));

  const stateFilter = yield select(getStateFilter);
  const stateBms = yield select(getStateKanbanBms);
  const stateBmIds = yield select(getStateKanbanBmIds);

  const kanbanBms = yield all(
    stateBmIds.filter(bmId => {
      const departmentName = path(
        [bmId, "primaryDepartment", "name"],
        stateBms
      );
      return propOr(false, departmentName, stateFilter);
    })
  );
  yield put(setFilteredBms(kanbanBms));

  const stateCcs = yield select(getStateClientCorporations);
  const stateCcIds = yield select(getStateClientCorporationIds);

  const recruitmentCcs = yield all(
    stateCcIds.filter(ccId => {
      const departmentName = path([ccId, "department", "name"], stateCcs);
      return propOr(false, departmentName, stateFilter);
    })
  );
  yield put(setFilteredCcs(recruitmentCcs));
}

export default function departmentFilterSagas() {
  return [takeEvery(UPDATE_DEPARTMENT_FILTER, updateDepartmentFilter)];
}
