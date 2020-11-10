import { call, put } from "redux-saga/effects";

import {
  updateReportingAccess
} from "./user.actions"

import {
  getUserId,
  getUserOccupation
} from "./user.service"

import {
  getIdEmployeeAccessAndOccupation
} from '../utils/employees'

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
    // const jacquelineUserId = 11579
    // const jacquelineOccupation = "Talent Acquisition"

    const userId = 9788
    const occupation = "Business Manager 11579 9788"

    // const userId = yield call(getUserId)
    // const occupation = yield call(getUserOccupation, userId)

    let employeeIdAccess = []

    let hasAccess = roleToAccessReporting.some(role => occupation.includes(role))

    if(!occupation.includes(REPORTING_OWNER)) {
      let dataEmployeeFiltered = getIdEmployeeAccessAndOccupation(occupation)
      employeeIdAccess = dataEmployeeFiltered.tabEmployeesIdsAccessibleByUserConnected
      occupation = dataEmployeeFiltered.userConnectedOccupation
    }
    
    yield put(updateReportingAccess(hasAccess, occupation, userId, employeeIdAccess))
  } catch (e) {
    //
  }
}

export default function userSaga() {
  return [];
}