export const DATA_EMPLOYEE_ACTION = "DATA_EMPLOYEE_ACTION"

export const getDataEmployee = (idEmployeeSelected) => ({ type: DATA_EMPLOYEE_ACTION, payload: idEmployeeSelected });