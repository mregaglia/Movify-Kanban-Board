import { call, put } from "redux-saga/effects";

import {
  updateReportingAccess
} from "./user.actions"

import {
  getUserId,
  getUserOccupation
} from "./user.service"

export const REPORTING_OWNER = "Reporting Owner"
export const BUSINESS_MANAGER = "Business Manager"
export const TALENT_ACQUISITION = "Talent Acquisition"
export const SOURCING_OFFICER = "Sourcing Officer"


const roleToAccessReporting = [
  "Reporting Owner",
  "Business Manager",
  "Talent Acquisition",
  "Sourcing Officer"
]

export function* getReportingAccess() {
  try {
    const userId = yield call(getUserId)
    const occupation = yield call(getUserOccupation, userId)

    const mich = 'Business Manager & Reporting Owner@louis.verdonck+john.casse'

    const usernamesToWhichLoggedInUserHasAccessString = mich.split('@').pop()

    let usersToWhichLoggedInUserHasAccess = []

    if (mich.includes('@')) {
      usersToWhichLoggedInUserHasAccess = usernamesToWhichLoggedInUserHasAccessString.split('+')
    }

    usersToWhichLoggedInUserHasAccess = usersToWhichLoggedInUserHasAccess?.map((user) => {
      let firstName = user.split('.')[0]
      firstName = firstName?.replace(/^./, firstName[0]?.toUpperCase()) ?? ''
      let lastName = user.split('.')[1]
      lastName = lastName?.replace(/^./, lastName[0]?.toUpperCase()) ?? ''
      return {
        raw: user,
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`
      }
    })

    let employeeIdAccess = []

    const hasAccess = roleToAccessReporting.some(role => occupation.includes(role))

    yield put(updateReportingAccess(hasAccess, occupation, userId, employeeIdAccess, usersToWhichLoggedInUserHasAccess))
  } catch (e) {
    //
  }
}

export default function userSaga() {
  return [];
}