import moment from 'moment'
import { call, put, takeLatest, all } from "redux-saga/effects";
import { path } from 'ramda'
import { getLast4weeksDate, getDateString, getStartDateOfYear, getStartDateOfYearTimestamp } from '../../utils/date'
import {  TOTAL_YTD } from '../../utils/reporting'
import {
    initalizeObjectBusinessManager,
    initalizeObjectRecruitment,
    initializeObjectConversionYTDBusinessManager,
    initializeObjectConversionYTDRecruitment,
    countNoteForBusinessManager,
    countNoteForRecruitment,
    initializeObjectDate,
    initializeObjectCvSent,
    calculateConversionYTDBusinessManager,
    calculateConversionYTDRecruitment,
    calculateTotalYTDBusinessManager,
    calculateTotalYTDRecruitment,
    calculateAverageYTDRecruitment,
    calculateAverageYTDBusinessManager,
} from '../../utils/reporting'
import {
    GET_EMPLOYEE_KPI,
    setEmployeeKpi,
    setKpiLoading,
    setObjectYTD,
    setCalculationYTD,
    setCvSent
} from './kpi.actions'
import {
    getNoteFromEmployee,
    getJobOrders,
    getAllJobOrders,
    getJobSubmissionsByJobOrderId,
    getSubmissionStatusChangedCvSent
} from './kpi.service'
import {
    BUSINESS_MANAGER
} from '../../auth/user.sagas'

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

    if(occupation.includes(BUSINESS_MANAGER)) {
        yield all([
            call(getLast4WeekDataSaga, employeeId, dates, objectDateEmployee, objectDataRecruitment, objectDataBusinessManager, occupation),
            getCvSent(employeeId, dates),
            //call(calculateYTDSaga, occupation, objectConversionYTDBusinessManager, objectConversionYTDRecruitment, employeeId, dateStartOfThisYearTimestamp, dates[3].end, dateStartOfThisYear, dates[3].endTimestamp),
        ])
    } else {
        yield all([
            call(getLast4WeekDataSaga, employeeId, dates, objectDateEmployee, objectDataRecruitment, objectDataBusinessManager, occupation),
            //call(calculateYTDSaga, occupation, objectConversionYTDBusinessManager, objectConversionYTDRecruitment, employeeId, dateStartOfThisYearTimestamp, dates[3].end, dateStartOfThisYear, dates[3].endTimestamp),
        ])
    }
    
}

export function* getLast4WeekDataSaga(employeeId, dates, objectDateEmployee, objectDataRecruitment, objectDataBusinessManager, occupation) {
    try {
        for (let i = 0; i < dates.length; i++) {
            let weekLabel = getWeekLabel(i)
            const kpiNote = yield call(getKpiNoteSaga, employeeId, dates[i].start, dates[i].end, '/kpiNote')

            objectDateEmployee.DATES[weekLabel] = getDateString(dates[i].start);
            objectDataRecruitment = countNoteForRecruitment(weekLabel, kpiNote, objectDataRecruitment)

            if (occupation.includes(BUSINESS_MANAGER)) {
                objectDataBusinessManager = countNoteForBusinessManager(weekLabel, kpiNote, objectDataBusinessManager)
                let kpiJobOrder = yield call(getJobOrders, employeeId, dates[i].startTimestamp, dates[i].endTimestamp)
                objectDataBusinessManager.NEW_VACANCY[weekLabel] = kpiJobOrder.count
            }
        }
        yield put(setEmployeeKpi(objectDateEmployee, objectDataRecruitment, objectDataBusinessManager))
        yield put(setKpiLoading(false))
    } catch (e) {
        //
    }
}

export function* getCvSent(employeeId, dates) {
    let jobSubmissionsTab = []
    const cvSentObject = initializeObjectCvSent()

    try {
        // Retrieving all jobOrders open for employee
        const jobOrderOpen = yield call(getAllJobOrders, employeeId);

        // retrieving all jobsubmissions linked to the jobOrder
        for(let i = 0; i < jobOrderOpen.length; i++) {
            let jobSubmission = yield call(getJobSubmissionsByJobOrderId, jobOrderOpen[i].id)
            jobSubmissionsTab = [...jobSubmissionsTab, ...jobSubmission]
        }

        // Looking for any modification for this jobSubmission to WF Response
        for (let i = 0; i < dates.length; i++) {
            let labelWeek = getWeekLabel(i)
            for(let j = 0; j < jobSubmissionsTab.length; j++) {
                let isCvSent = yield call(getSubmissionStatusChangedCvSent, jobSubmissionsTab[j].id, dates[i].startTimestamp, dates[i].endTimestamp)
                if(isCvSent) {
                    cvSentObject[labelWeek]++;
                    jobSubmissionsTab.slice(j, 1)
                }
            }
        }
        console.log(cvSentObject)
        yield put(setCvSent(cvSentObject));        
    } catch (e) {
        //
    } 
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