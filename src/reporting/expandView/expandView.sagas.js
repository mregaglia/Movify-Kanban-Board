import { call, flatten, pathOr, prop } from 'ramda'
import { all, put, select, takeEvery } from 'redux-saga/effects'

import { BUSINESS_MANAGER, SOURCING_OFFICER, TALENT_ACQUISITION } from '../../auth/user.sagas'
import { FIRST_WEEK, FOURTH_WEEK, SECOND_WEEK, THIRD_WEEK } from '../kpi/kpi.sagas'
import { getCandidateCategory } from '../weeklySpeed/weeklySpeek.service'

import { GET_DETAIL_DATA, getDetailData, setDataExpandView } from './expandView.action'
import { getCompanyNameByClientContactId } from './expandView.service'

export const INTERVIEW_DONE = 'INTERVIEW_DONE'
export const INTERVIEW_SCHEDULED = 'INTERVIEW_SCHEDULED'
export const LINKED_INMAIL = 'LINKED_INMAIL'
export const INTAKES = 'INTAKES'
export const PROSPECTION_MEETING_DONE = 'PROSPECTION_MEETING_DONE'
export const PROSPECTION_MEETING_SCHEDULED = 'PROSPECTION_MEETING_SCHEDULED'
export const NEW_VACANCY = 'NEW_VACANCY'
export const CV_SENT = 'CV_SENT'

const IS_CANDIDATE = 'IS_CANDIDATE'
const IS_CLIENT = 'IS_CLIENT'

export const getExpandedViewDataCvSent = (state) => state.kpi.dataEmployee.datasBusinessManager.CV_SENT_EXPANDED_VIEW

const tableWeek = [FIRST_WEEK, SECOND_WEEK, THIRD_WEEK, FOURTH_WEEK]

export function* getAllDataFromIdsForExpandView(datas, occupation) {
  try {
    if (occupation.includes(BUSINESS_MANAGER)) {
      const dataCvSent = yield select(getExpandedViewDataCvSent)

      yield all(
        flatten(
          tableWeek.map((week) =>
            datas.PROSPECTIONS_DONE[week].map((prospectionDone) =>
              put(
                getDetailData(
                  pathOr(0, ['clientContacts', 'data', 0, 'id'], prospectionDone),
                  prop('clientContacts', prospectionDone),
                  PROSPECTION_MEETING_DONE,
                  week,
                  IS_CLIENT
                )
              )
            )
          )
        )
      )
      yield all(
        dataCvSent.FIRST_WEEK.map((cvSent) =>
          put(getDetailData(pathOr(0, ['candidate', 'id'], cvSent), cvSent, CV_SENT, FIRST_WEEK, IS_CANDIDATE))
        )
      )
      yield all(
        dataCvSent.SECOND_WEEK.map((cvSent) =>
          put(getDetailData(pathOr(0, ['candidate', 'id'], cvSent), cvSent, CV_SENT, SECOND_WEEK, IS_CANDIDATE))
        )
      )
      yield all(
        dataCvSent.THIRD_WEEK.map((cvSent) =>
          put(getDetailData(pathOr(0, ['candidate', 'id'], cvSent), cvSent, CV_SENT, THIRD_WEEK, IS_CANDIDATE))
        )
      )
      yield all(
        dataCvSent.FOURTH_WEEK.map((cvSent) =>
          put(getDetailData(pathOr(0, ['candidate', 'id'], cvSent), cvSent, CV_SENT, FOURTH_WEEK, IS_CANDIDATE))
        )
      )

      yield all(
        datas.NEW_VACANCY.FIRST_WEEK.map((newVacancy) =>
          put(
            getDetailData(
              pathOr(0, ['clientContact', 'id'], newVacancy),
              newVacancy,
              NEW_VACANCY,
              FIRST_WEEK,
              IS_CLIENT
            )
          )
        )
      )
      yield all(
        datas.NEW_VACANCY.SECOND_WEEK.map((newVacancy) =>
          put(
            getDetailData(
              pathOr(0, ['clientContact', 'id'], newVacancy),
              newVacancy,
              NEW_VACANCY,
              SECOND_WEEK,
              IS_CLIENT
            )
          )
        )
      )
      yield all(
        datas.NEW_VACANCY.THIRD_WEEK.map((newVacancy) =>
          put(
            getDetailData(
              pathOr(0, ['clientContact', 'id'], newVacancy),
              newVacancy,
              NEW_VACANCY,
              THIRD_WEEK,
              IS_CLIENT
            )
          )
        )
      )
      yield all(
        datas.NEW_VACANCY.FOURTH_WEEK.map((newVacancy) =>
          put(
            getDetailData(
              pathOr(0, ['clientContact', 'id'], newVacancy),
              newVacancy,
              NEW_VACANCY,
              FOURTH_WEEK,
              IS_CLIENT
            )
          )
        )
      )

      yield all(
        datas.INTAKES.FIRST_WEEK.map((intake) =>
          put(
            getDetailData(
              pathOr(0, ['candidates', 'data', 0, 'id'], intake),
              prop('candidates', intake),
              INTAKES,
              FIRST_WEEK,
              IS_CANDIDATE,
              pathOr(0, ['clientContacts', 'data', 0, 'id'], intake)
            )
          )
        )
      )
      yield all(
        datas.INTAKES.SECOND_WEEK.map((intake) =>
          put(
            getDetailData(
              pathOr(0, ['candidates', 'data', 0, 'id'], intake),
              prop('candidates', intake),
              INTAKES,
              SECOND_WEEK,
              IS_CANDIDATE,
              pathOr(0, ['clientContacts', 'data', 0, 'id'], intake)
            )
          )
        )
      )

      yield all(
        datas.INTAKES.THIRD_WEEK.map((intake) =>
          put(
            getDetailData(
              pathOr(0, ['candidates', 'data', 0, 'id'], intake),
              prop('candidates', intake),
              INTAKES,
              THIRD_WEEK,
              IS_CANDIDATE,
              pathOr(0, ['clientContacts', 'data', 0, 'id'], intake)
            )
          )
        )
      )

      yield all(
        datas.INTAKES.FOURTH_WEEK.map((intake) =>
          put(
            getDetailData(
              pathOr(0, ['candidates', 'data', 0, 'id'], intake),
              prop('candidates', intake),
              INTAKES,
              FOURTH_WEEK,
              IS_CANDIDATE,
              pathOr(0, ['clientContacts', 'data', 0, 'id'], intake)
            )
          )
        )
      )

      yield all(
        datas.PROSPECTIONS_SCHEDULED.FIRST_WEEK.map((prospectionDone) =>
          put(
            getDetailData(
              pathOr(0, ['clientContacts', 'data', 0, 'id'], prospectionDone),
              prop('clientContacts', prospectionDone),
              PROSPECTION_MEETING_SCHEDULED,
              FIRST_WEEK,
              IS_CLIENT
            )
          )
        )
      )

      yield all(
        datas.PROSPECTIONS_SCHEDULED.SECOND_WEEK.map((prospectionDone) =>
          put(
            getDetailData(
              pathOr(0, ['clientContacts', 'data', 0, 'id'], prospectionDone),
              prop('clientContacts', prospectionDone),
              PROSPECTION_MEETING_SCHEDULED,
              SECOND_WEEK,
              IS_CLIENT
            )
          )
        )
      )

      yield all(
        datas.PROSPECTIONS_SCHEDULED.THIRD_WEEK.map((prospectionDone) =>
          put(
            getDetailData(
              pathOr(0, ['clientContacts', 'data', 0, 'id'], prospectionDone),
              prop('clientContacts', prospectionDone),
              PROSPECTION_MEETING_SCHEDULED,
              THIRD_WEEK,
              IS_CLIENT
            )
          )
        )
      )
      yield all(
        datas.PROSPECTIONS_SCHEDULED.FOURTH_WEEK.map((prospectionDone) =>
          put(
            getDetailData(
              pathOr(0, ['clientContacts', 'data', 0, 'id'], prospectionDone),
              prop('clientContacts', prospectionDone),
              PROSPECTION_MEETING_SCHEDULED,
              FOURTH_WEEK,
              IS_CLIENT
            )
          )
        )
      )
    } else if (occupation.includes(TALENT_ACQUISITION) || occupation.includes(SOURCING_OFFICER)) {
      if (datas.INTERVIEW_SCHEDULED.FIRST_WEEK.length > 0)
        yield all(
          datas.INTERVIEW_SCHEDULED.FIRST_WEEK.map((interviewScheduled) =>
            put(
              getDetailData(
                pathOr(0, ['candidates', 'data', 0, 'id'], interviewScheduled),
                prop('candidates', interviewScheduled),
                INTERVIEW_SCHEDULED,
                FIRST_WEEK,
                IS_CANDIDATE
              )
            )
          )
        )

      if (datas.INTERVIEW_SCHEDULED.SECOND_WEEK.length > 0)
        yield all(
          datas.INTERVIEW_SCHEDULED.SECOND_WEEK.map((interviewScheduled) =>
            put(
              getDetailData(
                pathOr(0, ['candidates', 'data', 0, 'id'], interviewScheduled),
                prop('candidates', interviewScheduled),
                INTERVIEW_SCHEDULED,
                SECOND_WEEK,
                IS_CANDIDATE
              )
            )
          )
        )

      if (datas.INTERVIEW_SCHEDULED.THIRD_WEEK.length > 0)
        yield all(
          datas.INTERVIEW_SCHEDULED.THIRD_WEEK.map((interviewScheduled) =>
            put(
              getDetailData(
                pathOr(0, ['candidates', 'data', 0, 'id'], interviewScheduled),
                prop('candidates', interviewScheduled),
                INTERVIEW_SCHEDULED,
                THIRD_WEEK,
                IS_CANDIDATE
              )
            )
          )
        )

      if (datas.INTERVIEW_SCHEDULED.FOURTH_WEEK.length > 0)
        yield all(
          datas.INTERVIEW_SCHEDULED.FOURTH_WEEK.map((interviewScheduled) =>
            put(
              getDetailData(
                pathOr(0, ['candidates', 'data', 0, 'id'], interviewScheduled),
                prop('candidates', interviewScheduled),
                INTERVIEW_SCHEDULED,
                FOURTH_WEEK,
                IS_CANDIDATE
              )
            )
          )
        )
    }
    if (occupation.includes(BUSINESS_MANAGER) || occupation.includes(TALENT_ACQUISITION)) {
      yield all(
        datas.INTERVIEWS_DONE.FIRST_WEEK.map((interviewsDone) =>
          put(
            getDetailData(
              pathOr(0, ['candidates', 'data', 0, 'id'], interviewsDone),
              prop('candidates', interviewsDone),
              INTERVIEW_DONE,
              FIRST_WEEK,
              IS_CANDIDATE
            )
          )
        )
      )
      yield all(
        datas.INTERVIEWS_DONE.SECOND_WEEK.map((interviewsDone) =>
          put(
            getDetailData(
              pathOr(0, ['candidates', 'data', 0, 'id'], interviewsDone),
              prop('candidates', interviewsDone),
              INTERVIEW_DONE,
              SECOND_WEEK,
              IS_CANDIDATE
            )
          )
        )
      )
      yield all(
        datas.INTERVIEWS_DONE.THIRD_WEEK.map((interviewsDone) =>
          put(
            getDetailData(
              pathOr(0, ['candidates', 'data', 0, 'id'], interviewsDone),
              prop('candidates', interviewsDone),
              INTERVIEW_DONE,
              THIRD_WEEK,
              IS_CANDIDATE
            )
          )
        )
      )
      yield all(
        datas.INTERVIEWS_DONE.FOURTH_WEEK.map((interviewsDone) =>
          put(
            getDetailData(
              pathOr(0, ['candidates', 'data', 0, 'id'], interviewsDone),
              prop('candidates', interviewsDone),
              INTERVIEW_DONE,
              FOURTH_WEEK,
              IS_CANDIDATE
            )
          )
        )
      )
    }

    if (occupation.includes(SOURCING_OFFICER)) {
      if (datas.LINKED_INMAIL.FIRST_WEEK.length > 0)
        yield all(
          datas.LINKED_INMAIL.FIRST_WEEK.map((interviewsDone) =>
            put(
              getDetailData(
                pathOr(0, ['candidates', 'data', 0, 'id'], interviewsDone),
                prop('candidates', interviewsDone),
                LINKED_INMAIL,
                FIRST_WEEK,
                IS_CANDIDATE
              )
            )
          )
        )
      if (datas.LINKED_INMAIL.SECOND_WEEK.length > 0)
        yield all(
          datas.LINKED_INMAIL.SECOND_WEEK.map((interviewsDone) =>
            put(
              getDetailData(
                pathOr(0, ['candidates', 'data', 0, 'id'], interviewsDone),
                prop('candidates', interviewsDone),
                LINKED_INMAIL,
                SECOND_WEEK,
                IS_CANDIDATE
              )
            )
          )
        )
      if (datas.LINKED_INMAIL.THIRD_WEEK.length > 0)
        yield all(
          datas.LINKED_INMAIL.THIRD_WEEK.map((interviewsDone) =>
            put(
              getDetailData(
                pathOr(0, ['candidates', 'data', 0, 'id'], interviewsDone),
                prop('candidates', interviewsDone),
                LINKED_INMAIL,
                THIRD_WEEK,
                IS_CANDIDATE
              )
            )
          )
        )
      if (datas.LINKED_INMAIL.FOURTH_WEEK.length > 0)
        yield all(
          datas.LINKED_INMAIL.FOURTH_WEEK.map((interviewsDone) =>
            put(
              getDetailData(
                pathOr(0, ['candidates', 'data', 0, 'id'], interviewsDone),
                prop('candidates', interviewsDone),
                LINKED_INMAIL,
                FOURTH_WEEK,
                IS_CANDIDATE
              )
            )
          )
        )
    }
  } catch (e) {
    //
  }
}

export function* getDetailDataSaga(action) {
  const id = pathOr(0, ['payload', 'ID'], action)
  const weekLabel = pathOr('', ['payload', 'WEEK_LABEL'], action)
  const type = pathOr('', ['payload', 'TYPE'], action)
  const clientOrCandidate = pathOr('', ['payload', 'CLIENT_OR_CANDIDATE'], action)

  let lastName = ''
  let firstName = ''

  if (type === NEW_VACANCY) {
    lastName = pathOr('', ['payload', 'DATA', 'clientContact', 'lastName'], action).trim()
    firstName = pathOr('', ['payload', 'DATA', 'clientContact', 'firstName'], action).trim()
  } else if (type === CV_SENT) {
    lastName = action?.payload?.DATA?.candidate?.lastName ?? ''
    firstName = action?.payload?.DATA?.candidate?.firstName ?? ''
  } else {
    lastName = pathOr('', ['payload', 'DATA', 'data', 0, 'lastName'], action).trim()
    firstName = pathOr('', ['payload', 'DATA', 'data', 0, 'firstName'], action).trim()
  }

  try {
    let clientCorporationName

    if (clientOrCandidate === IS_CLIENT) {
      let details = { ID: id, LASTNAME: lastName, FIRSTNAME: firstName }

      if (type === NEW_VACANCY) {
        clientCorporationName = pathOr('', ['payload', 'DATA', 'clientCorporation', 'name'], action).trim()
        const jobTitle = pathOr('', ['payload', 'DATA', 'title'], action)
        details = { ...details, JOB_TITLE: jobTitle }
      } else {
        clientCorporationName = yield call(getCompanyNameByClientContactId, id)
      }

      details = { ...details, COMPANY: clientCorporationName }

      yield put(setDataExpandView(type, weekLabel, details))
    } else if (clientOrCandidate === IS_CANDIDATE) {
      let details = { ID: id, LASTNAME: lastName, FIRSTNAME: firstName }

      if (type !== INTAKES) {
        const candidatesCategories = yield call(getCandidateCategory, id)
        details = { ...details, CATEGORY: candidatesCategories?.[0]?.name }
      }

      if (type === INTAKES) {
        const clientId = pathOr(0, ['payload', 'CLIENT_ID'], action)
        clientCorporationName = yield call(getCompanyNameByClientContactId, clientId)
        details = { ...details, COMPANY: clientCorporationName }
      } else if (type === CV_SENT) {
        details = {
          ...details,
          JOB_TITLE: action?.payload?.DATA?.jobOrder?.title ?? '',
          ID_JOB_TITLE: action?.payload?.DATA?.jobOrder?.id,
        }
      }

      yield put(setDataExpandView(type, weekLabel, details))
    }
  } catch (e) {
    //
  }
}

export default function expandViewSagas() {
  return [takeEvery(GET_DETAIL_DATA, getDetailDataSaga)]
}
