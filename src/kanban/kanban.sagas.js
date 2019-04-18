import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest
} from "redux-saga/effects";
import { pathOr, prop, propOr } from "ramda";
import {
  GET_KANBAN,
  GET_JOB_ORDERS,
  GET_JOB_SUBMISSIONS,
  updateKanban,
  getJobOrders as getJobOrdersAction,
  getJobSubmissions as getJobSubmissionsAction
} from "./kanban.actions";
import {
  getBusinessManagers,
  getJobOrders as getJobOrdersService,
  getJobSubmissions as getJobSubmissionsService
} from "./kanban.service";

export const getKanban = state => pathOr([], ["kanban", "kanban"], state);

export function* getKanbanBoard() {
  try {
    console.log("here");
    const bms = yield call(getBusinessManagers);
    console.log("bms", bms);
    yield put(updateKanban(bms));
    yield all(bms.map(bm => put(getJobOrdersAction(prop("id", bm)))));
  } catch (e) {
    //
  }
}

export function* getJobOrders(action) {
  const bmId = action.payload;
  try {
    const jobOrders = yield call(getJobOrdersService, bmId);
    const kanban = yield select(getKanban);
    const updatedKanban = kanban.map(bm => {
      if (bm.id === bmId) {
        return { ...bm, jobOrders };
      } else return { ...bm };
    });
    yield put(updateKanban(updatedKanban));
    yield all(
      jobOrders.map(jobOrder =>
        put(getJobSubmissionsAction(bmId, prop("id", jobOrder)))
      )
    );
  } catch (e) {
    //
  }
}

export function* getJobSubmissions(action) {
  const {
    payload: { bmId, jobOrderId }
  } = action;
  try {
    const jobSubmissions = yield call(getJobSubmissionsService, jobOrderId);
    const kanban = yield select(getKanban);
    const updatedKanban = kanban.map(bm => {
      if (bm.id === bmId) {
        return propOr([], "jobOrders", bm).map(jobOrder => {
          if (jobOrder.id === jobOrderId) {
            return { ...jobOrder, jobSubmissions };
          } else return { ...jobOrder };
        });
      } else return { ...bm };
    });
    yield put(updateKanban(updatedKanban));
  } catch (e) {
    //
  }
}

export default function kanbanSagas() {
  return [
    takeLatest(GET_KANBAN, getKanbanBoard),
    takeEvery(GET_JOB_ORDERS, getJobOrders),
    takeEvery(GET_JOB_SUBMISSIONS, getJobSubmissions)
  ];
}
