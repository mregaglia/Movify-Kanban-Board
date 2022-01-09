import React, { useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'
import { array, func, object } from 'prop-types'
import { path, pathOr } from 'ramda'
import styled from 'styled-components'

import useQuery from '../../hooks/useQuery'
import { getValuesFromEmployees } from '../../utils/employees'
import { setEmployeeSelected } from '../employees/employees.actions'

const Container = styled.div({
  width: '17%',
  margin: '0 auto',
  position: 'relative',
  zIndex: '1',
})

const SelectEmployees = ({ employees, setEmployeeSelected: setEmployeeSelectedProp, employeeSelected }) => {
  const history = useHistory()
  const query = useQuery()
  const options = getValuesFromEmployees(employees)
  const defaultValue = options.find(({ value }) => Number(value) === employeeSelected?.id)

  const onChangeEmployee = useCallback(
    (newlySelectedEmployee) => {
      const newlySelectedEmployeeId =
        typeof newlySelectedEmployee === 'number' ? newlySelectedEmployee : parseInt(newlySelectedEmployee.value)
      const newEmployee = employees.find(({ id }) => id === newlySelectedEmployeeId)
      setEmployeeSelectedProp(newEmployee)
    },
    [employees, setEmployeeSelectedProp]
  )

  useEffect(() => {
    const employeeId = employeeSelected?.id

    if (employeeId) {
      query.set('employee', employeeId)
      onChangeEmployee(employeeId)
    } else {
      query.delete('employee')
    }
    history.push({ search: query.toString() })
    // eslint-disable-next-line
    }, [employeeSelected, history, onChangeEmployee])

  return (
    <Container>
      <Select options={options} onChange={onChangeEmployee} defaultValue={defaultValue} />
    </Container>
  )
}

SelectEmployees.propTypes = {
  employees: array,
  setEmployeeSelected: func,
  employeeSelected: object,
}

export default connect(
  (state) => ({
    employees: pathOr([], ['employees', 'employeesToSet'], state),
    employeeSelected: path(['employees', 'employeeSelected'], state),
  }),
  { setEmployeeSelected }
)(SelectEmployees)
