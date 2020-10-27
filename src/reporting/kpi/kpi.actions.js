export const GET_EMPLOYEE_KPI = "GET_EMPLOYEE_KPI"
export const SET_EMPLOYEE_KPI = "SET_EMPLOYEE_KPI"

export const getEmployeeKpi = (employee) => ({ type: GET_EMPLOYEE_KPI, payload: employee });
export const setEmployeeKpi = (objectDate, objectDataRecruitment, objectDataBusinessManager, objectConversionYTDRecruitment, objectConvertionYTDBusinessManager) => ({ type: SET_EMPLOYEE_KPI, payload: { dates: objectDate, datasRecruitment: objectDataRecruitment, datasBusinessManager: objectDataBusinessManager, objectConversionYTDRecruitment: objectConversionYTDRecruitment, objectConvertionYTDBusinessManager: objectConvertionYTDBusinessManager } })