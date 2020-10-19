import { call, put, takeEvery } from "redux-saga/effects";
import {
    getNoteFromEmployee
} from "./kpi.service"

import {
    KPI_DATA_EMPLOYEE_ACTION,
    setKpiDataEmployee
} from './kpi.actions'

export function* getKpiDataEmployeeSaga(action) {
    try {
        let id = action.payload.id;
        let startDate = action.payload.dateStart
        let dateEnd = action.payload.dateEnd
        const kpiData = yield call(getNoteFromEmployee, id, startDate, dateEnd)
        
        yield put(setKpiDataEmployee(startDate, kpiData))
    } catch (e) {
        //
    }
}

export default function kpiSagas() {
    return [
        takeEvery(KPI_DATA_EMPLOYEE_ACTION, getKpiDataEmployeeSaga),
    ];
}