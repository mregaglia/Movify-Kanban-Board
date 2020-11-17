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
     //const userId = 13034
    // const jacquelineOccupation = "Talent Acquisition"

    //const userId = 11579
    //const occupation = "Business Manager"

    const userId = yield call(getUserId)
    const occupation = yield call(getUserOccupation, userId)

    console.log("identifiant", userId, occupation)
    let employeeIdAccess = []

    let hasAccess = roleToAccessReporting.some(role => occupation.includes(role))
    console.log(hasAccess, "identifiant", userId, occupation)

    if (!occupation.includes(REPORTING_OWNER)) {
      let dataEmployeeFiltered = getIdEmployeeAccessAndOccupation(occupation)
      console.log("1")
      employeeIdAccess = dataEmployeeFiltered.tabEmployeesIdsAccessibleByUserConnected
      console.log("2")
      occupation = dataEmployeeFiltered.userConnectedOccupation
      console.log("3")
    }
    console.log("end of method")
    yield put(updateReportingAccess(hasAccess, occupation, userId, employeeIdAccess))
  } catch (e) {
    //
  }
}

export default function userSaga() {
  return [];
}