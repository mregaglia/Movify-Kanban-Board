import moment from 'moment'
import { call, put, takeLatest, all } from "redux-saga/effects";
import { path } from 'ramda'
import { getLast4weeksDate, getDateString, getStartDateOfYear, getStartDateOfYearTimestamp } from '../../utils/date'
import { TOTAL_YTD } from '../../utils/reporting'
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
    countNoteForRecruitmentAndIdsSourcing,
    initializeObjectDataRecruitmentAndIds
} from '../../utils/reporting'
import {
    GET_EMPLOYEE_KPI,
    setEmployeeKpi,
    setKpiLoading,
    setObjectYTD,
    setCalculationYTD,
    setCvSent,
    setYTDTotalRecruitment,
    setYTDTotalBusinessManager,
    setAverageYTDBusinessManager,
    setAverageYTDRecruitment,
    setConversionYTDBusinessManager,
    setConversionYTDRecruitment,
    setLoadingYTDTotal,
    setLoadingYTDAverage,
    setLoadingYTDConversion,
    setCvSentIsLoadingWeek
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

    let objectYTDBusinessManager = initializeObjectConversionYTDBusinessManager();
    let objectYTDRecruitment = initializeObjectConversionYTDRecruitment();

    if (occupation.includes(BUSINESS_MANAGER)) {
        yield all([
            call(getLast4WeekDataSaga, employeeId, dates, objectDateEmployee, objectDataRecruitment, objectDataBusinessManager, occupation),
            getCvSent(employeeId, dates),
            call(calculateTotalYTD, employeeId, dateStartOfThisYear, dates[3].end, occupation, objectYTDBusinessManager, objectYTDRecruitment),
        ])
    } else {
        yield all([
            call(getLast4WeekDataSaga, employeeId, dates, objectDateEmployee, objectDataRecruitment, objectDataBusinessManager, occupation),
            call(calculateTotalYTD, employeeId, dateStartOfThisYear, dates[3].end, occupation, objectYTDBusinessManager, objectYTDRecruitment),
        ])
    }
}

export function* calculateTotalYTD(employeeId, dateStartOfThisYear, dateEnd, occupation, objectYTDBusinessManager, objectYTDRecruitment) {

    try {

        const kpiNoteOfTheYear = yield call(getKpiNoteSaga, employeeId, dateStartOfThisYear, dateEnd)

        if (occupation.includes(BUSINESS_MANAGER)) {
            objectYTDRecruitment = calculateTotalYTDRecruitment(kpiNoteOfTheYear, objectYTDRecruitment)
            objectYTDBusinessManager = calculateTotalYTDBusinessManager(kpiNoteOfTheYear, objectYTDBusinessManager)
            yield put(setYTDTotalBusinessManager(objectYTDBusinessManager.TOTAL_YTD))
            yield put(setYTDTotalRecruitment(objectYTDRecruitment.TOTAL_YTD))
        } else {
            objectYTDRecruitment = calculateTotalYTDRecruitment(kpiNoteOfTheYear, objectYTDRecruitment)
            yield put(setYTDTotalRecruitment(objectYTDRecruitment.TOTAL_YTD))
        }

        yield put(setLoadingYTDTotal(false))

        yield all([
            call(calculateAverageYTD, occupation, objectYTDBusinessManager, objectYTDRecruitment),
            call(calculateConversionYTD, occupation, objectYTDBusinessManager, objectYTDRecruitment)
        ])
    } catch (e) {
        //
    }
}

export function* calculateConversionYTD(occupation, objectYTDBusinessManager, objectYTDRecruitment) {
    try {
        if (occupation.includes(BUSINESS_MANAGER)) {
            objectYTDBusinessManager = calculateConversionYTDBusinessManager(objectYTDBusinessManager)
            objectYTDRecruitment = calculateConversionYTDRecruitment(objectYTDRecruitment)

            yield put(setConversionYTDBusinessManager(objectYTDBusinessManager.CONVERSION_YTD))
            yield put(setConversionYTDRecruitment(objectYTDRecruitment.CONVERSION_YTD))
        } else {
            objectYTDRecruitment = calculateConversionYTDRecruitment(objectYTDRecruitment)
            yield put(setConversionYTDRecruitment(objectYTDRecruitment.CONVERSION_YTD))
        }
        yield put(setLoadingYTDConversion(false))
    } catch (e) {
        //
    }
}

export function* calculateAverageYTD(occupation, objectYTDBusinessManager, objectYTDRecruitment) {
    let weekNumberOfTheYear = moment().format('w')
    try {
        if (occupation.includes(BUSINESS_MANAGER)) {
            objectYTDBusinessManager = calculateAverageYTDBusinessManager(objectYTDBusinessManager, weekNumberOfTheYear)
            objectYTDRecruitment = calculateAverageYTDRecruitment(objectYTDRecruitment, weekNumberOfTheYear)

            yield put(setAverageYTDBusinessManager(objectYTDBusinessManager.AVERAGE))
            yield put(setAverageYTDRecruitment(objectYTDRecruitment.AVERAGE))
        } else {
            objectYTDRecruitment = calculateAverageYTDRecruitment(objectYTDRecruitment, weekNumberOfTheYear)

            yield put(setAverageYTDRecruitment(objectYTDRecruitment.AVERAGE))
        }

        yield put(setLoadingYTDAverage(false))
    } catch (e) {
        //
    }
}

export function* getLast4WeekDataSaga(employeeId, dates, objectDateEmployee, objectDataRecruitment, objectDataBusinessManager, occupation) {

    try {
        for (let i = 0; i < dates.length; i++) {
            
            let weekLabel = getWeekLabel(i)
            
            const kpiNote = yield call(getKpiNoteSaga, employeeId, dates[i].start, dates[i].end)

            objectDateEmployee.DATES[weekLabel] = getDateString(dates[i].start);

            if(weekLabel === FOURTH_WEEK) {
                let objectDataRecruitmentAndSourcingIds = initializeObjectDataRecruitmentAndIds()
                objectDataRecruitmentAndSourcingIds = countNoteForRecruitmentAndIdsSourcing(weekLabel, kpiNote, objectDataRecruitment, objectDataRecruitmentAndSourcingIds)
                objectDataRecruitment = objectDataRecruitmentAndSourcingIds.OBJECT_DATA_RECRUITMENT    
                console.log(objectDataRecruitmentAndSourcingIds.SOURCING_IDS)
                //yield put(calculatingWeeklySpeeSaga(objectDataRecruitmentAndSourcingIds.SOURCING_IDS))
            } else {
                objectDataRecruitment = countNoteForRecruitment(weekLabel, kpiNote, objectDataRecruitment)
            }
            
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


export function* calculatingWeeklySpeeSaga(sourcingIds){

}

export function* getCvSent(employeeId, dates) {
    let jobSubmissionsTab = []
    const cvSentObject = initializeObjectCvSent()

    try {
        // Retrieving all jobOrders open for employee
        const jobOrderOpen = yield call(getAllJobOrders, employeeId);

        // retrieving all jobsubmissions linked to the jobOrder
        for (let i = 0; i < jobOrderOpen.length; i++) {
            let jobSubmission = yield call(getJobSubmissionsByJobOrderId, jobOrderOpen[i].id)
            jobSubmissionsTab = [...jobSubmissionsTab, ...jobSubmission]
        }

        // Looking for any modification for this jobSubmission to WF Response
        for (let i = 0; i < dates.length; i++) {
            let labelWeek = getWeekLabel(i)
            for (let j = 0; j < jobSubmissionsTab.length; j++) {
                let isCvSent = yield call(getSubmissionStatusChangedCvSent, jobSubmissionsTab[j].id, dates[i].startTimestamp, dates[i].endTimestamp)
                if (isCvSent) {
                    cvSentObject[labelWeek]++;
                    jobSubmissionsTab.slice(j, 1)
                }
            }
        }
        yield put(setCvSent(cvSentObject));
        yield put(setCvSentIsLoadingWeek(false))
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

            noteRemaining = (((kpiNoteRetrieved.total - remainingValue) <= 0)) ? false : true;
            
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