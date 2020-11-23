
import { takeLatest, select, put, call, all } from "redux-saga/effects"
import { GET_GAUGE_LIMIT, GET_CATEGORIES_FROM_CANDIDATES, setGaugeLimit, setWeeklySpeed } from './weeklySpeed.action'
import { getCandidateCategory } from './weeklySpeek.service'
import { BUSINESS_MANAGER, TALENT_ACQUISITION, SOURCING_OFFICER } from '../../auth/user.sagas'
import gaugeLimitFromJSONObject from '../gauge-limit.json'
import gaugeCountData from '../gauge-count-data.json'
import { parse } from "path"

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
    let idsCandidate = action.payload
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

        yield call(calculateWeeklySpeedFromCategoryCandidate, categories)
    } catch (e) {
        //
    }
}

export function* calculateWeeklySpeedFromCategoryCandidate(categories) {
    console.log(categories)
    let weeklySpeed = 0
    let isAlreadyCounted = false
    try{
        for(let i = 0; i < categories.length; i++) {
            for (var key of Object.keys(gaugeCountData.TALENT_ACQUISITION)) {
                if(gaugeCountData.TALENT_ACQUISITION[key].includes(categories[i][0])) {
                    weeklySpeed += parseInt(gaugeCountData.TALENT_ACQUISITION[key])
                    isAlreadyCounted = true
                    break;
                }
            }
            if(!isAlreadyCounted) weeklySpeed++
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