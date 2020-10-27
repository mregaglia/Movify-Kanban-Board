import { call, put, takeLatest } from "redux-saga/effects";
import { path } from 'ramda'
import { getLast4weeksDate, getDateString } from '../../utils/date'
import { BUSINESS_MANAGER } from '../components/EmployeeData'
import {
    initalizeObjectBusinessManager,
    initalizeObjectRecruitment,
    initializeObjectConversionYTDBusinessManager,
    initializeObjectConversionYTDRecruitment,
    countDataBusinessManager,
    countDataSourcingOfficer,
    initializeObjectDate,
    calculateConversionYTDBusinessManager,
    calculateConversionYTDRecruitment
} from '../../utils/reporting'

import {
    GET_EMPLOYEE_KPI,
    setEmployeeKpi,
    setKpiLoading
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
    // TODO: Check if kpiResetData is necessary

    let dates = getLast4weeksDate();

    let employeeId = path(["payload", "id"], action);
    let occupation = path(["payload", "occupation"], action);

    let objectDataBusinessManager = initalizeObjectBusinessManager(occupation);
    let objectDataRecruitment = initalizeObjectRecruitment()
    let objectDateEmployee = initializeObjectDate();

    let objectConvertionYTDBusinessManager = initializeObjectConversionYTDBusinessManager();
    let objectConversionYTDRecruitment = initializeObjectConversionYTDRecruitment();
    
    try {
        for (let i = 0; i < dates.length; i++) {
            let kpiNote = yield call(getNoteFromEmployee, employeeId, dates[i].start, dates[i].end)
            let weekLabel = getWeekLabel(i)

            objectDateEmployee.DATES[weekLabel] = getDateString(dates[i].start);
            objectDataRecruitment = countDataSourcingOfficer(objectDataRecruitment, weekLabel, kpiNote)

            const appointments = yield call(getAppointment, employeeId, dates[i].startTimestamp, dates[i].endTimestamp);
            objectDataRecruitment.INTERVIEW_DONE[weekLabel] = appointments;

            if (occupation === BUSINESS_MANAGER) {

                // objectDataBusinessManager = countDataBusinessManager(objectDataBusinessManager, weekLabel, kpiNote)
                
                // const cvSent = yield call(getSubmissionStatusChangedCvSent, employeeId, dates[i].startTimestamp, dates[i].endTimestamp);
                // const projectStart = yield call(getSubmissionStatusChangedProjectStart, employeeId, dates[i].startTimestamp, dates[i].endTimestamp);
                // const prospectionMeetingSchedule = yield call(getProspectionMeetingSchedule, employeeId, dates[i].startTimestamp, dates[i].endTimestamp);
                // const kpiJobOrder = yield call(getJobOrders, employeeId, dates[i].startTimestamp, dates[i].endTimestamp)

                // objectDataBusinessManager.CV_SENT[weekLabel] = cvSent;
                // objectDataBusinessManager.PROJECT_START[weekLabel] = projectStart
                // objectDataBusinessManager.PROSPECTION_MEETING_SCHEDULE[weekLabel] = prospectionMeetingSchedule
                // objectDataBusinessManager.NEW_VACANCY[weekLabel] = kpiJobOrder

                
            }
        }
    } catch (e) {
        //
    }

    objectConversionYTDRecruitment = calculateConversionYTDRecruitment(objectDataRecruitment, objectConversionYTDRecruitment)
    objectConvertionYTDBusinessManager = calculateConversionYTDBusinessManager(objectDataBusinessManager, objectConvertionYTDBusinessManager)
    yield put(setEmployeeKpi(objectDateEmployee, objectDataRecruitment, objectDataBusinessManager, objectConversionYTDRecruitment, objectConvertionYTDBusinessManager))
    yield put(setKpiLoading(false))
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