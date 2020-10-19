import { call, put, takeEvery } from "redux-saga/effects";
import {countActions} from '../utils/reporting'
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
        console.log(kpiData)
        const notesCounted = countActions(kpiData)
        yield put(setKpiDataEmployee(startDate, notesCounted))
    } catch (e) {
        //
    }
}

export default function kpiSagas() {
    return [
        takeEvery(KPI_DATA_EMPLOYEE_ACTION, getKpiDataEmployeeSaga),
    ];
}