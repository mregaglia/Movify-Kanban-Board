import moment from 'moment'
import { call, put, takeLatest, all, select } from "redux-saga/effects";
import { path } from 'ramda'
import { getLast4weeksDate, getDateString, getStartDateOfYear, getStartDateOfYearTimestamp } from '../../utils/date'
import {
    initalizeObjectBusinessManager,
    initalizeObjectRecruitment,
    initializeObjectConversionYTDBusinessManager,
    initializeObjectConversionYTDRecruitment,
    countNoteForBusinessManager,
    initializeObjectDate,
    initializeObjectCvSent,
    calculateConversionYTDBusinessManager,
    calculateConversionYTDRecruitment,
    calculateTotalYTDBusinessManager,
    calculateTotalYTDRecruitment,
    calculateAverageYTDRecruitment,
    calculateAverageYTDBusinessManager,
    countNoteForRecruitmentAndIdsSourcing,
    initializeObjectDataRecruitmentAndIds,
    initialiserObjectNewVacancyYTD,
    calculateAverageYTDData,
    initialiserObjectCVSentYTD,
    countNoteForRecruitment,
    initializeObjectByDates
} from '../../utils/reporting'
import {
    GET_EMPLOYEE_KPI,
    setEmployeeKpi,
    setKpiLoading,
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
    setCvSentIsLoadingWeek,
    setLoadingYTDNewVacancy,
    setNewVacancyYTD,
    setConversionYTDNewVacancy,
    setLoadingYTDConversionNewVacancy,
    setLoadingYTDCVSent,
    setCVSentYTD,
    setLoadingYTDConversionCVSent,
    setConversionYTDCVSent
} from './kpi.actions'
import {
    getNoteFromEmployee,
    getJobOrders,
    getAllJobOrdersOpen,
    getJobSubmissionsByJobOrderId,
    getSubmissionStatusChangedCvSent,
    getJobOrdersForYTD
} from './kpi.service'
import {
    BUSINESS_MANAGER,
    TALENT_ACQUISITION,
    SOURCING_OFFICER
} from '../../auth/user.sagas'
import {
    calculateWeeklySpeedRecruitmentForAllWeeks,
    getCandidatesCategory,
    calculateAllWeeklySpeedForBusinessManager
} from '../weeklySpeed/weeklySpeed.sagas'

export const FIRST_WEEK = "FIRST_WEEK"
export const SECOND_WEEK = "SECOND_WEEK"
export const THIRD_WEEK = "THIRD_WEEK"
export const FOURTH_WEEK = "FOURTH_WEEK"
const maxCall = 10

export function* getKpiDataEmployee(action) {
    let weekNumberOfTheYear = moment().format('w')

    let dates = getLast4weeksDate();
    let dateStartOfThisYear = getStartDateOfYear()
    let dateStartOfThisYearTimestamp = getStartDateOfYearTimestamp()

    let idEmployee = path(["payload", "id"], action);
    let occupation = path(["payload", "occupation"], action);

    let objectDataBusinessManager = initalizeObjectBusinessManager(occupation);
    let objectDataRecruitment = initalizeObjectRecruitment()
    let objectDateEmployee = initializeObjectDate();

    let objectYTDBusinessManager = initializeObjectConversionYTDBusinessManager();
    let objectYTDRecruitment = initializeObjectConversionYTDRecruitment();

    if (occupation.includes(BUSINESS_MANAGER)) {
        yield all([
            call(getLast4WeekData, idEmployee, dates, objectDateEmployee, objectDataRecruitment, objectDataBusinessManager, occupation),
            call(getYTDData, idEmployee, dateStartOfThisYear, dates[3].end, occupation, objectYTDBusinessManager, objectYTDRecruitment, weekNumberOfTheYear, dateStartOfThisYearTimestamp, dates[3].endTimestamp)
        ])
    } else {
        yield all([
            call(getLast4WeekKpiDataSaga, idEmployee, dates, objectDateEmployee, objectDataRecruitment, objectDataBusinessManager, occupation),
            call(calculateTotalYTD, idEmployee, dateStartOfThisYear, dates[3].end, occupation, objectYTDBusinessManager, objectYTDRecruitment, weekNumberOfTheYear),
        ])
    }
}

export function* getLast4WeekData(idEmployee, dates, objectDateEmployee, objectDataRecruitment, objectDataBusinessManager, occupation) {
    try {
        const [prospectionDone] = yield all([
            call(getLast4WeekKpiDataSaga, idEmployee, dates, objectDateEmployee, objectDataRecruitment, objectDataBusinessManager, occupation, '/prospectionDone'),
            call(getCvSent, idEmployee, dates),
        ])
        yield call(calculateAllWeeklySpeedForBusinessManager, idEmployee, dates, prospectionDone)
    } catch (e) {
        //
    }
}

export function* getYTDData(idEmployee, dateStartOfThisYear, dateEnd, occupation, objectYTDBusinessManager, objectYTDRecruitment, weekNumberOfTheYear, dateStartOfThisYearTimestamp, dateEndTimestamp) {
    try {
        yield all([
            call(calculateTotalYTD, idEmployee, dateStartOfThisYear, dateEnd, occupation, objectYTDBusinessManager, objectYTDRecruitment, weekNumberOfTheYear),
            call(calculateTotalNewVacancyYTD, idEmployee, dateEnd, weekNumberOfTheYear, dateStartOfThisYearTimestamp, dateEndTimestamp)
        ])
        yield call(calculateConversionYTDNewVacancy)
        yield call(calculateConversionYTDCVSent)
    } catch (e) {
        //
    }
}

export const getProspectionMeetingDoneTotalYTD = (state) => state.kpi.dataYTDEmployee.TOTAL_YTD_BM.PROSPECTION_MEETING_DONE
export const getNewVacancyTotalYTD = (state) => state.kpi.dataYTDEmployee.TOTAL_YTD_BM.NEW_VACANCY

export function* calculateConversionYTDNewVacancy() {
    try {

        let totalProspectionMeetingDoneYTD = yield select(getProspectionMeetingDoneTotalYTD)
        let totalNewVacancyYTD = yield select(getNewVacancyTotalYTD)

        let conversionNewVacancyYTD = Math.round((totalNewVacancyYTD / totalProspectionMeetingDoneYTD) * 100)
        conversionNewVacancyYTD = (isNaN(conversionNewVacancyYTD) || (conversionNewVacancyYTD === Infinity)) ? "0 %" : conversionNewVacancyYTD + " %"

        yield put(setConversionYTDNewVacancy(conversionNewVacancyYTD))
        yield put(setLoadingYTDConversionNewVacancy(false))
    } catch (e) {
        //
    }
}

export const getCVSentTotalYTD = (state) => state.kpi.dataYTDEmployee.TOTAL_YTD_BM.CV_SENT

export function* calculateConversionYTDCVSent() {
    try {
        let cvSentYTD = yield select(getCVSentTotalYTD)
        let newVacancyYTD = yield select(getNewVacancyTotalYTD)

        let conversionCVSentYTD = Math.round((cvSentYTD / newVacancyYTD) * 100)
        conversionCVSentYTD = (isNaN(conversionCVSentYTD) || (conversionCVSentYTD === Infinity)) ? "0 %" : conversionCVSentYTD + " %"

        yield put(setConversionYTDCVSent(conversionCVSentYTD))

        yield put(setLoadingYTDConversionCVSent(false))
    } catch (e) {
        //
    }
}

export function* calculateTotalYTD(employeeId, dateStartOfThisYear, dateEnd, occupation, objectYTDBusinessManager, objectYTDRecruitment, weekNumberOfTheYear) {
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
            call(calculateAverageYTD, occupation, objectYTDBusinessManager, objectYTDRecruitment, weekNumberOfTheYear),
            call(calculateConversionYTD, occupation, objectYTDBusinessManager, objectYTDRecruitment)
        ])

    } catch (e) {
        //
    }
}

export const getNewVacancyYTD = (state) => state.kpi.dataYTDEmployee.TOTAL_YTD_BM.NEW_VACANCY

export function* calculateConversionYTD(occupation, objectYTDBusinessManager, objectYTDRecruitment) {
    try {
        if (occupation.includes(BUSINESS_MANAGER)) {

            let newVancancyYTD = yield select(getNewVacancyYTD)

            objectYTDBusinessManager.TOTAL_YTD.NEW_VACANCY = newVancancyYTD

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

export function* calculateAverageYTD(occupation, objectYTDBusinessManager, objectYTDRecruitment, weekNumberOfTheYear) {

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

export function* getLast4WeekKpiDataSaga(employeeId, dates, objectDateEmployee, objectDataRecruitment, objectDataBusinessManager, occupation) {

    let objectProspectionDone = (occupation.includes(BUSINESS_MANAGER)) ? initializeObjectByDates() : {};
    let objectCategories = (occupation.includes(TALENT_ACQUISITION)) ? initializeObjectByDates() : {};

    try {
        for (let i = 0; i < dates.length; i++) {
            let weekLabel = getWeekLabel(i)

            const kpiNote = yield call(getKpiNoteSaga, employeeId, dates[i].start, dates[i].end)

            objectDateEmployee.DATES[weekLabel] = getDateString(dates[i].start);

            if (occupation.includes(TALENT_ACQUISITION) || occupation.includes(SOURCING_OFFICER)) {
                let objectDataRecruitmentAndSourcingIds = initializeObjectDataRecruitmentAndIds()
                objectDataRecruitmentAndSourcingIds = countNoteForRecruitmentAndIdsSourcing(weekLabel, kpiNote, objectDataRecruitment, objectDataRecruitmentAndSourcingIds)
                objectDataRecruitment = objectDataRecruitmentAndSourcingIds.OBJECT_DATA_RECRUITMENT

                objectCategories[weekLabel] = yield call(getCandidatesCategory, objectDataRecruitmentAndSourcingIds.SOURCING_IDS)
            } else {
                objectDataRecruitment = countNoteForRecruitment(weekLabel, kpiNote, objectDataRecruitment)
            }

            if (occupation.includes(BUSINESS_MANAGER)) {
                let dataBusinessManager = countNoteForBusinessManager(weekLabel, kpiNote, objectDataBusinessManager)

                objectDataBusinessManager = dataBusinessManager.OBJECT_DATA_BUSINESS_MANAGER
                objectProspectionDone[weekLabel] = dataBusinessManager.PROSPECTIONS

                let kpiJobOrder = yield call(getJobOrders, employeeId, dates[i].startTimestamp, dates[i].endTimestamp)
                objectDataBusinessManager.NEW_VACANCY[weekLabel] = kpiJobOrder.count
            }
        }

        yield put(setEmployeeKpi(objectDateEmployee, objectDataRecruitment, objectDataBusinessManager))

        yield put(setKpiLoading(false))

        if (occupation.includes(BUSINESS_MANAGER)) {
            return objectProspectionDone
        } else {
            yield call(calculateWeeklySpeedRecruitmentForAllWeeks, objectCategories, occupation)
        }
    } catch (e) {
        //
    }
}

export function* getCvSent(employeeId, dates) {
    let jobSubmissionsTab = []
    const cvSentObject = initializeObjectCvSent()

    try {
        // Retrieving all jobOrders open for employee
        const jobOrderOpen = yield call(getAllJobOrdersOpen, employeeId);

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

export function* calculateTotalNewVacancyYTD(idEmployee, todayDate, weekNumberOfTheYear, dateStartTimestamp, dateEndTimestamp) {
    let dateStartOfThisYear = getStartDateOfYear()
    let jobOrderKpiYTD = [];
    let noteRemaining = true;
    let remainingValue = 0;
    let objectNewVacancyYTD = initialiserObjectNewVacancyYTD()
    try {
        while (noteRemaining) {
            let jobOrderYTD = yield call(getJobOrdersForYTD, idEmployee, dateStartOfThisYear, todayDate, remainingValue)

            jobOrderKpiYTD = [...jobOrderKpiYTD, ...jobOrderYTD.data]
            remainingValue = remainingValue + 50

            noteRemaining = (((jobOrderYTD.total - remainingValue) <= 0)) ? false : true;

            if (!noteRemaining) {
                let numberOfNewVacancyYTD = jobOrderKpiYTD.length
                objectNewVacancyYTD.TOTAL_YTD.NEW_VACANCY = numberOfNewVacancyYTD
                objectNewVacancyYTD.AVERAGE.NEW_VACANCY = calculateAverageYTDData(numberOfNewVacancyYTD, weekNumberOfTheYear)

                yield put(setNewVacancyYTD(objectNewVacancyYTD))
                yield put(setLoadingYTDNewVacancy(false))

                yield call(calculateTotalCvSentYTD, jobOrderKpiYTD, dateStartTimestamp, dateEndTimestamp)
                return numberOfNewVacancyYTD
            }
        }
    } catch (e) {
        //
    }
    return 0
}



export function* calculateTotalCvSentYTD(jobOrderOfTheYear, dateStartTimestamp, dateEndTimestamp) {
    let jobSubmissionFromJobOrderYTD = [];

    try {
        while (jobOrderOfTheYear.length >= maxCall) {

            const [jobSubmissionZero, jobSubmissionOne, jobSubmissionTwo, jobSubmissionThree, jobSubmissiobFour, jobSubmissionFive, jobSubmissionSix, jobSubmissionSeven, JobSubmissionEight, jobSubmissionNine] = yield all([
                call(getJobSubmissionsByJobOrderId, jobOrderOfTheYear[0].id, '/jobSubmissionZero'),
                call(getJobSubmissionsByJobOrderId, jobOrderOfTheYear[1].id, '/jobSubmissionOne'),
                call(getJobSubmissionsByJobOrderId, jobOrderOfTheYear[2].id, '/jobSubmissionTwo'),
                call(getJobSubmissionsByJobOrderId, jobOrderOfTheYear[3].id, '/jobSubmissionThree'),
                call(getJobSubmissionsByJobOrderId, jobOrderOfTheYear[4].id, '/jobSubmissiobFour'),
                call(getJobSubmissionsByJobOrderId, jobOrderOfTheYear[5].id, '/jobSubmissionFive'),
                call(getJobSubmissionsByJobOrderId, jobOrderOfTheYear[6].id, '/jobSubmissionSix'),
                call(getJobSubmissionsByJobOrderId, jobOrderOfTheYear[7].id, '/jobSubmissionSeven'),
                call(getJobSubmissionsByJobOrderId, jobOrderOfTheYear[8].id, '/JobSubmissionEight'),
                call(getJobSubmissionsByJobOrderId, jobOrderOfTheYear[9].id, '/jobSubmissionNine'),
            ])

            jobSubmissionFromJobOrderYTD = [...jobSubmissionFromJobOrderYTD, ...jobSubmissionZero, ...jobSubmissionOne, ...jobSubmissionTwo, ...jobSubmissionThree, ...jobSubmissiobFour, ...jobSubmissionFive, ...jobSubmissionSix, ...jobSubmissionSeven, ...JobSubmissionEight, ...jobSubmissionNine]

            jobOrderOfTheYear = jobOrderOfTheYear.slice(10, jobOrderOfTheYear.length)
        }

        if (jobOrderOfTheYear.length > 0) {
            for (let i = 0; i < jobOrderOfTheYear.length; i++) {
                let jobSubmissionRetrieved = yield call(getJobSubmissionsByJobOrderId, jobOrderOfTheYear[i].id, '/jobSubmissionZero')
                jobSubmissionFromJobOrderYTD = [...jobSubmissionFromJobOrderYTD, ...jobSubmissionRetrieved]
            }
        }
        yield call(getJobSubmissionStatusChangedToCVSent, jobSubmissionFromJobOrderYTD, dateStartTimestamp, dateEndTimestamp)
    } catch (e) {
        //
    }
}

export function* getJobSubmissionStatusChangedToCVSent(jobSubmissionFromJobOrderYTD, dateStartTimestamp, dateEndTimestamp) {
    let jobSubmissionWithStatusCVSentYTD = 0
    let objectCVSentYTD = initialiserObjectCVSentYTD()
    try {
        while (jobSubmissionFromJobOrderYTD.length > maxCall) {
            const [jobSubmissionFromJobOrderZero, jobSubmissionFromJobOrderOne, jobSubmissionFromJobOrderTwo, jobSubmissionFromJobOrderThree, jobSubmissionFromJobOrderFour,
                jobSubmissionFromJobOrderFive, jobSubmissionFromJobOrderSix, jobSubmissionFromJobOrderSeven, JobSubmissionFromJobOrderEight, jobSubmissionFromJobOrderNine] = yield all([
                    call(getSubmissionStatusChangedCvSent, jobSubmissionFromJobOrderYTD[0].id, dateStartTimestamp, dateEndTimestamp, '/jobSubmissionFromJobOrderZero'),
                    call(getSubmissionStatusChangedCvSent, jobSubmissionFromJobOrderYTD[1].id, dateStartTimestamp, dateEndTimestamp, '/jobSubmissionFromJobOrderOne'),
                    call(getSubmissionStatusChangedCvSent, jobSubmissionFromJobOrderYTD[2].id, dateStartTimestamp, dateEndTimestamp, '/jobSubmissionFromJobOrderTwo'),
                    call(getSubmissionStatusChangedCvSent, jobSubmissionFromJobOrderYTD[3].id, dateStartTimestamp, dateEndTimestamp, '/jobSubmissionFromJobOrderThree'),
                    call(getSubmissionStatusChangedCvSent, jobSubmissionFromJobOrderYTD[4].id, dateStartTimestamp, dateEndTimestamp, '/jobSubmissionFromJobOrderFour'),
                    call(getSubmissionStatusChangedCvSent, jobSubmissionFromJobOrderYTD[5].id, dateStartTimestamp, dateEndTimestamp, '/jobSubmissionFromJobOrderFive'),
                    call(getSubmissionStatusChangedCvSent, jobSubmissionFromJobOrderYTD[6].id, dateStartTimestamp, dateEndTimestamp, '/jobSubmissionFromJobOrderSix'),
                    call(getSubmissionStatusChangedCvSent, jobSubmissionFromJobOrderYTD[7].id, dateStartTimestamp, dateEndTimestamp, '/jobSubmissionFromJobOrderSeven'),
                    call(getSubmissionStatusChangedCvSent, jobSubmissionFromJobOrderYTD[8].id, dateStartTimestamp, dateEndTimestamp, '/JobSubmissionFromJobOrderEight'),
                    call(getSubmissionStatusChangedCvSent, jobSubmissionFromJobOrderYTD[9].id, dateStartTimestamp, dateEndTimestamp, '/jobSubmissionFromJobOrderNine'),
                ])

            jobSubmissionWithStatusCVSentYTD = jobSubmissionWithStatusCVSentYTD + jobSubmissionFromJobOrderZero + jobSubmissionFromJobOrderOne + jobSubmissionFromJobOrderTwo + jobSubmissionFromJobOrderThree + jobSubmissionFromJobOrderFour +
                jobSubmissionFromJobOrderFive + jobSubmissionFromJobOrderSix + jobSubmissionFromJobOrderSeven + JobSubmissionFromJobOrderEight + jobSubmissionFromJobOrderNine

            jobSubmissionFromJobOrderYTD = jobSubmissionFromJobOrderYTD.slice(10, jobSubmissionFromJobOrderYTD.length)
        }
        // TODO: Retrieving the rest of the jobSubmissionStatus 

        if (jobSubmissionFromJobOrderYTD.length > 0) {
            for (let i = 0; i < jobSubmissionFromJobOrderYTD.length; i++) {
                let result = yield call(getSubmissionStatusChangedCvSent, jobSubmissionFromJobOrderYTD[i].id, dateStartTimestamp, dateEndTimestamp)
                jobSubmissionWithStatusCVSentYTD += result
            }
        }
        let weekNumberOfTheYear = moment().format('w')
        objectCVSentYTD.TOTAL_YTD.CV_SENT = jobSubmissionWithStatusCVSentYTD
        objectCVSentYTD.AVERAGE.CV_SENT = calculateAverageYTDData(jobSubmissionWithStatusCVSentYTD, weekNumberOfTheYear)

        yield put(setCVSentYTD(objectCVSentYTD))
        yield put(setLoadingYTDCVSent(false))

    } catch (error) {
        //
    }
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