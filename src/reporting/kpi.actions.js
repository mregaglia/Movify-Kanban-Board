export const KPI_DATA_EMPLOYEE_ACTION = "KPI_DATA_EMPLOYEE_ACTION"
export const KPI_SET_DATA_EMPLOYEE_ACTION = "KPI_SET_DATA_EMPLOYEE_ACTION"
export const getKpiDataEmployee = (idEmployeeSelected, dateStart, dateEnd) => ({ type: KPI_DATA_EMPLOYEE_ACTION, payload: {id: idEmployeeSelected, dateStart: dateStart, dateEnd: dateEnd}});
export const setKpiDataEmployee = (kpiDataEmployee) => ({})