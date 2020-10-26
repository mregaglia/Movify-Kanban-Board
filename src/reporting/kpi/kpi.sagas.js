import { call, put, takeLatest } from "redux-saga/effects";
import { path } from 'ramda'
import { getLast4weeksDate, getDateString } from '../../utils/date'
import { BUSINESS_MANAGER, SOURCING_OFFICER } from '../components/EmployeeData'
import {
    initalizeTableBusinessManager,
    initalizeTableRecruitment,
    countDataBusinessManager,
    countDataSourcingOfficer,
    initializeTableDate
} from '../../utils/reporting'

import {
    GET_EMPLOYEE_KPI,
    kpiResetData,
    setEmployeeKpi
} from './kpi.actions'

import {
    getNoteFromEmployee,
    getSubmissionStatusChangedCvSent,
    getSubmissionStatusChangedProjectStart,
    getJobOrders,
    getProspectionMeetingSchedule,
    getAppointment
} from './kpi.service'

export const FIRST_WEEK = "FIRST_WEEK"
export const SECOND_WEEK = "SECOND_WEEK"
export const THIRD_WEEK = "THIRD_WEEK"
export const FOURTH_WEEK = "FOURTH_WEEK"

export function* getKpiDataEmployee(action) {
    yield put(kpiResetData());

    let employeeId = path(["payload", "id"], action);
    let occupation = path(["payload", "occupation"], action);

    let tableDataBusinessManager = initalizeTableBusinessManager(occupation);

    let tableDataRecruitment = initalizeTableRecruitment()
    let tableDateEmployee = initializeTableDate();
    let dates = getLast4weeksDate();

    try {
        for (let i = 0; i < dates.length; i++) {
            let kpiNote = yield call(getNoteFromEmployee, employeeId, dates[i].start, dates[i].end)
            let weekLabel = getWeekLabel(i)
            tableDateEmployee.DATES[weekLabel] = getDateString(dates[i].start);

            tableDataRecruitment = countDataSourcingOfficer(tableDataRecruitment, weekLabel, kpiNote)
            const appointments = yield call(getAppointment, employeeId, dates[i].startTimestamp, dates[i].endTimestamp);
            tableDataRecruitment.INTERVIEW_DONE[weekLabel] = appointments;

            if (occupation === BUSINESS_MANAGER) {

                tableDataBusinessManager = countDataBusinessManager(tableDataBusinessManager, weekLabel, kpiNote)
                
                const cvSent = yield call(getSubmissionStatusChangedCvSent, employeeId, dates[i].startTimestamp, dates[i].endTimestamp);
                const projectStart = yield call(getSubmissionStatusChangedProjectStart, employeeId, dates[i].startTimestamp, dates[i].endTimestamp);
                const prospectionMeetingSchedule = yield call(getProspectionMeetingSchedule, employeeId, dates[i].startTimestamp, dates[i].endTimestamp);
                const kpiJobOrder = yield call(getJobOrders, employeeId, dates[i].startTimestamp, dates[i].endTimestamp)

                tableDataBusinessManager.CV_SENT[weekLabel] = cvSent;
                tableDataBusinessManager.PROJECT_START[weekLabel] = projectStart
                tableDataBusinessManager.PROSPECTION_MEETING_SCHEDULE[weekLabel] = prospectionMeetingSchedule
                tableDataBusinessManager.NEW_VACANCY[weekLabel] = kpiJobOrder
            }
        }
    } catch (e) {
        //
    }
    yield put(setEmployeeKpi(tableDateEmployee, tableDataRecruitment, tableDataBusinessManager))
}

const getWeekLabel = (index) => {
    switch (index) {
        case 0:
            return FIRST_WEEK;
        case 1:
            return SECOND_WEEK;
        case 2:
            return THIRD_WEEK;
        case 3:
            return FOURTH_WEEK
        default:
            return "";
    }
}

export default function kpiSagas() {
    return [
        takeLatest(GET_EMPLOYEE_KPI, getKpiDataEmployee)
    ];
}