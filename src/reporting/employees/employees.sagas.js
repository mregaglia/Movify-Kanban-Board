
import { call, put, takeLatest } from "redux-saga/effects";
import { prop } from 'ramda'
import {
    getBusinessManagerSourcingOfficerAndTalentAcquisition,
    getUserById
} from "./employees.service"
import {
    getEmployeeKpi
} from '../kpi/kpi.actions'
import {
    GET_EMPLOYEES,
    setEmployees,
    SET_EMPLOYEE_SELECTED,
    GET_EMPLOYEE_ACCESSIBLE_DATA
} from './employees.actions'
import {
    sortTableEmployee
} from '../../utils/employees'

export function* getEmployees() {
    try {
        const employees = yield call(getBusinessManagerSourcingOfficerAndTalentAcquisition);
        const sortedEmployees = sortTableEmployee(employees.data)
        yield put(setEmployees(sortedEmployees))
    } catch (e) {
        //
    }
}

export function* getEmployeesById(action) {
    let idsEmployee = action.payload
    let employeeData = []
    try{
        for(let i = 0; i < idsEmployee.length; i++) {
            let data = yield call(getUserById,idsEmployee[i]);
            employeeData = [...employeeData, ...data]
        }
        const sortedEmployees = sortTableEmployee(employeeData)
        yield put(setEmployees(sortedEmployees))
    } catch(e) {
        //
    }
}

export function* onEmployeeSelected(action) {
    yield put(getEmployeeKpi(prop("payload", action)))
}

export default function employeeSagas() {
    return [
        takeLatest(GET_EMPLOYEES, getEmployees),
        takeLatest(SET_EMPLOYEE_SELECTED, onEmployeeSelected),
        takeLatest(GET_EMPLOYEE_ACCESSIBLE_DATA, getEmployeesById)
    ];
}