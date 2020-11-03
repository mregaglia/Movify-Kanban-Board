import { BUSINESS_MANAGER, SOURCING_OFFICER, TALENT_ACQUISITION } from "../reporting/components/EmployeeData"

export const sortTableEmployee = (tableEmployee) => {
    tableEmployee.sort(function (employeeA, employeeB) {
        if (employeeA.occupation < employeeB.occupation) { return -1; }
        if (employeeA.occupation > employeeB.occupation) { return 1; }
        return 0;
    })
    return tableEmployee;
}

export const getValuesFromEmployees = (employees) => {
    return employees.map((employee) => {
        let occupationLabel = "";
        switch (employee.occupation) {
            case BUSINESS_MANAGER:
                occupationLabel = "BM";
                break;
            case SOURCING_OFFICER:
                occupationLabel = "SO";
                break;
            case TALENT_ACQUISITION:
                occupationLabel = "TA"
                break;
            default:
                occupationLabel = "";
                break;
        }
        return ({ value: `${employee.id}`, label: occupationLabel + " - " + employee.firstName + " " + employee.lastName })
    })
}