import { get } from "../utils/api";

export const getBusinessManagers = () =>
  get("query/CorporateUser", {
    fields: "id,firstName,lastName,occupation",
    where: "occupation='Business Manager'"
  });

export const getJobOrders = bmId =>
  get("search/JobOrder", {
    fields: "id,clientContact,clientCorporation,isOpen,owner,status,title",
    query: `owner.id:${bmId}`,
    sort: "clientCorporation.name"
  });

export const getJobSubmissions = jobOrderId =>
  get("search/JobSubmission", {
    fields: "id,candidate,jobOrder,owners,sendingUser,status",
    query: `jobOrder.id:${jobOrderId}`
  });
