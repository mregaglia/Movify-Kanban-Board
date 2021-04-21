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
    const usernamesToWhichLoggedInUserHasAccessString = occupation.split('@').pop()

    let usersToWhichLoggedInUserHasAccess = []

    if (occupation.includes('@')) {
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

    const cleanOccupation = occupation.split('@')[0]
    const hasAccess = roleToAccessReporting.some(role => cleanOccupation.includes(role))

    yield put(updateReportingAccess(hasAccess, cleanOccupation, userId, employeeIdAccess, usersToWhichLoggedInUserHasAccess))
  } catch (e) {
    //
  }
}

export default function userSaga() {
  return [];
}