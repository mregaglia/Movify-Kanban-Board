import { all } from "redux-saga/effects";
import authSagas from "../auth/auth.sagas";
import kanbanSagas from "../kanban/kanban.sagas";
import departmentFilterSagas from "../departmentFilter/departmentFilter.sagas";
import addCandidateSagas from "../kanban/addCandidate/addCandidate.sagas";
import recruitmentSagas from "../recruitment/recruitment.sagas";
import transitionSagas from "../transition/transition.sagas";

export default function* rootSaga() {
  yield all([
    ...authSagas(),
    ...kanbanSagas(),
    ...departmentFilterSagas(),
    ...addCandidateSagas(),
    ...recruitmentSagas(),
    ...transitionSagas()
  ]);
}
