import { get } from "../../utils/api";

export const getBusinessManagerAndSourcingOfficer = (start = 0) =>
    get("query/CorporateUser", {
        fields: "id,firstName,lastName,occupation,primaryDepartment",
        where: "(occupation IN ('Reporting Owner & Business Manager', 'Business Manager & Reporting Owner',"
            + "'Reporting Owner & Sourcing Officer', 'Sourcing Officer & Reporting Owner', 'Talent Acquisition & Reporting Owner',"
            + "'Reporting Owner & Talent Acquisition', 'Business Manager', 'Sourcing Officer', 'Talent Acquisition' ) AND isDeleted=false",
        orderBy: "firstName,primaryDepartment.name",
        start: 0
    });