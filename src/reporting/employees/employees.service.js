import { get } from "../../utils/api"
import { prop } from "ramda"

export const getBusinessManagerSourcingOfficerAndTalentAcquisition = (currentUserId, userNames) => {
  // Id's are from LinkedIn, API etc.
  let where = "id NOT IN (1, 2, 3, 2403, 3978, 10146) AND occupation IS NOT NULL AND isDeleted=false"
  where = userNames
    ? `${where} AND (username IN (${userNames}) OR id=${currentUserId})`
    : where
  return get("query/CorporateUser", {
    fields: "id,firstName,lastName,occupation,primaryDepartment",
    where,
    orderBy: "firstName,primaryDepartment.name,lastName",
    start: 0,
  })
}

export const getUserById = (id) =>
  get("query/CorporateUser", {
    fields: "id,firstName,lastName,occupation,primaryDepartment",
    where: `id=${id} AND isDeleted=false`,
    start: 0,
  }).then((response) => prop("data", response))
