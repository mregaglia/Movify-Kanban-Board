import { get } from "../../utils/api";
import { prop } from "ramda"

export const getBusinessManagerSourcingOfficerAndTalentAcquisition = () =>
    get("query/CorporateUser", {
        fields: "id,firstName,lastName,occupation,primaryDepartment",
        where: "id NOT IN (1, 2, 3, 2403, 3978, 10146) AND occupation IS NOT NULL AND isDeleted=false",
        orderBy: "firstName,primaryDepartment.name",
        start: 0
    });

export const getUserById = (id) =>
    get("query/CorporateUser", {
        fields: "id,firstName,lastName,occupation,primaryDepartment",
        where: `id=${id} AND isDeleted=false`,
        start: 0
    }).then(response => prop("data", response))