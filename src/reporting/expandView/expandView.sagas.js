import { call, pathOr, prop } from 'ramda'
import { FIRST_WEEK, SECOND_WEEK, THIRD_WEEK, FOURTH_WEEK } from '../kpi/kpi.sagas'
import { takeEvery, all, put } from 'redux-saga/effects'
import { GET_DETAIL_DATA, getDetailData, setDataExpandView } from './expandView.action'
import { getCompagnyNameByClientContactId } from './expandView.service'
import {
    BUSINESS_MANAGER,
    TALENT_ACQUISITION,
    SOURCING_OFFICER
} from '../../auth/user.sagas'
import { getCandidateCategory } from '../weeklySpeed/weeklySpeek.service'

const INTERVIEW_DONE = "INTERVIEW_DONE"
const INTERVIEW_SCHEDULED = "INTERVIEW_SCHEDULED"
const LINKED_INMAIL = "LINKED_INMAIL"
const INTAKES = "INTAKES"
const PROSPECTION_MEETING_DONE = "PROSPECTION_MEETING_DONE"

const IS_CANDIDATE = "IS_CANDIDATE"
const IS_CLIENT = "IS_CLIENT"

export function* getAllDataFromIdsForExpandView(datas, occupation) {
    console.log(datas)
    try {
        if (occupation === BUSINESS_MANAGER) {

            yield all(datas.PROSPECTIONS_DONE.FIRST_WEEK.map(prospectionDone => put(getDetailData(pathOr(0, ["clientContacts", "data", 0, "id"], prospectionDone), prop("clientContacts", prospectionDone), PROSPECTION_MEETING_DONE, FIRST_WEEK, IS_CLIENT))))
            yield all(datas.PROSPECTIONS_DONE.SECOND_WEEK.map(prospectionDone => put(getDetailData(pathOr(0, ["clientContacts", "data", 0, "id"], prospectionDone), prop("clientContacts", prospectionDone), PROSPECTION_MEETING_DONE, SECOND_WEEK, IS_CLIENT))))
            yield all(datas.PROSPECTIONS_DONE.THIRD_WEEK.map(prospectionDone => put(getDetailData(pathOr(0, ["clientContacts", "data", 0, "id"], prospectionDone), prop("clientContacts", prospectionDone), PROSPECTION_MEETING_DONE, THIRD_WEEK, IS_CLIENT))))
            yield all(datas.PROSPECTIONS_DONE.FOURTH_WEEK.map(prospectionDone => put(getDetailData(pathOr(0, ["clientContacts", "data", 0, "id"], prospectionDone), prop("clientContacts", prospectionDone), PROSPECTION_MEETING_DONE, FOURTH_WEEK, IS_CLIENT))))

            yield all(datas.INTAKES.FIRST_WEEK.map(intake => put(getDetailData(pathOr(0, ["clientContacts", "data", 0, "id"], intake), prop("clientContacts", intake), INTAKES, FIRST_WEEK, IS_CLIENT))))
            yield all(datas.INTAKES.SECOND_WEEK.map(intake => put(getDetailData(pathOr(0, ["clientContacts", "data", 0, "id"], intake), prop("clientContacts", intake), INTAKES, SECOND_WEEK, IS_CLIENT))))
            yield all(datas.INTAKES.THIRD_WEEK.map(intake => put(getDetailData(pathOr(0, ["clientContacts", "data", 0, "id"], intake), prop("clientContacts", intake), INTAKES, THIRD_WEEK, IS_CLIENT))))
            yield all(datas.INTAKES.FOURTH_WEEK.map(intake => put(getDetailData(pathOr(0, ["clientContacts", "data", 0, "id"], intake), prop("clientContacts", intake), INTAKES, FOURTH_WEEK, IS_CLIENT))))

        } else if (occupation === TALENT_ACQUISITION || occupation === SOURCING_OFFICER) {

            yield all(datas.INTERVIEW_SCHEDULED.FIRST_WEEK.map(interviewScheduled => put(getDetailData(pathOr(0, ["candidates", "data", 0, "id"], interviewScheduled), prop("candidates", interviewScheduled), INTERVIEW_SCHEDULED, FIRST_WEEK, IS_CANDIDATE))))
            yield all(datas.INTERVIEW_SCHEDULED.SECOND_WEEK.map(interviewScheduled => put(getDetailData(pathOr(0, ["candidates", "data", 0, "id"], interviewScheduled), prop("candidates", interviewScheduled), INTERVIEW_SCHEDULED, SECOND_WEEK, IS_CANDIDATE))))
            yield all(datas.INTERVIEW_SCHEDULED.THIRD_WEEK.map(interviewScheduled => put(getDetailData(pathOr(0, ["candidates", "data", 0, "id"], interviewScheduled), prop("candidates", interviewScheduled), INTERVIEW_SCHEDULED, THIRD_WEEK, IS_CANDIDATE))))
            yield all(datas.INTERVIEW_SCHEDULED.FOURTH_WEEK.map(interviewScheduled => put(getDetailData(pathOr(0, ["candidates", "data", 0, "id"], interviewScheduled), prop("candidates", interviewScheduled), INTERVIEW_SCHEDULED, FOURTH_WEEK, IS_CANDIDATE))))
        
        }
        
        if (occupation === BUSINESS_MANAGER || occupation === TALENT_ACQUISITION) {
            
            yield all(datas.INTERVIEWS_DONE.FIRST_WEEK.map(interviewsDone => put(getDetailData(pathOr(0, ["candidates", "data", 0, "id"], interviewsDone), prop("candidates", interviewsDone), INTERVIEW_DONE, FIRST_WEEK, IS_CANDIDATE))))
            yield all(datas.INTERVIEWS_DONE.SECOND_WEEK.map(interviewsDone => put(getDetailData(pathOr(0, ["candidates", "data", 0, "id"], interviewsDone), prop("candidates", interviewsDone), INTERVIEW_DONE, SECOND_WEEK, IS_CANDIDATE))))
            yield all(datas.INTERVIEWS_DONE.THIRD_WEEK.map(interviewsDone => put(getDetailData(pathOr(0, ["candidates", "data", 0, "id"], interviewsDone), prop("candidates", interviewsDone), INTERVIEW_DONE, THIRD_WEEK, IS_CANDIDATE))))
            yield all(datas.INTERVIEWS_DONE.FOURTH_WEEK.map(interviewsDone => put(getDetailData(pathOr(0, ["candidates", "data", 0, "id"], interviewsDone), prop("candidates", interviewsDone), INTERVIEW_DONE, FOURTH_WEEK, IS_CANDIDATE))))
        
        }

        if (occupation === SOURCING_OFFICER) {
            yield all(datas.LINKED_INMAIL.FIRST_WEEK.map(interviewsDone => put(getDetailData(pathOr(0, ["candidates", "data", 0, "id"], interviewsDone), prop("candidates", interviewsDone), LINKED_INMAIL, FIRST_WEEK, IS_CANDIDATE))))
            yield all(datas.LINKED_INMAIL.SECOND_WEEK.map(interviewsDone => put(getDetailData(pathOr(0, ["candidates", "data", 0, "id"], interviewsDone), prop("candidates", interviewsDone), LINKED_INMAIL, SECOND_WEEK, IS_CANDIDATE))))
            yield all(datas.LINKED_INMAIL.THIRD_WEEK.map(interviewsDone => put(getDetailData(pathOr(0, ["candidates", "data", 0, "id"], interviewsDone), prop("candidates", interviewsDone), LINKED_INMAIL, THIRD_WEEK, IS_CANDIDATE))))
            yield all(datas.LINKED_INMAIL.FOURTH_WEEK.map(interviewsDone => put(getDetailData(pathOr(0, ["candidates", "data", 0, "id"], interviewsDone), prop("candidates", interviewsDone), LINKED_INMAIL, FOURTH_WEEK, IS_CANDIDATE))))
        }
    } catch (e) {
        //
    }
}

export function* getDetailDataSaga(action) {

    let id = pathOr(0, ["payload", "ID"], action)
    let weekLabel = pathOr("", ["payload", "WEEK_LABEL"], action)
    let type = pathOr("", ["payload", "TYPE"], action)
    let clientOrCandidate = pathOr("", ["payload", "CLIENT_OR_CANDIDATE"], action)

    let lastName = pathOr("", ["payload", "DATA", "data", 0, "lastName"], action).trim()
    let firstName = pathOr("", ["payload", "DATA", "data", 0, "firstName"], action).trim()

    try {
        let stringDetail = firstName + " " + lastName + " @"

        if (clientOrCandidate === IS_CLIENT) {
            let clientCorporationName = yield call(getCompagnyNameByClientContactId, id)
            stringDetail = stringDetail + clientCorporationName
        } else if (clientOrCandidate === IS_CANDIDATE) {
            let candidatesCategories = yield call(getCandidateCategory, id)
            stringDetail = stringDetail + candidatesCategories[0].name
            console.log(stringDetail)
        }

        yield put(setDataExpandView(type, weekLabel, stringDetail))
    } catch (e) {
        //
    }
}

export default function expandViewSagas() {
    return [
        takeEvery(GET_DETAIL_DATA, getDetailDataSaga)
    ];
}