import { get, post, put } from "../utils/api";
import {
  getCandidateNameQuery,
  AVAILABLE_STATUSES,
  getFilterStatusRequest
} from "../utils/kanban";

export const getBusinessManagers = (start = 0) =>
  get("query/CorporateUser", {
    fields: "id,firstName,lastName,occupation,primaryDepartment",
    where: "occupation='Business Manager' AND isDeleted=false",
    orderBy: "firstName,primaryDepartment.name",
    start
  });

export const getJobOrders = (bmId, start = 0) =>
  post(
    "search/JobOrder",
    {
      query: `owner.id:${bmId} AND isOpen:true AND isDeleted:false`,
      start
    },
    {
      fields:
        "id,clientContact,clientCorporation,isOpen,owner,status,title,employmentType,description",
      sort: "clientCorporation.name,title"
    }
  );

export const getJobSubmissions = (jobOrderId, start = 0) =>
  post(
    "search/JobSubmission",
    {
      query: `jobOrder.id:${jobOrderId} AND isDeleted:false AND (${getFilterStatusRequest(
        AVAILABLE_STATUSES
      )})`,
      start
    },
    {
      fields: "id,candidate,jobOrder,owners,sendingUser,status,dateLastModified"
    }
  );

export const updateJobSubmissionStatus = (jobSubmissionId, status) =>
  post(`entity/JobSubmission/${jobSubmissionId}`, { status });

export const createJobSubmission = jobSubmission =>
  put("entity/JobSubmission", jobSubmission);

export const getJobSubmission = jobSubmissionId =>
  get(`entity/JobSubmission/${jobSubmissionId}`, {
    fields: "id,candidate,jobOrder,owners,sendingUser,status,dateLastModified"
  });

export const searchCandidates = query =>
  post("search/Candidate", {
    fields: "id,firstName,lastName,occupation",
    query: `(${getCandidateNameQuery(query)}) AND isDeleted:false`
  });
