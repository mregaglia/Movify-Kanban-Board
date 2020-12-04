import { takeLatest, select, put, call, all } from "redux-saga/effects"
import { GET_GAUGE_LIMIT, setGaugeLimit, setWeeklySpeed, setCalculatingWeeklySpeed } from './weeklySpeed.action'
import { getCandidateCategory } from './weeklySpeek.service'
import { BUSINESS_MANAGER, SOURCING_OFFICER, TALENT_ACQUISITION } from '../../auth/user.sagas'
import gaugeLimitFromJSONObject from '../gauge-limit.json'
import gaugeCountData from '../gauge-count-data.json'
import { getNoteProspectionLastYear } from './weeklySpeek.service'
import { FIRST_WEEK, SECOND_WEEK, THIRD_WEEK, FOURTH_WEEK } from "../kpi/kpi.sagas"
import { isNil } from 'ramda'

// Recrtuitment
export const POINT_FOR_INTERVIEW_DONE = 3
export const POINT_FOR_INTERVIEW_SCHEDULED_TA = 2
export const POINT_FOR_INTERVIEW_SCHEDULED_SO = 3

// Business Manager
export const POINT_PROSPECTION_MEETING_DONE_NEW_CONTACT = 2
export const POINT_PROSPECTION_MEETING_DONE_RE_PROSP = 1
export const POINT_INTERVIEW_DONE = 1
export const POINT_CV_SENT = 2
export const POINT_INTAKE = 5

export const getOccupationFromEmployeeSelected = (state) => state.employees.employeeSelected.occupation
// Recruitment & Business Manager 
export const getInterviewDone = (state, weekLabel) => state.kpi.dataEmployee.datasRecruitment.INTERVIEW_DONE[weekLabel]
export const getInterviewScheduled = (state, weekLabel) => state.kpi.dataEmployee.datasRecruitment.INTERVIEW_SCHEDULED[weekLabel]

// Business Manager
export const getIntake = (state, weekLabel) => state.kpi.dataEmployee.datasBusinessManager.INTAKE[weekLabel]
export const getCVSent = (state, weekLabel) => state.kpi.dataEmployee.datasBusinessManager.CV_SENT[weekLabel]

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

export function* getCandidatesCategory(idsCandidate) {
    const maxCall = 5

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
        return categories
    } catch (e) {
        //
    }
}

export function* calculateWeeklySpeedRecruitmentForAllWeeks(objectCategories, occupation) {
    try {
        yield all([
            call(calculateWeeklySpeedForRecruitment, objectCategories[FIRST_WEEK], FIRST_WEEK, occupation),
            call(calculateWeeklySpeedForRecruitment, objectCategories[SECOND_WEEK], SECOND_WEEK, occupation),
            call(calculateWeeklySpeedForRecruitment, objectCategories[THIRD_WEEK], THIRD_WEEK, occupation),
            call(calculateWeeklySpeedForRecruitment, objectCategories[FOURTH_WEEK], FOURTH_WEEK, occupation),
        ])
        yield put(setCalculatingWeeklySpeed(false))
    } catch (e) {
        //
    }
}

export function* calculateWeeklySpeedForRecruitment(categories, weekLabel, occupation) {
    let weeklySpeed = 0
    let isAlreadyCounted = false
    try {
        if (!isNil(categories) && categories.length !== 0) {
            for (let i = 0; i < categories.length; i++) {
                if (categories[i].length > 0) {
                    for (var key of Object.keys(gaugeCountData.TALENT_ACQUISITION)) {
                        if (gaugeCountData.TALENT_ACQUISITION[key].includes(categories[i][0].id)) {
                            weeklySpeed += parseInt(key)
                            isAlreadyCounted = true
                            break;
                        }
                    }
                }
                if (!isAlreadyCounted) weeklySpeed++
                isAlreadyCounted = false
            }
        }

        let numberOfInterviewScheduled = yield select(getInterviewScheduled, weekLabel)
        if (occupation.includes(TALENT_ACQUISITION)) {
            let numberOfInterviewDone = yield call(getInterviewDoneSaga, weekLabel)
            if (numberOfInterviewDone > 0) weeklySpeed += (numberOfInterviewDone * POINT_FOR_INTERVIEW_DONE)

            if (numberOfInterviewScheduled > 0) weeklySpeed += (numberOfInterviewScheduled * POINT_FOR_INTERVIEW_SCHEDULED_TA)
        } else if (occupation.includes(SOURCING_OFFICER)) {
            if (numberOfInterviewScheduled > 0) weeklySpeed += (numberOfInterviewScheduled * POINT_FOR_INTERVIEW_SCHEDULED_SO)
        }

        yield put(setWeeklySpeed(weekLabel, weeklySpeed))
    } catch (e) {
        //
    }
}

function* getInterviewDoneSaga(weekLabel) {
    try {
        return yield select(getInterviewDone, weekLabel)
    } catch (e) {
        //
    }
}

export function* calculateAllWeeklySpeedForBusinessManager(idEmployee, dates, prospectionDone) {
    try {
        yield all([
            yield call(calculateWeeklySpeedForBusinessManager, idEmployee, dates[0].start, prospectionDone.FIRST_WEEK, FIRST_WEEK),
            yield call(calculateWeeklySpeedForBusinessManager, idEmployee, dates[1].start, prospectionDone.SECOND_WEEK, SECOND_WEEK),
            yield call(calculateWeeklySpeedForBusinessManager, idEmployee, dates[2].start, prospectionDone.THIRD_WEEK, THIRD_WEEK),
            yield call(calculateWeeklySpeedForBusinessManager, idEmployee, dates[3].start, prospectionDone.FOURTH_WEEK, FOURTH_WEEK),
        ])
    } catch (e) {
        //
    }
}

export function* calculateWeeklySpeedForBusinessManager(idEmployee, dateEnd, prospectionMeetingDoneFromLastWeek, weekLabel) {
    let weeklySpeed = 0
    let hasAlreadyBeenContacted = false

    try {
        const [interviewsDone, intake, cvSent] = yield all([
            yield select(getInterviewDone, weekLabel, '/interviewsDone'),
            yield select(getIntake, weekLabel, '/intake'),
            yield select(getCVSent, weekLabel, '/cvSent'),
        ])

        let prospectionMeetingDoneFromTheBeginning = yield call(getNoteProspectionLastYear, idEmployee, dateEnd)
        
        for (let i = 0; i < prospectionMeetingDoneFromLastWeek.length; i++) {
            let idClientContact = prospectionMeetingDoneFromLastWeek[i].clientContacts.data[0].id

            for (let j = 0; j < prospectionMeetingDoneFromTheBeginning.length; j++) {
                let idClientContactProspectionMeetingDone = prospectionMeetingDoneFromTheBeginning[j].clientContacts.data[0].id
                hasAlreadyBeenContacted = (idClientContact === idClientContactProspectionMeetingDone) ? true : false
                if (hasAlreadyBeenContacted) break
            }
            weeklySpeed += (hasAlreadyBeenContacted) ? POINT_PROSPECTION_MEETING_DONE_RE_PROSP : POINT_PROSPECTION_MEETING_DONE_NEW_CONTACT
            hasAlreadyBeenContacted = false
        }

        weeklySpeed += (interviewsDone * POINT_INTERVIEW_DONE) + (intake * POINT_INTAKE) + (cvSent * POINT_CV_SENT)

        yield put(setWeeklySpeed(weekLabel, weeklySpeed))
    } catch (e) {
        //
    }
}

export default function weeklySpeedSagas() {
    return [
        takeLatest(GET_GAUGE_LIMIT, getGaugeLimit)
    ];
}