import { prop, propOr } from "ramda";

export const STATUS_ITV1 = "ITV1";
export const STATUS_ITV2 = "ITV2";
export const STATUS_TO_SEND = "To Send";
export const STATUS_WF_RESPONSE = "WF Response";
export const STATUS_INTAKE = "Intake";
export const STATUS_WF_FEEDBACK = "WFF";

export const AVAILABLE_STATUSES = [
  STATUS_ITV1,
  STATUS_ITV2,
  STATUS_TO_SEND,
  STATUS_WF_RESPONSE,
  STATUS_INTAKE,
  STATUS_WF_FEEDBACK
];

export const formatJobSubmissions = jobSubmissions =>
  jobSubmissions.reduce((acc, jobSubmission) => {
    if (AVAILABLE_STATUSES.includes(jobSubmission.status)) {
      const submissions = propOr([], jobSubmission.status, acc);
      submissions.push(jobSubmission);
      acc[jobSubmission.status] = submissions;
    }
    return acc;
  }, {});

export const getFilterStatusRequest = () =>
  AVAILABLE_STATUSES.map(status => `status:"${status}"`).join(" OR ");

export const createColumnId = (bmId, clientCorporationId, jobOrderId, status) =>
  `${bmId}.${clientCorporationId}.${jobOrderId}.${status}`;

export const getColumnData = droppableId => {
  const splits = droppableId.split(".");
  return {
    bmId: prop("0", splits),
    clientCorporationId: prop("1", splits),
    jobOrderId: prop("2", splits),
    status: prop("3", splits)
  };
};

export const isFromSameBoard = (src, dest) =>
  prop("bmId", src) === prop("bmId", dest) &&
  prop("clientCorporationId", src) === prop("clientCorporationId", dest) &&
  prop("jobOrderId", src) === prop("jobOrderId", dest);
