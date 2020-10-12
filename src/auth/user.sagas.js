import { call, put} from "redux-saga/effects";

import{
    updateReportingAccess
} from "./user.actions"

import {
  getUserId,
  getUserOccupation
} from "./user.service"

export function* getReportingAccess(){
    try{
      const userId = yield call(getUserId)
      const occupation = yield call(getUserOccupation, userId)
      let hasAccess = occupation.includes("Reporting Owner")
      yield put(updateReportingAccess(hasAccess))
    }catch(e){
      //
    }
  }

  export default function userSaga() {
      return [];
  }