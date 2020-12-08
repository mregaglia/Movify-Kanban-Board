import { call, pathOr } from 'ramda'
import { FIRST_WEEK, SECOND_WEEK, THIRD_WEEK, FOURTH_WEEK } from '../kpi/kpi.sagas'
import { takeEvery, all, put } from 'redux-saga/effects'
import { GET_PROSPECTION_DONE_DETAIL, getProspectionDoneDetail, setProspectionDone } from './expandView.action'
import { getCompagnyNameByClientContactId } from './expandView.service'
import {
    BUSINESS_MANAGER,
    TALENT_ACQUISITION,
    SOURCING_OFFICER
} from '../../auth/user.sagas'


export function* getAllDataFromIdsForExpandView(datas, occupation) {
    try {
        switch (occupation) {
            case BUSINESS_MANAGER:
                yield all(datas.PROSPECTIONS_DONE.FIRST_WEEK.map(prospectionDone => put(getProspectionDoneDetail(pathOr(0, ["clientContacts", "data", 0, "id"], prospectionDone), prospectionDone, FIRST_WEEK))))
                yield all(datas.PROSPECTIONS_DONE.SECOND_WEEK.map(prospectionDone => put(getProspectionDoneDetail(pathOr(0, ["clientContacts", "data", 0, "id"], prospectionDone), prospectionDone, SECOND_WEEK))))
                yield all(datas.PROSPECTIONS_DONE.THIRD_WEEK.map(prospectionDone => put(getProspectionDoneDetail(pathOr(0, ["clientContacts", "data", 0, "id"], prospectionDone), prospectionDone, THIRD_WEEK))))
                yield all(datas.PROSPECTIONS_DONE.FOURTH_WEEK.map(prospectionDone => put(getProspectionDoneDetail(pathOr(0, ["clientContacts", "data", 0, "id"], prospectionDone), prospectionDone, FOURTH_WEEK))))
                break;
            case TALENT_ACQUISITION:
                break;
            case SOURCING_OFFICER:
                break;
            default:
                console.log("default")
                break
        }

    } catch (e) {
        //
    }
}

export function* getCompagnieForProspectionsDone(action) {
    let id = pathOr(0, ["payload", "ID"], action)
    let weekLabel = pathOr(0, ["payload", "WEEK_LABEL"], action)

    let lastName = pathOr(0, ["payload", "PROSPECTION_DONE", "clientContacts", "data", 0, "lastName"], action).trim()
    let firstName = pathOr(0, ["payload", "PROSPECTION_DONE", "clientContacts", "data", 0, "firstName"], action).trim()

    try {
        let clientCorporationName = yield call(getCompagnyNameByClientContactId, id)
        let prospectionDoneDetail = firstName + " " + lastName + " @" + clientCorporationName
        
        yield put(setProspectionDone(weekLabel, prospectionDoneDetail))
    } catch (e) {
        //
    }
}

export default function expandViewSagas() {
    return [
        takeEvery(GET_PROSPECTION_DONE_DETAIL, getCompagnieForProspectionsDone)
    ];
}