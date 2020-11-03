
import { call, put, takeLatest } from "redux-saga/effects";
import { pathOr, prop } from 'ramda'
import {
    getBusinessManagerSourcingOfficerAndTalentAcquisition
} from "./employees.service"
import {
    getEmployeeKpi,
    setGaugeLimit
} from '../kpi/kpi.actions'
import {
    GET_EMPLOYEES,
    setEmployees,
    SET_EMPLOYEE_SELECTED
} from './employees.actions'
import {
    getGaugeLimitFromFile
} from '../../utils/reporting'
import {
    sortTableEmployee
} from '../../utils/employees'

export function* getEmployees() {
    try {
        const employees = yield call(getBusinessManagerSourcingOfficerAndTalentAcquisition);
        console.log(employees)
        employees = sortTableEmployee(employees.data)
        yield put(setEmployees(employees))
    } catch (e) {
        //
    }
}

export function* onEmployeeSelected(action) {
    let limitGauge = getGaugeLimitFromFile(pathOr("", ["payload", "occupation"], action))
    console.log(limitGauge)
    yield put(setGaugeLimit(limitGauge))
    yield put(getEmployeeKpi(prop("payload", action)))
}

export default function employeeSagas() {
    return [
        takeLatest(GET_EMPLOYEES, getEmployees),
        takeLatest(SET_EMPLOYEE_SELECTED, onEmployeeSelected)
    ];
}