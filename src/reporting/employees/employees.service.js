import { get } from "../../utils/api";

export const getBusinessManagerAndSourcingOfficer = (start = 0) =>
    get("query/CorporateUser", {
        fields: "id,firstName,lastName,occupation,primaryDepartment",
        where: "(occupation IN ('Reporting Owner %26 Business Manager', 'Business Manager %26 Reporting Owner',"
            + "'Reporting Owner %26 Sourcing Officer', 'Sourcing Officer %26 Reporting Owner', 'Talent Acquisition %26 Reporting Owner',"
            + "'Reporting Owner %26 Talent Acquisition', 'Business Manager', 'Sourcing Officer', 'Talent Acquisition' ) AND isDeleted=false",
        orderBy: "firstName,primaryDepartment.name",
        start: 0
    });