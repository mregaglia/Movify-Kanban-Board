import { all } from 'redux-saga/effects'

import addCandidateSagas from '../addCandidate/addCandidate.sagas'
import authSagas from '../auth/auth.sagas'
import userSaga from '../auth/user.sagas'
import kanbanSagas from '../kanban/kanban.sagas'
import priorityFilterSagas from '../priorityFilter/priorityFilter.sagas'
import recruitmentSagas from '../recruitment/recruitment.sagas'
import employeeSagas from '../reporting/employees/employees.sagas'
import expandViewSagas from '../reporting/expandView/expandView.sagas'
import kpiSagas from '../reporting/kpi/kpi.sagas'
import weeklySpeedSagas from '../reporting/weeklySpeed/weeklySpeed.sagas'
import transitionSagas from '../transition/transition.sagas'

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
    ...expandViewSagas(),
  ])
}
