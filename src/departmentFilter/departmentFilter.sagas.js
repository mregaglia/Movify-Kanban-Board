import { all, put, select, takeEvery } from "redux-saga/effects";
import { path, pathOr, prop, propOr } from "ramda";
import {
  UPDATE_DEPARTMENT_FILTER,
  setDepartmentFilter,
  setFilteredBms
} from "./departmentFilter.actions";

export const getStateFilter = state =>
  pathOr({}, ["departmentFilter", "filter"], state);
export const getStateBms = state => pathOr({}, ["kanban", "bms"], state);
export const getStateBmIds = state => pathOr([], ["kanban", "bmList"], state);

export function* updateDepartmentFilter(action) {
  const filter = prop("payload", action);
  yield put(setDepartmentFilter(filter));

  const stateFilter = yield select(getStateFilter);
  const stateBms = yield select(getStateBms);
  const stateBmIds = yield select(getStateBmIds);

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
}

export default function departmentFilterSagas() {
  return [takeEvery(UPDATE_DEPARTMENT_FILTER, updateDepartmentFilter)];
}
