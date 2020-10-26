import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import auth from "../auth/auth.reducer";
import kanban from "../kanban/kanban.reducer";
import priorityFilter from "../priorityFilter/priorityFilter.reducer";
import addCandidate from "../addCandidate/addCandidate.reducer";
import recruitment from "../recruitment/recruitment.reducer";
import transition from "../transition/transition.reducer";

export default combineReducers({
  form,
  auth,
  kanban,
  priorityFilter,
  addCandidate,
  recruitment,
  transition
});
