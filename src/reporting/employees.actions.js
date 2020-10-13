export const GET_EMPLOYEES = "GET_EMPLOYEES"
export const SET_EMPLOYEES = "SET_EMPLOYEES"

export const getEmployees = () => ({ type: GET_EMPLOYEES });
export const setEmployees = (employees) => ({type: SET_EMPLOYEES, payload: employees});