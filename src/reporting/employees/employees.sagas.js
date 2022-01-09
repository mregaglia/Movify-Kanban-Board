import { prop } from 'ramda'
import { call, put, select, takeLatest } from 'redux-saga/effects'

import { sortTableEmployee } from '../../utils/employees'
import { getEmployeeKpi } from '../kpi/kpi.actions'

import { GET_EMPLOYEE_ACCESSIBLE_DATA, GET_EMPLOYEES, SET_EMPLOYEE_SELECTED, setEmployees } from './employees.actions'
import { getBusinessManagerSourcingOfficerAndTalentAcquisition, getUserById } from './employees.service'

export function* getEmployees() {
  try {
    const currentUser = yield select((state) => state.user)
    const usersToWhichLoggedInUserHasAccess = currentUser?.accessToReportingTab?.usersToWhichLoggedInUserHasAccess
    const currentUserId = currentUser?.accessToReportingTab?.userId
    // We escape these values to make sure we have a valid where clause
    const userNames = usersToWhichLoggedInUserHasAccess?.map((user) => `'${user?.raw}'`)?.join(',')
    const employees = yield call(getBusinessManagerSourcingOfficerAndTalentAcquisition, currentUserId, userNames)
    const sortedEmployees = sortTableEmployee(employees.data)
    yield put(setEmployees(sortedEmployees))
  } catch (e) {
    //
  }
}

export function* getEmployeesById(action) {
  const idsEmployee = action.payload
  let employeeData = []
  try {
    for (let i = 0; i < idsEmployee.length; i += 1) {
      const data = yield call(getUserById, idsEmployee[i])
      employeeData = [...employeeData, ...data]
    }
    const sortedEmployees = sortTableEmployee(employeeData)
    yield put(setEmployees(sortedEmployees))
  } catch (e) {
    //
  }
}

export function* onEmployeeSelected(action) {
  yield put(getEmployeeKpi(prop('payload', action)))
}

export default function employeeSagas() {
  return [
    takeLatest(GET_EMPLOYEES, getEmployees),
    takeLatest(SET_EMPLOYEE_SELECTED, onEmployeeSelected),
    takeLatest(GET_EMPLOYEE_ACCESSIBLE_DATA, getEmployeesById),
  ]
}
