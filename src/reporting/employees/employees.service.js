import { get } from "../../utils/api";

export const getBusinessManagerSourcingOfficerAndTalentAcquisition = (start = 0) =>
    get("query/CorporateUser", {
        fields: "id,firstName,lastName,occupation,primaryDepartment",
        where: "(occupation='Business Manager' OR occupation='Sourcing Officer' OR occupation='Talent Acquisition ') AND isDeleted=false",
        orderBy: "firstName,primaryDepartment.name",
        start: 0
    });