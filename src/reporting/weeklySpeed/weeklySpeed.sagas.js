
import { takeLatest } from "redux-saga/effects";
import {GET_GAUGE_LIMIT} from './weeklySpeed.action'

export function* getGaugeLimit() {
    
}

export default function weeklySpeedSagas() {
    return [
        takeLatest(GET_GAUGE_LIMIT, getKpiDataEmployee)
    ];
}