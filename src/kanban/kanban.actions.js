export const GET_KANBAN = "GET_KANBAN";
export const UPDATE_KANBAN = "UPDATE_KANBAN";
export const GET_JOB_ORDERS = "GET_JOB_ORDERS";
export const GET_JOB_SUBMISSIONS = "GET_JOB_SUBMISSIONS";

export const getKanban = () => ({ type: GET_KANBAN });
export const updateKanban = kanban => ({
  type: UPDATE_KANBAN,
  payload: kanban
});
export const getJobOrders = bmId => ({ type: GET_JOB_ORDERS, payload: bmId });
export const getJobSubmissions = (bmId, clientCorporationId, jobOrderId) => ({
  type: GET_JOB_SUBMISSIONS,
  payload: { bmId, clientCorporationId, jobOrderId }
});
