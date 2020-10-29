import moment from 'moment'
import { call, put, takeLatest, all } from "redux-saga/effects";
import { path } from 'ramda'
import { getLast4weeksDate, getDateString, getStartDateOfYear, getStartDateOfYearTimestamp } from '../../utils/date'
import { BUSINESS_MANAGER } from '../components/EmployeeData'
import { TOTAL_YTD } from '../../utils/reporting'
import {
    initalizeObjectBusinessManager,
    initalizeObjectRecruitment,
    initializeObjectConversionYTDBusinessManager,
    initializeObjectConversionYTDRecruitment,
    countDataBusinessManager,
    countDataRecruitment,
    initializeObjectDate,
    calculateConversionYTDBusinessManager,
    calculateConversionYTDRecruitment,
    calculateTotalYTDBusinessManager,
    calculateTotalYTDRecruitment,
    calculateAverageYTDRecruitment,
    calculateAverageYTDBusinessManager
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

    let dates = getLast4weeksDate();
    let dateStartOfThisYear = getStartDateOfYear()

    let dateStartOfThisYearTimestamp = getStartDateOfYearTimestamp()

    let employeeId = path(["payload", "id"], action);
    let occupation = path(["payload", "occupation"], action);

    let objectDataBusinessManager = initalizeObjectBusinessManager(occupation);
    let objectDataRecruitment = initalizeObjectRecruitment()
    let objectDateEmployee = initializeObjectDate();

    let objectConversionYTDBusinessManager = initializeObjectConversionYTDBusinessManager();
    let objectConversionYTDRecruitment = initializeObjectConversionYTDRecruitment();

    try {
        for (let i = 0; i < dates.length; i++) {

            let weekLabel = getWeekLabel(i)

            const [kpiNote, appointments] = yield all([
                call(getKpiNoteSaga, employeeId, dates[i].start, dates[i].end, '/kpiNote'),
                call(getAppointment, employeeId, dates[i].startTimestamp, dates[i].endTimestamp, '/appointments')
            ])

            objectDateEmployee.DATES[weekLabel] = getDateString(dates[i].start);
            objectDataRecruitment = countDataRecruitment(objectDataRecruitment, weekLabel, kpiNote)
            objectDataRecruitment.INTERVIEW_DONE[weekLabel] = appointments;

            if (occupation === BUSINESS_MANAGER) {
                objectDataBusinessManager = countDataBusinessManager(objectDataBusinessManager, weekLabel, kpiNote)

                const [cvSent, projectStart, prospectionMeetingSchedule, kpiJobOrder] = yield all([
                    call(getSubmissionStatusChangedCvSent, employeeId, dates[i].startTimestamp, dates[i].endTimestamp, 'cvSent'),
                    call(getSubmissionStatusChangedProjectStart, employeeId, dates[i].startTimestamp, dates[i].endTimestamp, 'projectStart'),
                    call(getProspectionMeetingSchedule, employeeId, dates[i].startTimestamp, dates[i].endTimestamp, 'prospectionMeetingSchedule'),
                    call(getJobOrders, employeeId, dates[i].startTimestamp, dates[i].endTimestamp, 'kpiJobOrder')
                ])

                objectDataBusinessManager.CV_SENT[weekLabel] = cvSent;
                objectDataBusinessManager.PROJECT_START[weekLabel] = projectStart
                objectDataBusinessManager.PROSPECTION_MEETING_SCHEDULE[weekLabel] = prospectionMeetingSchedule
                objectDataBusinessManager.NEW_VACANCY[weekLabel] = kpiJobOrder
            }
        }
    } catch (e) {
        //
    }

    let weekNumberOfTheYear = moment().week();

    objectConversionYTDRecruitment = calculateConversionYTDRecruitment(objectDataRecruitment, objectConversionYTDRecruitment)
    objectConversionYTDBusinessManager = calculateConversionYTDBusinessManager(objectDataBusinessManager, objectConversionYTDBusinessManager)

    let kpiNoteOfTheYear = yield call(getKpiNoteSaga, employeeId, dateStartOfThisYear, dates[0].end)

    
    if (occupation === BUSINESS_MANAGER) {
        objectConversionYTDBusinessManager = yield call(calculateYTDDataBusinessManager, objectConversionYTDBusinessManager, employeeId, dateStartOfThisYearTimestamp, dates[0].endTimestamp)
        objectConversionYTDBusinessManager = calculateTotalYTDBusinessManager(kpiNoteOfTheYear, objectConversionYTDBusinessManager)
        objectConversionYTDBusinessManager = calculateAverageYTDBusinessManager(objectConversionYTDBusinessManager, weekNumberOfTheYear)

        objectConversionYTDRecruitment = calculateTotalYTDRecruitment(kpiNoteOfTheYear, objectConversionYTDRecruitment)
        objectConversionYTDRecruitment = yield call(calculateYTDDataRecruitment, objectConversionYTDRecruitment, employeeId, dateStartOfThisYearTimestamp, dates[0].end)
        objectConversionYTDRecruitment = calculateAverageYTDRecruitment(objectConversionYTDRecruitment, weekNumberOfTheYear)
    } else {
        objectConversionYTDRecruitment = calculateTotalYTDRecruitment(kpiNoteOfTheYear, objectConversionYTDRecruitment)
        objectConversionYTDRecruitment = yield call(calculateYTDDataRecruitment, objectConversionYTDRecruitment, employeeId, dateStartOfThisYearTimestamp, dates[0].end)
        objectConversionYTDRecruitment = calculateAverageYTDRecruitment(objectConversionYTDRecruitment, weekNumberOfTheYear)
    }

    yield put(setEmployeeKpi(objectDateEmployee, objectDataRecruitment, objectDataBusinessManager, objectConversionYTDRecruitment, objectConversionYTDBusinessManager))
    yield put(setKpiLoading(false))
}

export function* getKpiNoteSaga(employeeId, dateStart, dateEnd) {
    let kpiNote = [];
    let noteRemaining = true;
    let remainingValue = 0;

    try {
        while (noteRemaining) {
            let kpiNoteRetrieved = yield call(getNoteFromEmployee, employeeId, dateStart, dateEnd, remainingValue)
            kpiNote = [...kpiNote, ...kpiNoteRetrieved.data]
            remainingValue = remainingValue + 50

            noteRemaining = (((kpiNoteRetrieved.total - remainingValue) < 0)) ? false : true;

            if (!noteRemaining) {
                return kpiNote
            }
        }
    } catch (e) {
        //
    }
    return kpiNote;
}

export function* calculateYTDDataRecruitment(objectConversionYTDRecruitment, employeeId, dateStartTimeStamp, dateEndTimestamp) {
    try {
        const appointments = yield call(getAppointment, employeeId, dateStartTimeStamp, dateEndTimestamp);
        objectConversionYTDRecruitment.INTERVIEW_SCHEDULE[TOTAL_YTD] = appointments
        return objectConversionYTDRecruitment
    } catch (e) {
        //
    }
    return objectConversionYTDRecruitment
}

export function* calculateYTDDataBusinessManager(objectConversionYTDBusinessManager, employeeId, dateStartOfThisYearTimestamp, closerDateWeekTimestamp) {

    try {
        const [cvSent, projectStart, prospectionMeetingSchedule, kpiJobOrder] = yield all([
            call(getSubmissionStatusChangedCvSent, employeeId, dateStartOfThisYearTimestamp, closerDateWeekTimestamp, 'cvSent'),
            call(getSubmissionStatusChangedProjectStart, employeeId, dateStartOfThisYearTimestamp, closerDateWeekTimestamp, '/projectStart'),
            call(getProspectionMeetingSchedule, employeeId, dateStartOfThisYearTimestamp, closerDateWeekTimestamp, '/prospectionMeetingSchedule'),
            call(getJobOrders, employeeId, dateStartOfThisYearTimestamp, closerDateWeekTimestamp, '/kpiJobOrder')
        ])

        objectConversionYTDBusinessManager.CV_SENT[TOTAL_YTD] = cvSent;
        objectConversionYTDBusinessManager.PROJECT_START[TOTAL_YTD] = projectStart
        objectConversionYTDBusinessManager.PROSPECTION_MEETING_SCHEDULE[TOTAL_YTD] = prospectionMeetingSchedule
        objectConversionYTDBusinessManager.NEW_VACANCY[TOTAL_YTD] = kpiJobOrder
    } catch (e) {
        //
    }
    return objectConversionYTDBusinessManager
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