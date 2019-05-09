import { get, post, put } from "../utils/api";
import { getFilterStatusRequest } from "../utils/kanban";

export const getBusinessManagers = (start = 0) =>
  get("query/CorporateUser", {
    fields: "id,firstName,lastName,occupation",
    where: "occupation='Business Manager'",
    start
  });

export const getJobOrders = (bmId, start = 0) =>
  post(
    "search/JobOrder",
    {
      query: `owner.id:${bmId} AND isOpen:true`,
      start
    },
    {
      fields:
        "id,clientContact,clientCorporation,isOpen,owner,status,title,employmentType",
      sort: "clientCorporation.name"
    }
  );

export const getJobSubmissions = (jobOrderId, start = 0) =>
  post(
    "search/JobSubmission",
    {
      query: `jobOrder.id:${jobOrderId} AND (${getFilterStatusRequest()})`,
      start
    },
    {
      fields: "id,candidate,jobOrder,owners,sendingUser,status"
    }
  );

export const updateJobSubmissionStatus = (jobSubmissionId, status) =>
  post(`entity/JobSubmission/${jobSubmissionId}`, { status });

export const createJobSubmission = jobSubmission =>
  put("entity/JobSubmission", jobSubmission);

export const getJobSubmission = jobSubmissionId =>
  get(`entity/JobSubmission/${jobSubmissionId}`, {
    fields: "id,candidate,jobOrder,owners,sendingUser,status"
  });
