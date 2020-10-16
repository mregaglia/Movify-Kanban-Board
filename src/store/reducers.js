import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import auth from "../auth/auth.reducer";
import kanban from "../kanban/kanban.reducer";
import departmentFilter from "../departmentFilter/departmentFilter.reducer";
import addCandidate from "../addCandidate/addCandidate.reducer";
import recruitment from "../recruitment/recruitment.reducer";
import transition from "../transition/transition.reducer";
import user from '../auth/user.reducer';
import employees from '../reporting/employees.reducer';
import reporting from '../reporting/reporting.reducer';

export default combineReducers({
  form,
  auth,
  kanban,
  departmentFilter,
  addCandidate,
  recruitment,
  transition,
  user,
  employees,
  reporting
});
