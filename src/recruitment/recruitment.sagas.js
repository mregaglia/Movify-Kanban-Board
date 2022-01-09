import { toast } from 'react-toastify'
import { path, pathOr, prop, propOr } from 'ramda'
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import {
  deleteJobSubmission as deleteJobSubmissionKanban,
  getStateJobSubmissions as getStateJobSubmissionsKanban,
} from '../kanban/kanban.sagas'
import {
  createJobSubmission as createJobSubmissionService,
  deleteJobSubmission as deleteJobSubmissionService,
  getJobOrders as getJobOrdersService,
  getJobSubmission,
} from '../kanban/kanban.service'
import en from '../lang/en'
import { DECISION_NO_GO, getDecisionFromClient, STATUS_NO_GO } from '../utils/kanban'

import {
  CREATE_RECRUITMENT_JOB_SUBMISSION,
  DELETE_RECRUITMENT_JOB_SUBMISSION,
  GET_RECRUITMENT,
  GET_RECRUITMENT_JOB_ORDERS,
  GET_RECRUITMENT_JOB_SUBMISSIONS,
  getJobOrders as getJobOrdersAction,
  getJobSubmissions as getJobSubmissionsAction,
  removeJobSubmission,
  setJobOrders,
  setJobSubmissions,
  UPDATE_RECRUITMENT_JOB_SUBMISSION,
  updateClientCorporations,
  updateClientCorporationsIds,
  updateHrs,
  updateJobOrders,
  updateJobSubmissions,
} from './recruitment.actions'
import {
  getCandidate,
  getClientCorporation,
  getJobSubmissions as getJobSubmissionsService,
  getTalentAcquisitionManagers,
  updateCandidateDecision,
  updateJobSubmission as updateJobSubmissionService,
} from './recruitment.service'

export const getStateClientCorporation = (state, ccId) => pathOr({}, ['recruitment', 'clientCorporations', ccId], state)
export const getStateJobSubmissions = (state) => pathOr({}, ['recruitment', 'jobSubmissions'], state)
export const getStateJobSubmission = (state, joId) => pathOr({}, ['recruitment', 'jobSubmissions', joId], state)
export const getStateJobOrders = (state) => pathOr({}, ['recruitment', 'jobOrders'], state)
export const getStateJobOrder = (state, jobOrderId) => pathOr({}, ['recruitment', 'jobOrders', jobOrderId], state)

export function* getTams(start = 0) {
  try {
    const tamsResponse = yield call(getTalentAcquisitionManagers, start)
    const tamList = yield call(propOr, [], 'data', tamsResponse)

    yield all(tamList.map((tam) => put(getJobOrdersAction(prop('id', tam)))))

    if (propOr(0, 'count', tamsResponse) > 0)
      yield call(getTalentAcquisitionManagers, propOr(0, 'start', tamsResponse) + propOr(0, 'count', tamsResponse))
  } catch (e) {
    //
  }
}

export function* getRecruitment() {
  yield call(getTams)
}

export function* getClientCorporations(tamId, jobOrders) {
  const ccList = []
  const clientCorporations = yield all(
    jobOrders.reduce((acc, jo) => {
      const cc = prop('clientCorporation', jo)
      ccList.push(prop('id', cc))

      const jos = pathOr([], [prop('id', cc), 'jobOrders'], acc).concat(prop('id', jo))

      acc[prop('id', cc)] = {
        ...cc,
        jobOrders: jos,
      }

      return acc
    }, {})
  )

  for (const ccId of ccList) {
    const ccResponse = yield call(getClientCorporation, ccId)
    const clientCorporation = propOr({}, 'data', ccResponse)
    clientCorporations[ccId] = {
      ...clientCorporations[ccId],
      ...clientCorporation,
    }
  }

  yield put(updateClientCorporations(clientCorporations))
  yield put(updateClientCorporationsIds(ccList))
}

export function* getJobOrders(action, start = 0) {
  const tamId = prop('payload', action)
  try {
    const jobOrdersResponse = yield call(getJobOrdersService, tamId, start)
    const jobOrderList = yield call(propOr, [], 'data', jobOrdersResponse)

    yield call(getClientCorporations, tamId, jobOrderList)

    const jobOrders = yield all(
      jobOrderList.reduce((acc, jo) => {
        acc[prop('id', jo)] = { ...jo, jobSubmissions: {} }
        return acc
      }, {})
    )

    yield put(updateJobOrders(jobOrders))

    yield all(
      jobOrderList.map((jobOrder) =>
        put(getJobSubmissionsAction(prop('id', jobOrder), path(['clientCorporation', 'id'], jobOrder)))
      )
    )

    const newStart = propOr(0, 'start', jobOrdersResponse) + propOr(0, 'count', jobOrdersResponse)
    if (newStart < propOr(0, 'total', jobOrdersResponse)) yield call(getJobOrders, action, newStart)
  } catch (e) {
    //
  }
}

export function* getJobSubmissions(action, start = 0) {
  const { joId, ccId } = prop('payload', action)
  try {
    const jobSubmissionsResponse = yield call(getJobSubmissionsService, joId, start)
    const jsList = propOr([], 'data', jobSubmissionsResponse)

    const jobOrders = {}
    const hrs = []
    const jobSubmissions = yield all(
      jsList.reduce((acc, js) => {
        acc[prop('id', js)] = {
          ...js,
          clientCorporationId: ccId,
        }

        const jobOrderId = path(['jobOrder', 'id'], js)
        const jojss = pathOr([], [jobOrderId, 'jobSubmissions', js.status], jobOrders).concat([js.id])
        jobOrders[jobOrderId] = {
          jobSubmissions: {
            ...pathOr({}, [jobOrderId, 'jobSubmissions'], jobOrders),
            [js.status]: jojss,
          },
        }

        return acc
      }, {})
    )

    for (const js of jsList) {
      const candidateResponse = yield call(getCandidate, path(['candidate', 'id'], js))
      const candidate = propOr({}, 'data', candidateResponse)
      jobSubmissions[prop('id', js)].candidate = candidate

      const hr = prop('owner', candidate)
      if (hr) hrs.push(hr)
    }

    yield put(updateJobSubmissions(jobSubmissions))
    yield put(updateJobOrders(jobOrders))
    yield put(updateHrs(hrs))
  } catch (e) {
    //
  }
}

export function* getDecision(jobOrderId, status) {
  const jo = yield select(getStateJobOrder, jobOrderId)
  const cc = yield select(getStateClientCorporation, path(['clientCorporation', 'id'], jo))

  if (status === STATUS_NO_GO) return DECISION_NO_GO
  return yield call(getDecisionFromClient, propOr('', 'name', cc))
}

export function* updateStateJobSubmission(action) {
  const {
    payload: { prevJobOrderId, jobOrderId, prevStatus, jobSubmissionId, status, decision, dateLastModified },
  } = action

  const stateJobSubmissions = yield select(getStateJobSubmissions)
  const jobSubmission = stateJobSubmissions[jobSubmissionId]
  const stateNewJobOrder = yield select(getStateJobOrder, jobOrderId)
  const jobSubmissions = {
    ...stateJobSubmissions,
    [jobSubmissionId]: {
      ...jobSubmission,
      status,
      jobOrder: {
        id: prop('id', stateNewJobOrder),
        title: prop('title', stateNewJobOrder),
      },
      candidate: {
        ...jobSubmission.candidate,
        middleName: decision,
      },
      dateLastModified,
    },
  }

  yield put(setJobSubmissions(jobSubmissions))

  const statePrevJobOrder = yield select(getStateJobOrder, prevJobOrderId)
  const prevJojss = {
    ...prop('jobSubmissions', statePrevJobOrder),
    [prevStatus]: pathOr([], ['jobSubmissions', prevStatus], statePrevJobOrder).filter(
      (jsId) => jsId !== jobSubmissionId
    ),
  }
  const prevJobOrder = {
    [prevJobOrderId]: {
      ...statePrevJobOrder,
      jobSubmissions: prevJojss,
    },
  }

  const stateJobOrders1 = yield select(getStateJobOrders)
  yield put(setJobOrders({ ...stateJobOrders1, ...prevJobOrder }))

  const stateJobOrder = yield select(getStateJobOrder, jobOrderId)
  const jojss = {
    ...prop('jobSubmissions', stateJobOrder),
    [status]: pathOr([], ['jobSubmissions', status], stateJobOrder).concat([jobSubmissionId]),
  }
  const jobOrder = {
    [jobOrderId]: {
      ...stateJobOrder,
      jobSubmissions: jojss,
    },
  }

  const stateJobOrders2 = yield select(getStateJobOrders)
  yield put(setJobOrders({ ...stateJobOrders2, ...jobOrder }))
}

export function* updateJobSubmission(action) {
  const {
    payload: { prevStatus, jobSubmissionId, prevJobOrderId, jobOrderId, status },
  } = action
  const jobSubmission = yield select(getStateJobSubmission, jobSubmissionId)
  try {
    const decision = yield call(getDecision, jobOrderId, status)
    yield call(updateStateJobSubmission, {
      ...action,
      payload: {
        ...action.payload,
        decision,
        dateLastModified: new Date().getTime(),
      },
    })
    yield call(updateJobSubmissionService, jobSubmissionId, status, jobOrderId)
    yield call(updateCandidateDecision, path(['candidate', 'id'], jobSubmission), decision)
    yield call(toast.success, en.UPDATE_STATUS_SUCCESS)
  } catch (e) {
    const decision = yield call(getDecision, prevJobOrderId, prevStatus)
    yield call(updateStateJobSubmission, {
      ...action,
      payload: {
        ...action.payload,
        status: prevStatus,
        prevStatus: status,
        jobOrderId: prevJobOrderId,
        prevJobOrderId: jobOrderId,
        decision,
        dateLastModified: prop('dateLastModified', jobSubmission),
      },
    })
    yield call(toast.error, en.UPDATE_STATUS_ERROR)
  }
}

export function* addJobSubmission(jobSubmission) {
  const jobSubmissionId = propOr('', 'id', jobSubmission)
  const stateJobSubmissions = yield select(getStateJobSubmissions)
  const jobSubmissions = {
    ...stateJobSubmissions,
    [jobSubmissionId]: jobSubmission,
  }

  yield put(setJobSubmissions(jobSubmissions))

  const jobOrderId = path(['jobOrder', 'id'], jobSubmission)
  const stateJobOrder = yield select(getStateJobOrder, jobOrderId)
  const status = prop('status', jobSubmission)
  const jojss = {
    ...prop('jobSubmissions', stateJobOrder),
    [status]: pathOr([], ['jobSubmissions', status], stateJobOrder).concat([jobSubmissionId]),
  }
  const jobOrder = {
    [jobOrderId]: {
      ...stateJobOrder,
      jobSubmissions: jojss,
    },
  }

  const stateJobOrders = yield select(getStateJobOrders)
  yield put(setJobOrders({ ...stateJobOrders, ...jobOrder }))
}

export function* createJobSubmission(action) {
  const {
    payload: { jobOrder, jobSubmission, status },
  } = action

  try {
    const js = {
      candidate: { id: path(['candidate', 'id'], jobSubmission) },
      jobOrder: { id: prop('id', jobOrder) },
      status,
    }

    const putJobSubmissionResponse = yield call(createJobSubmissionService, js)
    const createdId = prop('changedEntityId', putJobSubmissionResponse)
    const jobSubmissionResponse = yield call(getJobSubmission, createdId)
    const candidateResponse = yield call(getCandidate, path(['candidate', 'id'], jobSubmission))
    const decision = yield call(getDecision, prop('id', jobOrder), status)
    const newJobSubmission = {
      ...propOr({}, 'data', jobSubmissionResponse),
      bmId: prop('bmId', jobOrder),
      clientCorporationId: path(['clientCorporation', 'id'], jobOrder),
      jobOrderId: prop('id', jobOrder),
      candidate: prop('data', candidateResponse),
    }
    yield call(addJobSubmission, newJobSubmission)
    yield call(toast.success, en.CREATE_CANDIDATE_SUCCESS)
    yield call(updateCandidateDecision, path(['candidate', 'id'], jobSubmission), decision)
  } catch (e) {
    yield call(toast.error, en.CREATE_CANDIDATE_ERROR)
  }
}

export function* deleteJobSubmission(action) {
  const jobSubmission = prop('payload', action)
  const jobSubmissionId = prop('id', jobSubmission)
  const jobOrderId = path(['jobOrder', 'id'], jobSubmission)
  const status = prop('status', jobSubmission)
  try {
    yield call(deleteJobSubmissionService, jobSubmissionId)
    yield put(removeJobSubmission(jobSubmissionId))

    const stateJobOrder = yield select(getStateJobOrder, jobOrderId)
    const jojss = {
      ...prop('jobSubmissions', stateJobOrder),
      [status]: pathOr([], ['jobSubmissions', status], stateJobOrder).filter((jsId) => jsId !== jobSubmissionId),
    }
    const jobOrder = {
      [jobOrderId]: {
        ...stateJobOrder,
        jobSubmissions: jojss,
      },
    }

    const stateJobOrders = yield select(getStateJobOrders)
    yield put(setJobOrders({ ...stateJobOrders, ...jobOrder }))

    yield call(toast.success, en.DELETE_JS_SUCCESS)
  } catch (e) {
    yield call(toast.error, en.DELETE_JS_ERROR)
  }
}

export function* deleteJobSubmissions(action) {
  const jobSubmission = prop('payload', action)

  const stateJobSubmissions = yield select(getStateJobSubmissions)
  const jobSubmissionsToDelete = Object.keys(stateJobSubmissions).filter(
    (jsId) => path([jsId, 'candidate', 'id'], stateJobSubmissions) === path(['candidate', 'id'], jobSubmission)
  )

  for (const jsId of jobSubmissionsToDelete) {
    yield call(deleteJobSubmission, {
      payload: prop(jsId, stateJobSubmissions),
    })
  }

  const stateKanbanJobSubmissions = yield select(getStateJobSubmissionsKanban)
  const jobSubmissionsToDeleteInKanban = Object.keys(stateKanbanJobSubmissions).filter(
    (jsId) => path([jsId, 'candidate', 'id'], stateKanbanJobSubmissions) === path(['candidate', 'id'], jobSubmission)
  )

  for (const jsId of jobSubmissionsToDeleteInKanban) {
    yield call(deleteJobSubmissionKanban, {
      payload: prop(jsId, stateKanbanJobSubmissions),
    })
  }
}

export default function kanbanSagas() {
  return [
    takeLatest(GET_RECRUITMENT, getRecruitment),
    takeEvery(GET_RECRUITMENT_JOB_ORDERS, getJobOrders),
    takeEvery(GET_RECRUITMENT_JOB_SUBMISSIONS, getJobSubmissions),
    takeEvery(UPDATE_RECRUITMENT_JOB_SUBMISSION, updateJobSubmission),
    takeEvery(CREATE_RECRUITMENT_JOB_SUBMISSION, createJobSubmission),
    takeEvery(DELETE_RECRUITMENT_JOB_SUBMISSION, deleteJobSubmissions),
  ]
}
