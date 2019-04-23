import { get, post } from "../utils/api";
import { getFilterStatusRequest } from "../utils/kanban";

export const getBusinessManagers = () =>
  get("query/CorporateUser", {
    fields: "id,firstName,lastName,occupation",
    where: "occupation='Business Manager'"
  });

export const getJobOrders = bmId =>
  post(
    "search/JobOrder",
    {
      query: `owner.id:${bmId} AND (status:Open OR status:"Accepting Candidates")`
    },
    {
      fields: "id,clientContact,clientCorporation,isOpen,owner,status,title",
      sort: "clientCorporation.name"
    }
  );

export const getJobSubmissions = jobOrderId =>
  post(
    "search/JobSubmission",
    {
      query: `jobOrder.id:${jobOrderId} AND (${getFilterStatusRequest()})`
    },
    {
      fields: "id,candidate,jobOrder,owners,sendingUser,status"
    }
  );
