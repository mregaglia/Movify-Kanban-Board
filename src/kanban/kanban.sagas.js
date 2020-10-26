import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest
} from "redux-saga/effects";
import { ascend, dissoc, path, pathOr, prop, propOr, sortWith } from "ramda";
import { toast } from "react-toastify";
import {
  GET_KANBAN,
  GET_JOB_ORDERS,
  GET_JOB_SUBMISSIONS,
  UPDATE_JOB_SUBMISSION,
  CREATE_JOB_SUBMISSION,
  DELETE_JOB_SUBMISSION,
  updateBms,
  updateClientCorporations,
  getJobOrders as getJobOrdersAction,
  setJobOrders,
  updateJobOrders,
  getJobSubmissions as getJobSubmissionsAction,
  setJobSubmissions,
  updateJobSubmissions,
  setBms,
  removeJobSubmission
} from "./kanban.actions";
import { updatePriorityFilter } from "../priorityFilter/priorityFilter.actions";
import {
  getBusinessManagers,
  getJobOrders as getJobOrdersService,
  getJobSubmissions as getJobSubmissionsService,
  updateJobSubmissionStatus as updateJobSubmissionStatusService,
  createJobSubmission as createJobSubmissionService,
  getJobSubmission,
  deleteJobSubmission as deleteJobSubmissionService
} from "./kanban.service";
import { getCandidate } from "../recruitment/recruitment.service";
import en from "../lang/en";
import { getStateFilter } from "../priorityFilter/priorityFilter.sagas";

export const getStateBms = state => pathOr([], ["kanban", "bmList"], state);
export const getStateJobOrder = (state, joId) =>
  pathOr({}, ["kanban", "jobOrders", joId], state);
export const getStateJobOrders = state =>
  pathOr([], ["kanban", "jobOrders"], state);
export const getStateJobSubmissions = state =>
  pathOr([], ["kanban", "jobSubmissions"], state);

export function* getKanbanBoard() {
  yield call(getBms);
}

export function* getBms(start = 0) {
  try {
    const bmsResponse = yield call(getBusinessManagers, start);
    const bmList = yield call(propOr, [], "data", bmsResponse);
    const bms = yield all(
      bmList.reduce(
        (acc, bm) => ({ ...acc, [bm.id]: { ...bm, clientCorporations: [] } }),
        {}
      )
    );
    yield put(updateBms(bms));
    yield all(bmList.map(bm => put(getJobOrdersAction(prop("id", bm)))));

    const bmIds = yield all(bmList.map(bm => prop("id", bm)));
    const stateBms = yield select(getStateBms);
    yield put(setBms(stateBms.concat(bmIds)));
    yield put(updatePriorityFilter());

    if (propOr(0, "count", bmsResponse) > 0)
      yield call(
        getBms,
        propOr(0, "start", bmsResponse) + propOr(0, "count", bmsResponse)
      );
  } catch (e) {
    //
  }
}

export function* getClientCorporations(bmId, jobOrders) {
  const bms = {};
  const joClientCorporations = yield all(
    jobOrders.map(jo => prop("clientCorporation", jo))
  );

  const clientCorporations = yield all(
    joClientCorporations.reduce((acc, jocc) => {
      const joccId = prop("id", jocc);

      if (
        !pathOr([], [bmId, "clientCorporations"], bms).find(
          ccId => ccId === joccId
        )
      ) {
        const bmcc = pathOr([], [bmId, "clientCorporations"], bms).concat([
          joccId
        ]);
        bms[bmId] = { clientCorporations: bmcc };
      }

      const clientCorporation = prop(joccId, acc);
      if (!clientCorporation) {
        acc[joccId] = { ...jocc, bmIds: { [bmId]: { jobOrders: [] } } };
      }
      return acc;
    }, {})
  );

  yield put(updateClientCorporations(clientCorporations));
  yield put(updateBms(bms));
}

export function* getJobOrders(action, start = 0) {
  const bmId = action.payload;
  try {
    const jobOrdersResponse = yield call(getJobOrdersService, bmId, start);
    const jobOrderList = yield call(propOr, [], "data", jobOrdersResponse);

    yield call(getClientCorporations, bmId, jobOrderList);

    const clientCorporations = {};
    const stateFilter = yield select(getStateFilter);

    const jobOrders = yield all(
      jobOrderList.reduce((acc, jobOrder) => {
        const ccId = path(["clientCorporation", "id"], jobOrder);

        const ccjos = pathOr(
          [],
          [ccId, "bmIds", bmId, "jobOrders"],
          clientCorporations
        ).concat([{ id: jobOrder.id, employmentType: jobOrder.employmentType }]);
        const sortedCcjos = sortWith([ascend(prop("employmentType"))], ccjos);

        clientCorporations[ccId] = {
          bmIds: {
            [bmId]: {
              jobOrders: sortedCcjos,
              filteredJobOrders: sortedCcjos.filter(jobOrder =>
                propOr(false, prop("employmentType", jobOrder), stateFilter)
              )
            }
          }
        };

        acc[jobOrder.id] = {
          ...jobOrder,
          bmId,
          clientCorporationId: ccId,
          jobSubmissions: {}
        };
        return acc;
      }, {})
    );

    yield put(updateJobOrders(jobOrders));
    yield put(updateClientCorporations(clientCorporations));

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

    const newStart =
      propOr(0, "start", jobOrdersResponse) +
      propOr(0, "count", jobOrdersResponse);
    if (newStart < propOr(0, "total", jobOrdersResponse))
      yield call(getJobOrders, action, newStart);
  } catch (e) {
    //
  }
}

export function* getJobSubmissions(action, start = 0) {
  const {
    payload: { bmId, clientCorporationId, jobOrderId }
  } = action;
  try {
    const jobOrders = {};
    const jobSubmissionsResponse = yield call(
      getJobSubmissionsService,
      jobOrderId,
      start
    );

    const jsList = propOr([], "data", jobSubmissionsResponse);
    const jobSubmissions = yield all(
      jsList.reduce((acc, js) => {
        const jojss = pathOr(
          [],
          [jobOrderId, "jobSubmissions", js.status],
          jobOrders
        ).concat([js.id]);
        jobOrders[jobOrderId] = {
          jobSubmissions: {
            ...pathOr({}, [jobOrderId, "jobSubmissions"], jobOrders),
            [js.status]: jojss
          }
        };

        acc[js.id] = {
          ...js,
          bmId,
          clientCorporationId,
          jobOrderId
        };

        return acc;
      }, {})
    );

    for (let js of jsList) {
      const candidateResponse = yield call(
        getCandidate,
        path(["candidate", "id"], js)
      );
      const candidate = propOr({}, "data", candidateResponse);
      jobSubmissions[prop("id", js)].candidate = candidate;
    }

    yield put(updateJobSubmissions(jobSubmissions));
    yield put(updateJobOrders(jobOrders));

    const newStart =
      propOr(0, "start", jobSubmissionsResponse) +
      propOr(0, "count", jobSubmissionsResponse);
    if (newStart < propOr(0, "total", jobSubmissionsResponse))
      yield call(getJobSubmissions, action, newStart);
  } catch (e) {
    //
  }
}

export function* updateJobSubmission(action) {
  const {
    payload: { prevStatus, jobSubmissionId, status }
  } = action;
  try {
    yield call(updateJobSubmissionStatus, action);
    yield call(updateJobSubmissionStatusService, jobSubmissionId, status);
    yield call(toast.success, en.UPDATE_STATUS_SUCCESS);
  } catch (e) {
    yield call(updateJobSubmissionStatus, {
      ...action,
      payload: { ...action.payload, status: prevStatus, prevStatus: status }
    });
    yield call(toast.error, en.UPDATE_STATUS_ERROR);
  }
}

export function* updateJobSubmissionStatus(action) {
  const {
    payload: { jobOrderId, prevStatus, jobSubmissionId, status }
  } = action;

  const stateJobSubmissions = yield select(getStateJobSubmissions);
  const jobSubmission = stateJobSubmissions[jobSubmissionId];
  const jobSubmissions = {
    ...stateJobSubmissions,
    [jobSubmissionId]: {
      ...jobSubmission,
      status,
      dateLastModified: new Date().getTime()
    }
  };

  yield put(setJobSubmissions(jobSubmissions));

  const stateJobOrder = yield select(getStateJobOrder, jobOrderId);
  const jojss = {
    ...prop("jobSubmissions", stateJobOrder),
    [prevStatus]: pathOr(
      [],
      ["jobSubmissions", prevStatus],
      stateJobOrder
    ).filter(jsId => jsId !== jobSubmissionId),
    [status]: pathOr([], ["jobSubmissions", status], stateJobOrder).concat([
      jobSubmissionId
    ])
  };
  const jobOrder = {
    [jobOrderId]: {
      ...stateJobOrder,
      jobSubmissions: jojss
    }
  };

  const stateJobOrders = yield select(getStateJobOrders);
  yield put(setJobOrders({ ...stateJobOrders, ...jobOrder }));
}

export const createTempId = (jobOrder, jobSubmission) =>
  `temp${prop("id", jobOrder)}${path(["candidate", "id"], jobSubmission)}`;

export function* createJobSubmission(action) {
  const {
    payload: { jobOrder, jobSubmission, status }
  } = action;

  const tempJs = {
    id: createTempId(jobOrder, jobSubmission),
    candidate: prop("candidate", jobSubmission),
    jobOrder,
    sendingUser: { id: prop("bmId", jobOrder) },
    status,
    bmId: prop("bmId", jobOrder),
    clientCorporationId: prop("clientCorporationId", jobOrder),
    jobOrderId: prop("id", jobOrder)
  };

  try {
    yield call(addJobSubmission, tempJs);

    const js = {
      candidate: { id: path(["candidate", "id"], jobSubmission) },
      jobOrder: { id: prop("id", jobOrder) },
      sendingUser: { id: prop("bmId", jobOrder) },
      status
    };

    const putJobSubmissionResponse = yield call(createJobSubmissionService, js);
    const createdId = prop("changedEntityId", putJobSubmissionResponse);
    const jobSubmissionResponse = yield call(getJobSubmission, createdId);
    const newJobSubmission = {
      ...propOr({}, "data", jobSubmissionResponse),
      bmId: prop("bmId", jobOrder),
      clientCorporationId: prop("clientCorporationId", jobOrder),
      jobOrderId: prop("id", jobOrder)
    };
    yield call(addJobSubmission, newJobSubmission);
    yield call(toast.success, en.CREATE_CANDIDATE_SUCCESS);
  } catch (e) {
    yield call(removeTempJobSubmission, prop("id", tempJs));
    yield call(toast.error, en.CREATE_CANDIDATE_ERROR);
  }
}

export function* addJobSubmission(jobSubmission) {
  const jobSubmissionId = propOr("", "id", jobSubmission);
  const tempId = createTempId(prop("jobOrder", jobSubmission), jobSubmission);
  const stateJobSubmissions = yield select(getStateJobSubmissions);
  var jobSubmissions = {
    ...stateJobSubmissions,
    [jobSubmissionId]: jobSubmission
  };

  if (!jobSubmissionId.toString().includes("temp"))
    jobSubmissions = dissoc(tempId, jobSubmissions);

  yield put(setJobSubmissions(jobSubmissions));

  const jobOrderId = path(["jobOrder", "id"], jobSubmission);
  const stateJobOrder = yield select(getStateJobOrder, jobOrderId);
  const status = prop("status", jobSubmission);
  const jojss = {
    ...prop("jobSubmissions", stateJobOrder),
    [status]: pathOr([], ["jobSubmissions", status], stateJobOrder)
      .filter(joId => joId !== tempId)
      .concat([jobSubmissionId])
  };
  const jobOrder = {
    [jobOrderId]: {
      ...stateJobOrder,
      jobSubmissions: jojss
    }
  };

  const stateJobOrders = yield select(getStateJobOrders);
  yield put(setJobOrders({ ...stateJobOrders, ...jobOrder }));
}

export function* removeTempJobSubmission(jobSubmission) {
  const jobSubmissionId = prop("id", jobSubmission);
  const stateJobSubmissions = yield select(getStateJobSubmissions);
  const jobSubmissions = dissoc(jobSubmissionId, stateJobSubmissions);

  yield put(setJobSubmissions(jobSubmissions));

  const jobOrderId = path(["jobOrder", "id"], jobSubmission);
  const stateJobOrder = yield select(getStateJobOrder, jobOrderId);
  const status = prop("status", jobSubmission);
  const jojss = {
    ...prop("jobSubmissions", stateJobOrder),
    [status]: pathOr([], ["jobSubmissions", status], stateJobOrder).filter(
      jsId => jsId !== jobSubmissionId
    )
  };
  const jobOrder = {
    [jobOrderId]: {
      ...stateJobOrder,
      jobSubmissions: jojss
    }
  };

  const stateJobOrders = yield select(getStateJobOrders);
  yield put(setJobOrders({ ...stateJobOrders, ...jobOrder }));
}

export function* deleteJobSubmission(action) {
  const jobSubmission = prop("payload", action);
  const jobSubmissionId = prop("id", jobSubmission);
  const jobOrderId = path(["jobOrder", "id"], jobSubmission);
  const status = prop("status", jobSubmission);
  try {
    yield call(deleteJobSubmissionService, jobSubmissionId);
    yield put(removeJobSubmission(jobSubmissionId));

    const stateJobOrder = yield select(getStateJobOrder, jobOrderId);
    const jojss = {
      ...prop("jobSubmissions", stateJobOrder),
      [status]: pathOr([], ["jobSubmissions", status], stateJobOrder).filter(
        jsId => jsId !== jobSubmissionId
      )
    };
    const jobOrder = {
      [jobOrderId]: {
        ...stateJobOrder,
        jobSubmissions: jojss
      }
    };

    const stateJobOrders = yield select(getStateJobOrders);
    yield put(setJobOrders({ ...stateJobOrders, ...jobOrder }));

    yield call(toast.success, en.DELETE_JS_SUCCESS);
  } catch (e) {
    yield call(toast.error, en.DELETE_JS_ERROR);
  }
}

export default function kanbanSagas() {
  return [
    takeLatest(GET_KANBAN, getKanbanBoard),
    takeEvery(GET_JOB_ORDERS, getJobOrders),
    takeEvery(GET_JOB_SUBMISSIONS, getJobSubmissions),
    takeEvery(UPDATE_JOB_SUBMISSION, updateJobSubmission),
    takeEvery(CREATE_JOB_SUBMISSION, createJobSubmission),
    takeEvery(DELETE_JOB_SUBMISSION, deleteJobSubmission)
  ];
}
