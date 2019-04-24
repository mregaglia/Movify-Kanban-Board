import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest
} from "redux-saga/effects";
import { path, pathOr, prop, propOr } from "ramda";
import {
  GET_KANBAN,
  GET_JOB_ORDERS,
  GET_JOB_SUBMISSIONS,
  UPDATE_JOB_SUBMISSION,
  updateKanban,
  getJobOrders as getJobOrdersAction,
  getJobSubmissions as getJobSubmissionsAction
} from "./kanban.actions";
import {
  getBusinessManagers,
  getJobOrders as getJobOrdersService,
  getJobSubmissions as getJobSubmissionsService
} from "./kanban.service";
import { formatJobSubmissions } from "../utils/kanban";

export const getKanban = state => pathOr([], ["kanban", "kanban"], state);

export function* getKanbanBoard() {
  try {
    const bms = yield call(getBusinessManagers);
    const bmList = yield call(propOr, [], "data", bms);
    yield put(updateKanban(bmList));
    yield all(bmList.map(bm => put(getJobOrdersAction(prop("id", bm)))));
  } catch (e) {
    //
  }
}

const groupByClientCorporations = jobOrders =>
  jobOrders.reduce((acc, jobOrder) => {
    const clientCorporationIndex = acc.findIndex(
      clientCorporation =>
        prop("id", clientCorporation) ===
        path(["clientCorporation", "id"], jobOrder)
    );

    if (clientCorporationIndex >= 0) {
      acc[clientCorporationIndex].jobOrders.push(jobOrder);
    } else {
      acc.push({
        ...jobOrder.clientCorporation,
        jobOrders: [jobOrder]
      });
    }

    return acc;
  }, []);

export function* getJobOrders(action) {
  const bmId = action.payload;
  try {
    const jobOrders = yield call(getJobOrdersService, bmId);
    const jobOrderList = yield call(propOr, [], "data", jobOrders);
    const clientCorporations = yield call(
      groupByClientCorporations,
      jobOrderList
    );
    const kanban = yield select(getKanban);
    const updatedKanban = kanban.map(bm => {
      if (bm.id === bmId) {
        return { ...bm, clientCorporations };
      } else return { ...bm };
    });
    yield put(updateKanban(updatedKanban));
    yield all(
      jobOrderList.map(jobOrder =>
        put(
          getJobSubmissionsAction(
            bmId,
            path(["clientCorporation", "id"], jobOrder),
            prop("id", jobOrder)
          )
        )
      )
    );
  } catch (e) {
    //
  }
}

export function* getJobSubmissions(action) {
  const {
    payload: { bmId, clientCorporationId, jobOrderId }
  } = action;
  try {
    const jobSubmissionsResponse = yield call(
      getJobSubmissionsService,
      jobOrderId
    );
    const jobSubmissionList = yield call(
      propOr,
      [],
      "data",
      jobSubmissionsResponse
    );
    const jobSubmissions = yield call(formatJobSubmissions, jobSubmissionList);
    const kanban = yield select(getKanban);
    const updatedKanban = kanban.map(bm => {
      if (bm.id === bmId) {
        const clientCorporations = propOr([], "clientCorporations", bm).map(
          clientCorporation => {
            if (clientCorporation.id === clientCorporationId) {
              const jobOrders = propOr([], "jobOrders", clientCorporation).map(
                jobOrder => {
                  if (jobOrder.id === jobOrderId) {
                    return { ...jobOrder, jobSubmissions };
                  } else {
                    return { ...jobOrder };
                  }
                }
              );
              return { ...clientCorporation, jobOrders };
            } else return { ...clientCorporation };
          }
        );
        return { ...bm, clientCorporations };
      } else return { ...bm };
    });
    yield put(updateKanban(updatedKanban));
  } catch (e) {
    //
  }
}

export function* updateJobSubmission(action) {
  const {
    payload: {
      srcStatus,
      bmId,
      clientCorporationId,
      jobOrderId,
      jobSubmissionId,
      status
    }
  } = action;
  const kanban = yield select(getKanban);

  const updatedKanban = kanban.map(bm => {
    if (bm.id.toString() === bmId) {
      const clientCorporations = propOr([], "clientCorporations", bm).map(
        clientCorporation => {
          if (clientCorporation.id.toString() === clientCorporationId) {
            const jobOrders = propOr([], "jobOrders", clientCorporation).map(
              jobOrder => {
                if (jobOrder.id.toString() === jobOrderId) {
                  const prevJobSubmissions = propOr(
                    {},
                    "jobSubmissions",
                    jobOrder
                  );
                  const srcStatusjobSubmissions = propOr(
                    [],
                    srcStatus,
                    prevJobSubmissions
                  );
                  const jobSubmission = srcStatusjobSubmissions.find(
                    js => js.id === jobSubmissionId
                  );

                  const jobSubmissions = {
                    ...prevJobSubmissions,
                    [srcStatus]: srcStatusjobSubmissions.filter(
                      js => js.id !== jobSubmissionId
                    ),
                    [status]: propOr([], status, prevJobSubmissions).concat({
                      ...jobSubmission,
                      status
                    })
                  };

                  return { ...jobOrder, jobSubmissions };
                } else return { ...jobOrder };
              }
            );
            return { ...clientCorporation, jobOrders };
          } else return { ...clientCorporation };
        }
      );
      return { ...bm, clientCorporations };
    } else return { ...bm };
  });

  yield put(updateKanban(updatedKanban));
}

export default function kanbanSagas() {
  return [
    takeLatest(GET_KANBAN, getKanbanBoard),
    takeEvery(GET_JOB_ORDERS, getJobOrders),
    takeEvery(GET_JOB_SUBMISSIONS, getJobSubmissions),
    takeEvery(UPDATE_JOB_SUBMISSION, updateJobSubmission)
  ];
}
