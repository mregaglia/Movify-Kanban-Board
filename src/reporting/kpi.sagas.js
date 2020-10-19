import { call, put, takeLatest } from "redux-saga/effects";
import {
    getNoteFromEmployee
} from "./kpi.service"

import {
    KPI_DATA_EMPLOYEE_ACTION
} from './kpi.actions'

export function* getKpiDataEmployeeSaga(action) {
    try {
        let id = action.payload.id;
        const kpiData = yield call(getNoteFromEmployee,id, action.payload.dateStart, action.payload.dateEnd)
        console.log(kpiData)
        //yield put(setEmployees(employees))
    } catch (e) {
        //
    }
}

export default function kpiSagas() {
    return [
        takeLatest(KPI_DATA_EMPLOYEE_ACTION, getKpiDataEmployeeSaga),
    ];
}