export const KPI_RESET_DATA = "KPI_RESET_DATA"

export const GET_EMPLOYEE_KPI = "GET_EMPLOYEE_KPI"
export const SET_EMPLOYEE_KPI = "SET_EMPLOYEE_KPI"

export const kpiResetData = () => ({ type: KPI_RESET_DATA, payload: [] })

export const getEmployeeKpi = (employee) => ({ type: GET_EMPLOYEE_KPI, payload: employee });
export const setEmployeeKpi = (tableDate, tableDataRecruitment, tableDataBusinessManager) => ({ type: SET_EMPLOYEE_KPI, payload: { dates: tableDate, datasRecruitment: tableDataRecruitment, datasBusinessManager: tableDataBusinessManager } })