import { takeLatest } from "redux-saga/effects";
import { GET_RECRUITMENT } from "./recruitment.actions";

export function* getRecruitment() {}

export default function kanbanSagas() {
  return [takeLatest(GET_RECRUITMENT, getRecruitment)];
}
