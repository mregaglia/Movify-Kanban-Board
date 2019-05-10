export const GET_KANBAN = "GET_KANBAN";
export const SET_BMS = "SET_BMS";
export const UPDATE_BMS = "UPDATE_BMS";
export const UPDATE_CLIENT_CORPORATIONS = "UPDATE_CLIENT_CORPORATIONS";
export const GET_JOB_ORDERS = "GET_JOB_ORDERS";
export const SET_JOB_ORDERS = "SET_JOB_ORDERS";
export const UPDATE_JOB_ORDERS = "UPDATE_JOB_ORDERS";
export const GET_JOB_SUBMISSIONS = "GET_JOB_SUBMISSIONS";
export const SET_JOB_SUBMISSIONS = "SET_JOB_SUBMISSIONS";
export const UPDATE_JOB_SUBMISSIONS = "UPDATE_JOB_SUBMISSIONS";
export const UPDATE_JOB_SUBMISSION = "UPDATE_JOB_SUBMISSION";
export const CREATE_JOB_SUBMISSION = "CREATE_JOB_SUBMISSION";

export const getKanban = () => ({ type: GET_KANBAN });

export const setBms = bms => ({
  type: SET_BMS,
  payload: bms
});
export const updateBms = bms => ({
  type: UPDATE_BMS,
  payload: bms
});

export const updateClientCorporations = clientCorporations => ({
  type: UPDATE_CLIENT_CORPORATIONS,
  payload: clientCorporations
});

export const getJobOrders = bmId => ({ type: GET_JOB_ORDERS, payload: bmId });
export const setJobOrders = jobOrders => ({
  type: SET_JOB_ORDERS,
  payload: jobOrders
});
export const updateJobOrders = jobOrders => ({
  type: UPDATE_JOB_ORDERS,
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
export const updateJobSubmissions = jobSubmissions => ({
  type: UPDATE_JOB_SUBMISSIONS,
  payload: jobSubmissions
});

export const updateJobSubmission = (
  jobOrderId,
  prevStatus,
  jobSubmissionId,
  status
) => ({
  type: UPDATE_JOB_SUBMISSION,
  payload: {
    jobOrderId,
    prevStatus,
    jobSubmissionId,
    status
  }
});

export const createJobSubmission = (jobOrder, jobSubmission, status) => ({
  type: CREATE_JOB_SUBMISSION,
  payload: { jobOrder, jobSubmission, status }
});
