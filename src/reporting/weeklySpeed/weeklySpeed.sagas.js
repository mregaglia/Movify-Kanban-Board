import { takeLatest, select, put, call, all } from "redux-saga/effects"
import { GET_GAUGE_LIMIT, setGaugeLimit, setWeeklySpeed } from './weeklySpeed.action'
import { getCandidateCategory } from './weeklySpeek.service'
import { BUSINESS_MANAGER, SOURCING_OFFICER, TALENT_ACQUISITION } from '../../auth/user.sagas'
import gaugeLimitFromJSONObject from '../gauge-limit.json'
import { getNoteProspectionLastYear } from './weeklySpeek.service'
import { FIRST_WEEK, SECOND_WEEK, THIRD_WEEK, FOURTH_WEEK } from "../kpi/kpi.sagas"
import { isNil } from 'ramda'

// Recruitment
export const POINT_FOR_INTERVIEW_DONE = 2
export const POINT_FOR_INTERVIEW_SCHEDULED_TA = 2
export const POINT_FOR_INTERVIEW_SCHEDULED_SO = 3
export const POINT_CALL = 1

// Business Manager
export const POINT_PROSPECTION_MEETING_DONE_NEW_CONTACT = 2
export const POINT_PROSPECTION_MEETING_DONE_RE_PROSPECTION = 1
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

const getCalls = (state, weekLabel) => state.kpi.dataEmployee.datasRecruitment.CONTACTED_BY_PHONE[weekLabel]

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
    } catch (e) {
        //
    }
}

const ID_IOS_DEVELOPER = 1444970
const ID_BUSINESS_MANAGER = 1438945
const ID_ANDROID_DEVELOPER = 1444969

const sourcingOfficerPoints = new Map([
  [ID_IOS_DEVELOPER, {
    points: 2,
    type: 'iOS Developer',
  }],
  [ID_BUSINESS_MANAGER, {
    points: 3,
    type: 'Business Manager',
  }],
  [ID_ANDROID_DEVELOPER, {
    points: 2,
    type: 'Android Developer',
  }],
])

export function* calculateWeeklySpeedForRecruitment(categories, weekLabel, occupation) {
    let weeklySpeed = 0
    let isAlreadyCounted = false

    try {
        if (!isNil(categories) && categories.length !== 0) {
            for (let i = 0; i < categories.length; i++) {
                if (categories[i].length > 0) {
                    for (const key of sourcingOfficerPoints.keys()) {
                        const firstCategoryId = categories[i][0].id
                        const allCategoryIds = categories[i].map(({ id }) => id) ?? []
                        if ((key === firstCategoryId && [ID_IOS_DEVELOPER, ID_BUSINESS_MANAGER].includes(key)) || (allCategoryIds.includes(key) && key === ID_ANDROID_DEVELOPER)) {
                          const points = sourcingOfficerPoints.get(key).points
                          weeklySpeed += points
                          isAlreadyCounted = true
                          break
                        }
                    }
                }
                if (!isAlreadyCounted) weeklySpeed++
                isAlreadyCounted = false
            }
        }

        if (occupation.includes(TALENT_ACQUISITION) || occupation.includes(SOURCING_OFFICER)) {
          const numberofCalls = yield select(getCalls, weekLabel)
          if (numberofCalls > 0) {
            weeklySpeed += numberofCalls * POINT_CALL
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

export function* calculateWeeklySpeedForBusinessManager(idEmployee, dateEnd, prospectionMeetingsDoneFromLastWeek, weekLabel) {
    let weeklySpeedWithoutCvSent = 0

    try {
        const [interviewsDone, intake] = yield all([
            yield select(getInterviewDone, weekLabel, '/interviewsDone'),
            yield select(getIntake, weekLabel, '/intake'),
        ])

        let prospectionMeetingsDoneFromTheBeginning = yield call(getNoteProspectionLastYear, idEmployee, dateEnd)
        // Manually filter out Notes with other actions, API also includes Notes with action type "Prospection scheduled"
        prospectionMeetingsDoneFromTheBeginning = prospectionMeetingsDoneFromTheBeginning?.filter((single) => single.action === "Prospection")

        prospectionMeetingsDoneFromLastWeek.forEach((currentMeeting) => {
            if (currentMeeting?.clientContacts?.data?.length > 0) {
                const idClientContact = currentMeeting?.clientContacts?.data?.[0]?.id;

                let hasAlreadyBeenContacted = prospectionMeetingsDoneFromTheBeginning?.some((doneMeeting) => {
                    if (doneMeeting?.clientContacts?.data?.length) {
                        const idClientContactProspectionMeetingDone = doneMeeting?.clientContacts?.data?.[0]?.id

                        return idClientContact === idClientContactProspectionMeetingDone
                    }
                    return false
                });

                weeklySpeedWithoutCvSent += hasAlreadyBeenContacted ? POINT_PROSPECTION_MEETING_DONE_RE_PROSPECTION : POINT_PROSPECTION_MEETING_DONE_NEW_CONTACT
                hasAlreadyBeenContacted = false
            }
        })

        weeklySpeedWithoutCvSent += (interviewsDone * POINT_INTERVIEW_DONE) + (intake * POINT_INTAKE)
        yield put(setWeeklySpeed(weekLabel, weeklySpeedWithoutCvSent))
    } catch (e) {
        //
    }
}

export default function weeklySpeedSagas() {
    return [
        takeLatest(GET_GAUGE_LIMIT, getGaugeLimit),
    ];
}