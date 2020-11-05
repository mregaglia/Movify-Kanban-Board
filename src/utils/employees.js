
export const BUSINESS_MANAGER = "Business Manager"
export const TALENT_ACQUISITION = "Talent Acquisition"
export const SOURCING_OFFICER = "Sourcing Officer"

export const BM_REPORTING_OWNER_1 = "Reporting Owner & Business Manager"
export const BM_REPORTING_OWNER_2 = "Business Manager & Reporting Owner"

export const TA_REPORTING_OWNER_1 = "Reporting Owner & Talent Acquisition"
export const TA_REPORTING_OWNER_2 = "Talent Acquisition & Reporting Owner"

export const SO_REPORTING_OWNER_1 = "Sourcing Officer & Reporting Owner"
export const SO_REPORTING_OWNER_2 = "Reporting Owner & Sourcing Officer"


export const sortTableEmployee = (tableEmployee) => {
    tableEmployee.sort(function (employeeA, employeeB) {
        if (employeeA.occupation < employeeB.occupation) { return -1; }
        if (employeeA.occupation > employeeB.occupation) { return 1; }
        return 0;
    })
    return tableEmployee;
}

export const getValuesFromEmployees = (employees) => {
    console.log(employees)
    return employees.map((employee) => {
        let occupationLabel = "";

        switch (employee.occupation) {
            case BUSINESS_MANAGER:
            case BM_REPORTING_OWNER_1:
            case BM_REPORTING_OWNER_2:
                occupationLabel = "BM";
                break;
            case SOURCING_OFFICER:
            case SO_REPORTING_OWNER_1:
            case SO_REPORTING_OWNER_2:
                occupationLabel = "SO";
                break;
            case TALENT_ACQUISITION:
            case TA_REPORTING_OWNER_1:
            case TA_REPORTING_OWNER_2:
                occupationLabel = "TA"
                break;
            default:
                occupationLabel = "";
                break;
        }
        return ({ value: `${employee.id}`, label: occupationLabel + " - " + employee.firstName + " " + employee.lastName })
    })
}