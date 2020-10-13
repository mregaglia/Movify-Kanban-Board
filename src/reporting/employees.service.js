import { get } from "../utils/api";

export const getBusinessManagerAndSourcingOfficer = (start = 0) =>
    get("query/CorporateUser", {
        fields: "id,firstName,lastName,occupation,primaryDepartment",
        where: "(occupation='Business Manager' OR occupation='Sourcing Officer') AND isDeleted=false",
        orderBy: "firstName,primaryDepartment.name",
        start: 0
    });