import { call, put, takeEvery } from "redux-saga/effects";
import {countActions} from '../utils/reporting'
import {
    getNoteFromEmployee,
    getJobOfferFromEmployee
} from "./kpi.service"

import {
    KPI_NOTE_ACTION,
    setKpiNoteEmployee,
    KPI_JOBOFFER_ACTION,
    setKpiJobOfferEmployee
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

export default function kpiSagas() {
    return [
        takeEvery(KPI_NOTE_ACTION, getKpiNoteEmployeeSaga),
        takeEvery(KPI_JOBOFFER_ACTION, getKpiJobOfferEmployeeSaga)
    ];
}