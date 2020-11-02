export const sortTableEmployee = (tableEmployee) => {
    tableEmployee.sort(function (employeeA, employeeB) {
        if (employeeA.occupation < employeeB.occupation) { return -1; }
        if (employeeA.occupation > employeeB.occupation) { return 1; }
        return 0;
    })
    return tableEmployee;
}