import { all } from "redux-saga/effects";
import authSagas from "../auth/auth.sagas";
import kanbanSagas from "../kanban/kanban.sagas";

export default function* rootSaga() {
  yield all([...authSagas(), ...kanbanSagas()]);
}
