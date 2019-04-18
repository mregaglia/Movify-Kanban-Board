import { combineReducers } from "redux";
import auth from "../auth/auth.reducer";
import kanban from "../kanban/kanban.reducer";

export default combineReducers({ auth, kanban });
