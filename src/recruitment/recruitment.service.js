import { get } from "../utils/api";

export const getTalentAcquisitionManagers = (start = 0) =>
  get("query/CorporateUser", {
    fields: "id,firstName,lastName,occupation,primaryDepartment",
    where: "occupation='Talent Acquisition Manager' AND isDeleted=false",
    orderBy: "firstName,primaryDepartment.name",
    start
  });
