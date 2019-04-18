import { get, post } from "../utils/api";

export const getBusinessManagers = () =>
  post(
    "query/CorporateUser",
    {
      where: "personSubtype='CorporateUser' AND occupation='Business Manager'"
    },
    { fields: "id,firstName,lastName,occupation" }
  );

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
