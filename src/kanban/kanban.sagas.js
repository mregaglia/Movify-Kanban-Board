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
  setBms,
  setClientCorporations,
  getJobOrders as getJobOrdersAction,
  setJobOrders,
  getJobSubmissions as getJobSubmissionsAction,
  setJobSubmissions
} from "./kanban.actions";
import {
  getBusinessManagers,
  getJobOrders as getJobOrdersService,
  getJobSubmissions as getJobSubmissionsService
} from "./kanban.service";

export const getKanban = state => pathOr([], ["kanban", "kanban"], state);
export const getStateBms = state => pathOr([], ["kanban", "bms"], state);
export const getStateClientCorporations = state =>
  pathOr([], ["kanban", "clientCorporations"], state);
export const getStateJobOrders = state =>
  pathOr([], ["kanban", "jobOrders"], state);
export const getStateJobSubmissions = state =>
  pathOr([], ["kanban", "jobSubmissions"], state);

export function* getKanbanBoard() {
  try {
    const bmsResponse = yield call(getBusinessManagers);
    const bmList = yield call(propOr, [], "data", bmsResponse);
    const bms = yield all(
      bmList.reduce(
        (acc, bm) => ({ ...acc, [bm.id]: { ...bm, clientCorporations: [] } }),
        {}
      )
    );
    yield put(setBms(bms));
    yield all(bmList.map(bm => put(getJobOrdersAction(prop("id", bm)))));
  } catch (e) {
    //
  }
}

function* getClientCorporations(bmId, jobOrders) {
  const stateBms = yield select(getStateBms);
  const bms = { ...stateBms };
  const joClientCorporations = yield all(
    jobOrders.map(jo => prop("clientCorporation", jo))
  );

  const clientCorporations = yield all(
    joClientCorporations.reduce((acc, jocc) => {
      if (!bms[bmId].clientCorporations.find(cc => cc.id === jocc.id))
        bms[bmId].clientCorporations.push(jocc.id);

      const clientCorporation = prop(jocc.id, clientCorporations);
      if (clientCorporation) {
        if (!clientCorporation.bmIds.bmId)
          acc[jocc.id] = {
            ...jocc,
            bmIds: { ...clientCorporation.bmIds, [bmId]: [] }
          };
        else
          acc[jocc.id] = {
            ...clientCorporation
          };
      } else {
        acc[jocc.id] = { ...jocc, bmIds: { [bmId]: [] } };
      }
      return acc;
    }, {})
  );

  const stateClientCorporations = yield select(getStateClientCorporations);
  yield put(
    setClientCorporations({ ...stateClientCorporations, ...clientCorporations })
  );
  yield put(setBms(bms));
}

export function* getJobOrders(action) {
  const bmId = action.payload;
  try {
    const jobOrdersResponse = yield call(getJobOrdersService, bmId);
    const jobOrderList = yield call(propOr, [], "data", jobOrdersResponse);

    yield getClientCorporations(bmId, jobOrderList);

    const stateClientCorporations = yield select(getStateClientCorporations);
    const clientCorporations = { ...stateClientCorporations };

    const jobOrders = yield all(
      jobOrderList.reduce((acc, jobOrder) => {
        const ccId = path(["clientCorporation", "id"], jobOrder);

        clientCorporations[ccId].bmIds[bmId].push(jobOrder.id);

        acc[jobOrder.id] = {
          ...jobOrder,
          bmId,
          clientCorporationId: ccId,
          jobSubmissions: []
        };
        return acc;
      }, {})
    );

    const stateJobOrders = yield select(getStateJobOrders);
    yield put(setJobOrders({ ...stateJobOrders, ...jobOrders }));
    yield put(setClientCorporations(clientCorporations));

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
    const stateJobOrders = yield select(getStateJobOrders);
    const jobOrders = { ...stateJobOrders };

    const jobSubmissionsResponse = yield call(
      getJobSubmissionsService,
      jobOrderId
    );

    const jobSubmissions = yield all(
      propOr([], "data", jobSubmissionsResponse).reduce((acc, js) => {
        jobOrders[jobOrderId].jobSubmissions.push(js.id);

        acc[js.id] = {
          ...js,
          bmId,
          clientCorporationId,
          jobOrderId
        };
        return acc;
      }, {})
    );

    const stateJobSubmissions = yield select(getStateJobSubmissions);
    yield put(setJobSubmissions({ ...stateJobSubmissions, ...jobSubmissions }));
    yield put(setJobOrders(jobOrders));
  } catch (e) {
    //
  }
}

export function* updateJobSubmission(action) {
  const {
    payload: { jobSubmissionId, status }
  } = action;

  const stateJobSubmissions = yield select(getStateJobSubmissions);
  const jobSubmission = stateJobSubmissions[jobSubmissionId];
  const jobSubmissions = {
    ...stateJobSubmissions,
    [jobSubmissionId]: {
      ...jobSubmission,
      status
    }
  };

  yield put(setJobSubmissions(jobSubmissions));
}

export default function kanbanSagas() {
  return [
    takeLatest(GET_KANBAN, getKanbanBoard),
    takeEvery(GET_JOB_ORDERS, getJobOrders),
    takeEvery(GET_JOB_SUBMISSIONS, getJobSubmissions),
    takeEvery(UPDATE_JOB_SUBMISSION, updateJobSubmission)
  ];
}
