import { call, put, takeLatest } from "redux-saga/effects";
import { path } from 'ramda'
import { getLast4weeksDate } from '../../utils/date'
import { countData } from '../../utils/reporting'

import {
    GET_EMPLOYEE_KPI,
    kpiResetData,
    setEmployeeKpi
} from './kpi.actions'

import {
    getNoteFromEmployee,
    getSubmissionStatusChangedCvSent,
    getSubmissionStatusChangedProjectStart
} from './kpi.service'

export function* getKpiNoteEmployeeSaga(employeeId, date) {
    try {
        const kpiNote = yield call(getNoteFromEmployee, employeeId, date.start, date.end)
        //const kpiJobOrder = yield call(getJobOrderFromEmployee, employeeId, date.startTimestamp, date.endTimestamp)
        const cvSent = yield call(getSubmissionStatusChangedCvSent, employeeId, date.startTimestamp, date.endTimestamp);
        const projectStart = yield call(getSubmissionStatusChangedCvSent, employeeId, date.startTimestamp, date.endTimestamp);
        let dataCounted = countData(date.start, kpiNote, cvSent.count, projectStart.count)
        console.log(dataCounted)
        //yield put(setEmployeeKpi(dataCounted))
    } catch (e) {
        //
    }
}

export function* getKpiDataEmployee(action) {
    yield put(kpiResetData());
    let dates = getLast4weeksDate();
    let employeeId = path(["payload", "id"], action);

    try {
        for (let i = 0; i < dates.length; i++) {
            yield call(getKpiNoteEmployeeSaga, employeeId, dates[i]);
        }
    } catch (e) {
        //
    }
}

export default function kpiSagas() {
    return [
        takeLatest(GET_EMPLOYEE_KPI, getKpiDataEmployee)
    ];
}