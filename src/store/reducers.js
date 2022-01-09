import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import addCandidate from '../addCandidate/addCandidate.reducer'
import auth from '../auth/auth.reducer'
import user from '../auth/user.reducer'
import kanban from '../kanban/kanban.reducer'
import priorityFilter from '../priorityFilter/priorityFilter.reducer'
import recruitment from '../recruitment/recruitment.reducer'
import employees from '../reporting/employees/employees.reducer'
import expandView from '../reporting/expandView/expandView.reducer'
import kpi from '../reporting/kpi/kpi.reducer'
import weeklySpeed from '../reporting/weeklySpeed/weeklySpeed.reducer'
import transition from '../transition/transition.reducer'

export default combineReducers({
  form,
  auth,
  kanban,
  priorityFilter,
  addCandidate,
  recruitment,
  transition,
  user,
  employees,
  kpi,
  weeklySpeed,
  expandView,
})
