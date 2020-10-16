import { call, put, takeLatest } from "redux-saga/effects";
import {
    getNoteFromEmployee
} from "./dataemployee.service"

import {
    DATA_EMPLOYEE_ACTION,
    getDataEmployee
} from './employees.actions'

export function* getDataEmployee() {
    try {
        const notesEmployee = yield call(getNoteFromEmployee);
        console.log(notesEmployee)
        //yield put(setEmployees(employees))
    } catch (e) {
        //
    }
}

export default function employeeSagas() {
    return [
        takeLatest(GET_EMPLOYEES, getEmployees),
    ];
}