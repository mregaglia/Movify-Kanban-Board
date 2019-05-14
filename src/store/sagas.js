import { all } from "redux-saga/effects";
import authSagas from "../auth/auth.sagas";
import kanbanSagas from "../kanban/kanban.sagas";
import departmentFilterSagas from "../kanban/departmentFilter/departmentFilter.sagas";
import addCandidateSagas from "../kanban/addCandidate/addCandidate.sagas";

export default function* rootSaga() {
  yield all([
    ...authSagas(),
    ...kanbanSagas(),
    ...departmentFilterSagas(),
    ...addCandidateSagas()
  ]);
}
