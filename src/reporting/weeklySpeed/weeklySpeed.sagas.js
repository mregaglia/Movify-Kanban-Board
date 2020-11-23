
import { takeLatest, select, put, call, all } from "redux-saga/effects"
import { GET_GAUGE_LIMIT, GET_CATEGORIES_FROM_CANDIDATES, setGaugeLimit, setWeeklySpeed } from './weeklySpeed.action'
import { getCandidateCategory } from './weeklySpeek.service'
import { BUSINESS_MANAGER, TALENT_ACQUISITION, SOURCING_OFFICER } from '../../auth/user.sagas'
import gaugeLimitFromJSONObject from '../gauge-limit.json'
import gaugeCountData from '../gauge-count-data.json'

export const POINT_FOR_INTERVIEW_DONE = 5

export const getOccupationFromEmployeeSelected = (state) => state.employees.employeeSelected.occupation

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

export const getInterviewDone = (state) => state.kpi.dataEmployee.datasRecruitment.INTERVIEW_DONE.FOURTH_WEEK

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
            console.log(categories[i][0])
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

export default function weeklySpeedSagas() {
    return [
        takeLatest(GET_GAUGE_LIMIT, getGaugeLimit),
        takeLatest(GET_CATEGORIES_FROM_CANDIDATES, getCandidatesCategory)
    ];
}