export const GET_KANBAN = "GET_KANBAN";
export const SET_BMS = "SET_BMS";
export const SET_CLIENT_CORPORATIONS = "SET_CLIENT_CORPORATIONS";
export const GET_JOB_ORDERS = "GET_JOB_ORDERS";
export const SET_JOB_ORDERS = "SET_JOB_ORDERS";
export const GET_JOB_SUBMISSIONS = "GET_JOB_SUBMISSIONS";
export const SET_JOB_SUBMISSIONS = "SET_JOB_SUBMISSIONS";
export const UPDATE_JOB_SUBMISSION = "UPDATE_JOB_SUBMISSION";

export const getKanban = () => ({ type: GET_KANBAN });

export const setBms = bms => ({
  type: SET_BMS,
  payload: bms
});

export const setClientCorporations = clientCorporations => ({
  type: SET_CLIENT_CORPORATIONS,
  payload: clientCorporations
});

export const getJobOrders = bmId => ({ type: GET_JOB_ORDERS, payload: bmId });
export const setJobOrders = jobOrders => ({
  type: SET_JOB_ORDERS,
  payload: jobOrders
});

export const getJobSubmissions = (bmId, clientCorporationId, jobOrderId) => ({
  type: GET_JOB_SUBMISSIONS,
  payload: { bmId, clientCorporationId, jobOrderId }
});
export const setJobSubmissions = jobSubmissions => ({
  type: SET_JOB_SUBMISSIONS,
  payload: jobSubmissions
});

export const updateJobSubmission = (jobSubmissionId, status) => ({
  type: UPDATE_JOB_SUBMISSION,
  payload: {
    jobSubmissionId,
    status
  }
});
