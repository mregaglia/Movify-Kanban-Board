import { call, put, takeEvery, all, takeLatest } from "redux-saga/effects";
import { countActions } from '../utils/reporting'
import { path } from 'ramda'
import { getLast4weeksDate } from '../utils/date'
import {
    getNoteFromEmployee,
    getJobOfferFromEmployee
} from "./kpi.service"

import {
    KPI_NOTE_ACTION,
    setKpiNoteEmployee,
    KPI_JOBOFFER_ACTION,
    setKpiJobOfferEmployee,
    GET_EMPLOYEE_KPI,
    kpiResetData,
    getKpiNoteEmployee,
    getKpiJobOfferEmployee
} from './kpi.actions'

export function* getKpiNoteEmployeeSaga(action) {
    try {
        let id = action.payload.id;
        let startDate = action.payload.dateStart
        let dateEnd = action.payload.dateEnd
        const kpiNote = yield call(getNoteFromEmployee, id, startDate, dateEnd)
        const notesCounted = countActions(kpiNote)
        yield put(setKpiNoteEmployee(startDate, notesCounted))
    } catch (e) {
        //
    }
}

export function* getKpiJobOfferEmployeeSaga(action) {
    try {
        let id = action.payload.id;
        let startDate = action.payload.dateStart
        let dateEnd = action.payload.dateEnd
        const kpiJobOffer = yield call(getJobOfferFromEmployee, id, startDate, dateEnd)
        //const jobOfferCounted = countActions(kpiJobOffer)
        yield put(setKpiJobOfferEmployee(startDate, kpiJobOffer))
    } catch (e) {
        //
    }
}

export function* getEmployeeKpi(action) {
    yield put(kpiResetData());

    let dates = getLast4weeksDate();

    let employeeId = path(["payload", "id"], action)

    yield all(dates.reduce((acc, date) => {
        return acc.concat(put(getKpiNoteEmployee(employeeId, date.start, date.end)))
            .concat(put(getKpiJobOfferEmployee(employeeId, date.startTimestamp, date.endTimestamp)))
    }, []))
}

export default function kpiSagas() {
    return [
        takeEvery(KPI_NOTE_ACTION, getKpiNoteEmployeeSaga),
        takeEvery(KPI_JOBOFFER_ACTION, getKpiJobOfferEmployeeSaga),
        takeLatest(GET_EMPLOYEE_KPI, getEmployeeKpi)
    ];
}