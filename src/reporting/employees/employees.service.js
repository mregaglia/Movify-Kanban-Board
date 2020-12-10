import { get } from "../../utils/api";
import { prop } from "ramda"

export const getBusinessManagerSourcingOfficerAndTalentAcquisition = (start = 0) =>
    get("query/CorporateUser", {
        fields: "id,firstName,lastName,occupation,primaryDepartment",
        where: "occupation IN ('Reporting Owner %26 Business Manager','Business Manager %26 Reporting Owner',"
            + "'Reporting Owner %26 Sourcing Officer','Sourcing Officer %26 Reporting Owner','Talent Acquisition %26 Reporting Owner',"
            + "'Reporting Owner %26 Talent Acquisition','Business Manager','Sourcing Officer','Talent Acquisition') AND isDeleted=false",
        orderBy: "firstName,primaryDepartment.name",
        start: 0
    });

export const getUserById = (id) =>
    get("query/CorporateUser", {
        fields: "id,firstName,lastName,occupation,primaryDepartment",
        where: `id=${id} AND isDeleted=false`,
        start: 0
    }).then(response => prop("data", response))