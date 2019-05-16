import {
  all,
  call,
  put,
  select,
  takeLatest,
  takeEvery
} from "redux-saga/effects";
import { path, pathOr, prop, propOr } from "ramda";
import { toast } from "react-toastify";
import en from "../lang/en";
import {
  GET_RECRUITMENT,
  updateClientCorporationsIds,
  updateClientCorporations,
  getJobOrders as getJobOrdersAction,
  updateJobOrders,
  getJobSubmissions as getJobSubmissionsAction,
  updateJobSubmissions,
  GET_RECRUITMENT_JOB_SUBMISSIONS,
  GET_RECRUITMENT_JOB_ORDERS,
  updateHrs,
  UPDATE_RECRUITMENT_JOB_SUBMISSION,
  setJobOrders,
  setJobSubmissions
} from "./recruitment.actions";
import {
  getTalentAcquisitionManagers,
  getJobSubmissions as getJobSubmissionsService,
  updateJobSubmission as updateJobSubmissionService,
  getCandidate
} from "./recruitment.service";
import { getJobOrders as getJobOrdersService } from "../kanban/kanban.service";

export const getStateJobSubmissions = state =>
  pathOr({}, ["recruitment", "jobSubmissions"], state);
export const getStateJobOrders = state =>
  pathOr({}, ["recruitment", "jobOrders"], state);
export const getStateJobOrder = (state, jobOrderId) =>
  pathOr({}, ["recruitment", "jobOrders", jobOrderId], state);

export function* getRecruitment() {
  yield call(getTams);
}

export function* getTams(start = 0) {
  try {
    const tamsResponse = yield call(getTalentAcquisitionManagers, start);
    const tamList = yield call(propOr, [], "data", tamsResponse);

    yield all(tamList.map(tam => put(getJobOrdersAction(prop("id", tam)))));

    if (propOr(0, "count", tamsResponse) > 0)
      yield call(
        getTalentAcquisitionManagers,
        propOr(0, "start", tamsResponse) + propOr(0, "count", tamsResponse)
      );
  } catch (e) {
    //
  }
}

export function* getClientCorporations(tamId, jobOrders) {
  const ccList = [];
  const clientCorporations = yield all(
    jobOrders.reduce((acc, jo) => {
      const cc = prop("clientCorporation", jo);
      ccList.push(prop("id", cc));

      const jos = pathOr([], [prop("id", cc), "jobOrders"], acc).concat(
        prop("id", jo)
      );

      acc[prop("id", cc)] = {
        ...cc,
        jobOrders: jos
      };

      return acc;
    }, {})
  );

  yield put(updateClientCorporations(clientCorporations));
  yield put(updateClientCorporationsIds(ccList));
}

export function* getJobOrders(action, start = 0) {
  const tamId = prop("payload", action);
  try {
    const jobOrdersResponse = yield call(getJobOrdersService, tamId, start);
    const jobOrderList = yield call(propOr, [], "data", jobOrdersResponse);

    yield call(getClientCorporations, tamId, jobOrderList);

    const jobOrders = yield all(
      jobOrderList.reduce((acc, jo) => {
        acc[prop("id", jo)] = { ...jo, jobSubmissions: {} };
        return acc;
      }, {})
    );

    yield put(updateJobOrders(jobOrders));

    yield all(
      jobOrderList.map(jobOrder =>
        put(
          getJobSubmissionsAction(
            prop("id", jobOrder),
            path(["clientCorporation", "id"], jobOrder)
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
  const { joId, ccId } = prop("payload", action);
  try {
    const jobSubmissionsResponse = yield call(
      getJobSubmissionsService,
      joId,
      start
    );
    const jsList = propOr([], "data", jobSubmissionsResponse);

    const jobOrders = {};
    const hrs = [];
    const jobSubmissions = yield all(
      jsList.reduce((acc, js) => {
        acc[prop("id", js)] = {
          ...js,
          clientCorporationId: ccId
        };

        const joId = path(["jobOrder", "id"], js);
        const jojss = pathOr(
          [],
          [joId, "jobSubmissions", js.status],
          jobOrders
        ).concat([js.id]);
        jobOrders[joId] = {
          jobSubmissions: {
            ...pathOr({}, [joId, "jobSubmissions"], jobOrders),
            [js.status]: jojss
          }
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

      const hr = prop("owner", candidate);
      if (hr) hrs.push(hr);
    }

    yield put(updateJobSubmissions(jobSubmissions));
    yield put(updateJobOrders(jobOrders));
    yield put(updateHrs(hrs));
  } catch (e) {
    //
  }
}

export function* updateJobSubmission(action) {
  const {
    payload: { prevStatus, jobSubmissionId, jobOrderId, status }
  } = action;
  try {
    yield call(updateStateJobSubmission, action);
    yield call(updateJobSubmissionService, jobSubmissionId, status, jobOrderId);
    yield call(toast.success, en.UPDATE_STATUS_SUCCESS);
  } catch (e) {
    yield call(updateStateJobSubmission, {
      ...action,
      payload: { ...action.payload, status: prevStatus, prevStatus: status }
    });
    yield call(toast.error, en.UPDATE_STATUS_ERROR);
  }
}

export function* updateStateJobSubmission(action) {
  const {
    payload: { prevJobOrderId, jobOrderId, prevStatus, jobSubmissionId, status }
  } = action;

  const stateNewJobOrder = yield select(getStateJobOrder, jobOrderId);
  const stateJobSubmissions = yield select(getStateJobSubmissions);
  const jobSubmission = stateJobSubmissions[jobSubmissionId];
  const jobSubmissions = {
    ...stateJobSubmissions,
    [jobSubmissionId]: {
      ...jobSubmission,
      status,
      jobOrder: {
        id: prop("id", stateNewJobOrder),
        title: prop("title", stateNewJobOrder)
      }
    }
  };

  yield put(setJobSubmissions(jobSubmissions));

  const statePrevJobOrder = yield select(getStateJobOrder, prevJobOrderId);
  const prevJojss = {
    ...prop("jobSubmissions", statePrevJobOrder),
    [prevStatus]: pathOr(
      [],
      ["jobSubmissions", prevStatus],
      statePrevJobOrder
    ).filter(jsId => jsId !== jobSubmissionId)
  };
  const prevJobOrder = {
    [prevJobOrderId]: {
      ...statePrevJobOrder,
      jobSubmissions: prevJojss
    }
  };

  const stateJobOrders1 = yield select(getStateJobOrders);
  yield put(setJobOrders({ ...stateJobOrders1, ...prevJobOrder }));

  const stateJobOrder = yield select(getStateJobOrder, jobOrderId);
  const jojss = {
    ...prop("jobSubmissions", stateJobOrder),
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

  const stateJobOrders2 = yield select(getStateJobOrders);
  yield put(setJobOrders({ ...stateJobOrders2, ...jobOrder }));
}

export default function kanbanSagas() {
  return [
    takeLatest(GET_RECRUITMENT, getRecruitment),
    takeEvery(GET_RECRUITMENT_JOB_ORDERS, getJobOrders),
    takeEvery(GET_RECRUITMENT_JOB_SUBMISSIONS, getJobSubmissions),
    takeEvery(UPDATE_RECRUITMENT_JOB_SUBMISSION, updateJobSubmission)
  ];
}
