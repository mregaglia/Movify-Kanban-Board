import { get, post } from "../utils/api";

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
  get("search/JobSubmission", {
    fields: "id,candidate,jobOrder,owners,sendingUser,status",
    query: `jobOrder.id:${jobOrderId}`
  });
