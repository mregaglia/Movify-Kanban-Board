import { prop } from "ramda";
import { isOverDiff, DIFF_5_DAYS, DIFF_10_DAYS } from "./date";

export const STATUS_ITV1 = "ITV1";
export const STATUS_ITV2 = "ITV2";
export const STATUS_TO_SEND = "To Send";
export const STATUS_WF_RESPONSE = "WF Response";
export const STATUS_INTAKE = "Intake";
export const STATUS_WF_FEEDBACK = "WFF";
export const STATUS_NO_GO = "NO GO";

export const AVAILABLE_STATUSES = [
  STATUS_ITV1,
  STATUS_ITV2,
  STATUS_TO_SEND,
  STATUS_WF_RESPONSE,
  STATUS_INTAKE,
  STATUS_WF_FEEDBACK,
  STATUS_NO_GO
];

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

export const getCandidateBorderColor = dateLastModified => {
  if (!dateLastModified) return undefined;
  if (isOverDiff(dateLastModified, DIFF_10_DAYS)) return "red";
  if (isOverDiff(dateLastModified, DIFF_5_DAYS)) return "orange";
  return undefined;
};
