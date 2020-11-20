
import { takeLatest, select, put } from "redux-saga/effects"
import { GET_GAUGE_LIMIT, setGaugeLimit } from './weeklySpeed.action'
import { BUSINESS_MANAGER, TALENT_ACQUISITION, SOURCING_OFFICER } from '../../auth/user.sagas'
import gaugeLimitFromJSONObject from '../gauge-limit.json'

export const getOccupationFromEmployeeSelected = (state) => state.employees.employeeSelected.occupation

export function* getGaugeLimit() {
    try {
        let occupation = yield select(getOccupationFromEmployeeSelected)

        let gaugeLimit = {}
        if(occupation.includes(BUSINESS_MANAGER)){
           gaugeLimit = gaugeLimitFromJSONObject.BUSINESS_MANAGER
        } else if(occupation.includes(TALENT_ACQUISITION)){
            gaugeLimit = gaugeLimitFromJSONObject.TALENT_ACQUISITION
        } else {
            gaugeLimit = gaugeLimitFromJSONObject.SOURCING_OFFICER
        }

        yield put(setGaugeLimit(gaugeLimit))

    } catch (e) {
        //
    }
}

export default function weeklySpeedSagas() {
    return [
        takeLatest(GET_GAUGE_LIMIT, getGaugeLimit)
    ];
}