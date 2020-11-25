
import { takeLatest, select, put, call, all } from "redux-saga/effects"
import { GET_GAUGE_LIMIT, GET_CATEGORIES_FROM_CANDIDATES, CALCULATE_WEEKLY_SPEED_BUSINESS_MANAGER, setGaugeLimit, setWeeklySpeed } from './weeklySpeed.action'
import { getCandidateCategory } from './weeklySpeek.service'
import { BUSINESS_MANAGER, TALENT_ACQUISITION, SOURCING_OFFICER } from '../../auth/user.sagas'
import gaugeLimitFromJSONObject from '../gauge-limit.json'
import gaugeCountData from '../gauge-count-data.json'
import { getDateFrom365daysAgo } from '../../utils/date'
import { getNoteProspectionLastYear } from './weeklySpeek.service'

// Recrtuitment
export const POINT_FOR_INTERVIEW_DONE = 5

// Business Manager
export const POINT_PROSPECTION_MEETING_DONE_NEW_CONTACT = 2
export const POINT_PROSPECTION_MEETING_DONE_RE_PROSP = 1
export const POINT_INTERVIEW_DONE = 1
export const POINT_CV_SENT = 2
export const POINT_INTAKE = 5

export const getOccupationFromEmployeeSelected = (state) => state.employees.employeeSelected.occupation
// Recruitment & Business Manager 
export const getInterviewDone = (state) => state.kpi.dataEmployee.datasRecruitment.INTERVIEW_DONE.FOURTH_WEEK

// Business Manager
export const getIntake = (state) => state.kpi.dataEmployee.datasBusinessManager.INTAKE.FOURTH_WEEK
export const getCVSent = (state) => state.kpi.dataEmployee.datasBusinessManager.CV_SENT.FOURTH_WEEK

export function* getGaugeLimit() {
    try {
        let occupation = yield select(getOccupationFromEmployeeSelected)

        let gaugeLimit = {}
        if (occupation.includes(BUSINESS_MANAGER)) {
            gaugeLimit = gaugeLimitFromJSONObject.BUSINESS_MANAGER
        } else if (occupation.includes(TALENT_ACQUISITION)) {
            gaugeLimit = gaugeLimitFromJSONObject.TALENT_ACQUISITION
        } else {
            gaugeLimit = gaugeLimitFromJSONObject.SOURCING_OFFICER
        }

        yield put(setGaugeLimit(gaugeLimit))

    } catch (e) {
        //
    }
}

export function* getCandidatesCategory(action) {
    const maxCall = 5
    let idsCandidate = action.payload.CANDIATES_ID
    let occupation = action.payload.OCCUPATION
    let categories = []
    try {

        while (idsCandidate.length > maxCall) {
            const [candidateCategoryOne, candidateCategoryTwo, candidateCategoryThree, candidateCategoryFour, candidateCategoryFive] = yield all([
                call(getCandidateCategory, idsCandidate[0], '/candidateCategoryOne'),
                call(getCandidateCategory, idsCandidate[1], '/candidateCategoryTwo'),
                call(getCandidateCategory, idsCandidate[2], '/candidateCategoryThree'),
                call(getCandidateCategory, idsCandidate[3], '/candidateCategoryFour'),
                call(getCandidateCategory, idsCandidate[4], '/candidateCategoryFive'),
            ])

            categories = [...categories, candidateCategoryOne, candidateCategoryTwo, candidateCategoryThree, candidateCategoryFour, candidateCategoryFive]

            idsCandidate = idsCandidate.slice(5, idsCandidate.length)
        }

        if (idsCandidate.length > 0) {
            for (let i = 0; i < idsCandidate.length; i++) {
                let result = yield call(getCandidateCategory, idsCandidate[i])
                categories = [...categories, result]
            }
        }

        if (occupation.includes(TALENT_ACQUISITION)) {
            yield call(calculateWeeklySpeedForRecruitment, categories)
        } else if (occupation.includes(SOURCING_OFFICER)) {
            yield call(calculateWeeklySpeedForSourcingOfficer, categories)
        }

    } catch (e) {
        //
    }
}



export function* calculateWeeklySpeedForRecruitment(categories) {
    let weeklySpeed = 0
    let isAlreadyCounted = false
    try {
        for (let i = 0; i < categories.length; i++) {
            for (var key of Object.keys(gaugeCountData.TALENT_ACQUISITION)) {
                if (gaugeCountData.TALENT_ACQUISITION[key].includes(categories[i][0].id)) {
                    weeklySpeed += parseInt(key)
                    isAlreadyCounted = true
                    break;
                }
            }

            if (!isAlreadyCounted) weeklySpeed++
            isAlreadyCounted = false
        }

        let numberOfInterviewDone = yield select(getInterviewDone)

        weeklySpeed += (numberOfInterviewDone * POINT_FOR_INTERVIEW_DONE)

        yield put(setWeeklySpeed(weeklySpeed))
    } catch (e) {
        //
    }
}

export function* calculateWeeklySpeedForSourcingOfficer(categories) {
    let weeklySpeed = 0
    let isAlreadyCounted = false
    try {
        for (let i = 0; i < categories.length; i++) {

            for (var key of Object.keys(gaugeCountData.SOURCING_OFFICER)) {
                if (gaugeCountData.SOURCING_OFFICER[key].includes(categories[i][0].id)) {
                    weeklySpeed += parseInt(key)
                    isAlreadyCounted = true
                    break;
                }
            }

            if (!isAlreadyCounted) weeklySpeed++
            isAlreadyCounted = false
        }

        yield put(setWeeklySpeed(weeklySpeed))
    } catch (e) {
        //
    }
}


export function* calculateWeeklySpeedForBusinessManager(action) {
    let prospectionMeetingDoneFromLastWeek = action.payload.MEETING_SCHEDULED
    let dateStart = action.payload.DATE_START
    let idEmployee = action.payload.EMPLOYEE_ID
    let date365daysAgoTimestamp = getDateFrom365daysAgo()
    let weeklySpeed = 0
    let hasAlreadyBeenContacted = false
    try {

        const [interviewsDone, intake, cvSent] = yield ([
            yield select(getInterviewDone, '/interviewsDone'),
            yield select(getIntake, '/intake'),
            yield select(getCVSent, '/cvSent'),
        ])

        let prospectionMeetingDoneForTheYear = yield call(getNoteProspectionLastYear, idEmployee, date365daysAgoTimestamp, dateStart)

        for (let i = 0; i < prospectionMeetingDoneFromLastWeek.length; i++) {
            let idClientContact = prospectionMeetingDoneFromLastWeek[i].clientContacts.data[0].id

            for (let j = 0; j < prospectionMeetingDoneForTheYear.length; j++) {
                let idClientContactProspectionMeetingDone = prospectionMeetingDoneForTheYear[j].clientContacts.data[0].id
                hasAlreadyBeenContacted = (idClientContact === idClientContactProspectionMeetingDone) ? true : false
                if (hasAlreadyBeenContacted) break
            }

            weeklySpeed += (hasAlreadyBeenContacted) ? POINT_PROSPECTION_MEETING_DONE_RE_PROSP : POINT_PROSPECTION_MEETING_DONE_NEW_CONTACT
            hasAlreadyBeenContacted = false
        }

        weeklySpeed += (interviewsDone * POINT_FOR_INTERVIEW_DONE) + (intake * POINT_INTAKE) + (cvSent * POINT_CV_SENT)

        yield put(setWeeklySpeed(weeklySpeed))

    } catch (e) {
        //
    }
}

export default function weeklySpeedSagas() {
    return [
        takeLatest(GET_GAUGE_LIMIT, getGaugeLimit),
        takeLatest(GET_CATEGORIES_FROM_CANDIDATES, getCandidatesCategory),
        takeLatest(CALCULATE_WEEKLY_SPEED_BUSINESS_MANAGER, calculateWeeklySpeedForBusinessManager)
    ];
}