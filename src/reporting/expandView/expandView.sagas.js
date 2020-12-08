import { getClientCorporation } from '../../recruitment/recruitment.service'
import { call, pathOr } from 'ramda'
import { FIRST_WEEK } from '../kpi/kpi.sagas'
import { takeEvery} from 'redux-saga/effects'
import { SET_PROSPECTION_DONE} from './expandView.action'

export function* getAllDataFromIdsForExpandView(datas) {
    try {
        Object.keys(datas).map((key, i) => {
            switch (key) {
                case "PROSPECTIONS_DONE":
                    //yield all(datas[key].FIRST_WEEK.map(prospectionDone => put(getCompagnieForProspectionsDone(pathOr(0, ["clientContacts", "data", 0, "id"], prospectionDone), FIRST_WEEK))))
                    //yield all(datas[key].SECOND_WEEK.map(prospectionDone => put(getCompagnieForProspectionsDone(pathOr(0, ["clientContacts", "data", 0, "id"], prospectionDone), SECOND_WEEK))))
                    //yield all(datas[key].THIRD_WEEK.map(prospectionDone => put(getCompagnieForProspectionsDone(pathOr(0, ["clientContacts", "data", 0, "id"], prospectionDone), THIRD_WEEK))))
                    //yield all(datas[key].FOURTH_WEEK.map(prospectionDone => put(getCompagnieForProspectionsDone(pathOr(0, ["clientContacts", "data", 0, "id"], prospectionDone), FOURTH_WEEK))))
                    break;
                case "INTAKES":
                    console.log("Intake")
                    break;
                case "INTERVIEWS_DONE":
                    console.log("done")
                    break;
            }
        })
    } catch (e) {
        //
    }
}

export function* getCompagnieForProspectionsDone(id, weekLabel) {
    try {
        let clientCorporation = yield call(getClientCorporation, id)
        console.log(weekLabel, clientCorporation)
    } catch (e) {
        //
    }
}

export default function expandViewSagas() {
    return [
        takeEvery(SET_PROSPECTION_DONE, getCompagnieForProspectionsDone)
    ];
}