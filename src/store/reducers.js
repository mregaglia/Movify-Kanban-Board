import { combineReducers } from "redux";
import auth from "../auth/auth.reducer";
import kanban from "../kanban/kanban.reducer";
import departmentFilter from "../kanban/departmentFilter/departmentFilter.reducer";

export default combineReducers({ auth, kanban, departmentFilter });
