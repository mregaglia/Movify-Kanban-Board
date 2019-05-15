export const GET_RECRUITMENT = "GET_RECRUITMENT";
export const UPDATE_RECRUITMENT_CLIENT_CORPORATIONS_IDS =
  "UPDATE_RECRUITMENT_CLIENT_CORPORATIONS_IDS";
export const UPDATE_RECRUITMENT_CLIENT_CORPORATIONS =
  "UPDATE_RECRUITMENT_CLIENT_CORPORATIONS";
export const GET_RECRUITMENT_JOB_ORDERS = "GET_RECRUITMENT_JOB_ORDERS";
export const UPDATE_RECRUITMENT_JOB_ORDERS = "UPDATE_RECRUITMENT_JOB_ORDERS";
export const GET_RECRUITMENT_JOB_SUBMISSIONS =
  "GET_RECRUITMENT_JOB_SUBMISSIONS";
export const UPDATE_RECRUITMENT_JOB_SUBMISSIONS =
  "UPDATE_RECRUITMENT_JOB_SUBMISSIONS";
export const UPDATE_HRS = "UPDATE_HRS";

export const getRecruitment = () => ({ type: GET_RECRUITMENT });

export const updateClientCorporationsIds = clientCorporations => ({
  type: UPDATE_RECRUITMENT_CLIENT_CORPORATIONS_IDS,
  payload: clientCorporations
});

export const updateClientCorporations = clientCorporations => ({
  type: UPDATE_RECRUITMENT_CLIENT_CORPORATIONS,
  payload: clientCorporations
});

export const getJobOrders = tamId => ({
  type: GET_RECRUITMENT_JOB_ORDERS,
  payload: tamId
});
export const updateJobOrders = jobOrders => ({
  type: UPDATE_RECRUITMENT_JOB_ORDERS,
  payload: jobOrders
});

export const getJobSubmissions = joId => ({
  type: GET_RECRUITMENT_JOB_SUBMISSIONS,
  payload: joId
});
export const updateJobSubmissions = jobSubmissions => ({
  type: UPDATE_RECRUITMENT_JOB_SUBMISSIONS,
  payload: jobSubmissions
});

export const updateHrs = hrs => ({ type: UPDATE_HRS, payload: hrs });
