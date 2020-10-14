
import { call, put, takeLatest } from "redux-saga/effects";
import {
    getBusinessManagerAndSourcingOfficer
} from "./employees.service"

import {
    GET_EMPLOYEES,
    setEmployees
} from './employees.actions'

export function* getEmployees() {
    try {
        const employees = yield call(getBusinessManagerAndSourcingOfficer);
        yield put(setEmployees(employees))
    } catch (e) {
        //
    }
}

export default function employeeSagas() {
    return [
        takeLatest(GET_EMPLOYEES, getEmployees),
    ];
}