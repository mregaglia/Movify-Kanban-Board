
import { call, put, takeLatest } from "redux-saga/effects";
import { prop } from 'ramda'
import {
    getBusinessManagerAndSourcingOfficer
} from "./employees.service"

import {
    getEmployeeKpi
} from '../kpi/kpi.actions'

import {
    GET_EMPLOYEES,
    setEmployees,
    SET_EMPLOYEE_SELECTED
} from './employees.actions'

export function* getEmployees() {
    try {
        const employees = yield call(getBusinessManagerAndSourcingOfficer);
        yield put(setEmployees(employees))
    } catch (e) {
        //
    }
}

export function* onEmployeeSelected(action) {
    yield put(getEmployeeKpi(prop("payload", action)))
}

export default function employeeSagas() {
    return [
        takeLatest(GET_EMPLOYEES, getEmployees),
        takeLatest(SET_EMPLOYEE_SELECTED, onEmployeeSelected)
    ];
}