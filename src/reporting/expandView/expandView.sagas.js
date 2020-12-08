import { call, pathOr, prop } from 'ramda'
import { FIRST_WEEK, SECOND_WEEK, THIRD_WEEK, FOURTH_WEEK } from '../kpi/kpi.sagas'
import { takeEvery, all, put } from 'redux-saga/effects'
import { GET_DETAIL_DATA, getDetailData, setProspectionDone } from './expandView.action'
import { getCompagnyNameByClientContactId } from './expandView.service'
import {
    BUSINESS_MANAGER,
    TALENT_ACQUISITION,
    SOURCING_OFFICER
} from '../../auth/user.sagas'
import { INTERVIEW_DONE_1 } from '../../utils/reporting'

const INTERVIEW_DONE = "INTERVIEW_DONE"
const INTERVIEW_SCHEDULED = "INTERVIEW_SCHEDULED"
const LINKEDIN_MAIL = "LINKEDIN_MAIL"
const INTAKES = "INTAKES"
const PROSPECTION_MEETING_DONE = "PROSPECTION_MEETING_DONE"


export function* getAllDataFromIdsForExpandView(datas, occupation) {
    console.log(datas)
    try {
        switch (occupation) {
            case BUSINESS_MANAGER:
                yield all(datas.PROSPECTIONS_DONE.FIRST_WEEK.map(prospectionDone => put(getDetailData(pathOr(0, ["clientContacts", "data", 0, "id"], prospectionDone), prop("clientContacts", prospectionDone), PROSPECTION_MEETING_DONE, FIRST_WEEK))))
                yield all(datas.PROSPECTIONS_DONE.SECOND_WEEK.map(prospectionDone => put(getDetailData(pathOr(0, ["clientContacts", "data", 0, "id"], prospectionDone), prop("clientContacts", prospectionDone), PROSPECTION_MEETING_DONE, SECOND_WEEK))))
                yield all(datas.PROSPECTIONS_DONE.THIRD_WEEK.map(prospectionDone => put(getDetailData(pathOr(0, ["clientContacts", "data", 0, "id"], prospectionDone), prop("clientContacts", prospectionDone), PROSPECTION_MEETING_DONE, THIRD_WEEK))))
                yield all(datas.PROSPECTIONS_DONE.FOURTH_WEEK.map(prospectionDone => put(getDetailData(pathOr(0, ["clientContacts", "data", 0, "id"], prospectionDone), prop("clientContacts", prospectionDone), PROSPECTION_MEETING_DONE, FOURTH_WEEK))))

                yield all(datas.INTAKES.FIRST_WEEK.map(intake => put(getDetailData(pathOr(0, ["clientContacts", "data", 0, "id"], intake), prop("clientContacts", intake), INTAKES, FIRST_WEEK))))
                yield all(datas.INTAKES.SECOND_WEEK.map(intake => put(getDetailData(pathOr(0, ["clientContacts", "data", 0, "id"], intake), prop("clientContacts", intake), INTAKES, SECOND_WEEK))))
                yield all(datas.INTAKES.THIRD_WEEK.map(intake => put(getDetailData(pathOr(0, ["clientContacts", "data", 0, "id"], intake), prop("clientContacts", intake), INTAKES, THIRD_WEEK))))
                yield all(datas.INTAKES.FOURTH_WEEK.map(intake => put(getDetailData(pathOr(0, ["clientContacts", "data", 0, "id"], intake), prop("clientContacts", intake), INTAKES, FOURTH_WEEK))))



                break;
            case TALENT_ACQUISITION:
                break;
            case SOURCING_OFFICER:
                break;
            default:
                break
        }

    } catch (e) {
        //
    }
}

export function* getCompagnieFromClientContacts(action) {
    console.log(action)
    let id = pathOr(0, ["payload", "ID"], action)
    let weekLabel = pathOr("", ["payload", "WEEK_LABEL"], action)
    let type = pathOr("", ["payload", "TYPE"], action)

    let lastName = pathOr("", ["payload", "DATA", "data", 0, "lastName"], action).trim()
    let firstName = pathOr("", ["payload", "DATA", "data", 0, "firstName"], action).trim()

    try {
        let clientCorporationName = yield call(getCompagnyNameByClientContactId, id)
        let stringDetail = firstName + " " + lastName + " @" + clientCorporationName

        yield put(setProspectionDone(type, weekLabel, stringDetail))
    } catch (e) {
        //
    }
}

export default function expandViewSagas() {
    return [
        takeEvery(GET_DETAIL_DATA, getCompagnieFromClientContacts)
    ];
}