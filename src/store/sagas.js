import { all } from "redux-saga/effects";
import authSagas from "../auth/auth.sagas";
import kanbanSagas from "../kanban/kanban.sagas";
import priorityFilterSagas from "../priorityFilter/priorityFilter.sagas";
import addCandidateSagas from "../addCandidate/addCandidate.sagas";
import recruitmentSagas from "../recruitment/recruitment.sagas";
import transitionSagas from "../transition/transition.sagas";
import userSaga from "../auth/user.sagas"
import employeeSagas from "../reporting/employees/employees.sagas"
import kpiSagas from "../reporting/kpi/kpi.sagas"
import weeklySpeedSagas from "../reporting/weeklySpeed/weeklySpeed.sagas"
import expandViewSagas from '../reporting/expandView/expandView.sagas'

export default function* rootSaga() {
  yield all([
    ...authSagas(),
    ...kanbanSagas(),
    ...priorityFilterSagas(),
    ...addCandidateSagas(),
    ...recruitmentSagas(),
    ...transitionSagas(),
    ...userSaga(),
    ...employeeSagas(),
    ...kpiSagas(), 
    ...weeklySpeedSagas(),
    ...expandViewSagas()
  ]);
}
