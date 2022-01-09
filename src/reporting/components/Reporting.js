import React, { useEffect } from 'react'
import Loader from 'react-loader-spinner'
import { connect } from 'react-redux'
import { array, bool, func, number, object, string } from 'prop-types'
import { isEmpty, path } from 'ramda'
import styled from 'styled-components'

import { REPORTING_OWNER } from '../../auth/user.sagas'
import { initializeEmployeeSelected } from '../../utils/employees'
import { getEmployeeAccessibleData, getEmployees, setEmployeeSelected } from '../employees/employees.actions'
import { initializeExpandView } from '../expandView/expandView.action'
import { setLoadingData } from '../kpi/kpi.actions'
import { getGaugeLimit, initializeStateWeeklySpeedCalcul } from '../weeklySpeed/weeklySpeed.action'

import GaugeComponent from './GaugeComponent'
import SelectEmployees from './SelectEmployees'
import TableData from './TableData'
import TablePercentage from './TablePercentage'

const Container = styled.div`
  padding-top: 60px;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 1500px) {
    display: grid;
    grid-auto-flow: column;
  }
`

const StyledTableData = styled(TableData)`
  @media only screen and (max-width: 1500px) {
    grid-row: 1;
    grid-column: 1;
  }
`

const StyledTablePercentage = styled(TablePercentage)`
  @media only screen and (max-width: 1500px) {
    grid-row: 1;
  }
`

const StyledGauge = styled(GaugeComponent)`
  @media only screen and (max-width: 1500px) {
    justify-self: end;
    grid-column: span 2;
    margin-top: -11.25rem;
    margin-right: 3rem;
    grid-row: 2;
    width: auto;
  }
`

const Reporting = ({
  initializeExpandView: initializeExpandViewProp,
  initializeStateWeeklySpeedCalcul: initializeStateWeeklySpeedCalculProp,
  setLoadingData: setLoadingDataProp,
  getGaugeLimit: getGaugeLimitProp,
  getEmployees: getEmployeesProp,
  employeeSelected,
  isLoadingKpi,
  setEmployeeSelected: setEmployeeSelectedProp,
  userConnectedId,
  userConnectedOccupation,
  getEmployeeAccessibleData: getEmployeeAccessibleDataProp,
  employeeIdAccess,
}) => {
  useEffect(() => {
    if (!userConnectedOccupation.includes(REPORTING_OWNER)) {
      const initializedEmployeeConnected = initializeEmployeeSelected(userConnectedId, userConnectedOccupation)

      setEmployeeSelectedProp(initializedEmployeeConnected)

      if (!isEmpty(employeeIdAccess)) {
        getEmployeeAccessibleDataProp(employeeIdAccess)
      }
    } else {
      getEmployeesProp()
    }
  }, [
    employeeIdAccess,
    getEmployeeAccessibleDataProp,
    getEmployeesProp,
    setEmployeeSelectedProp,
    userConnectedId,
    userConnectedOccupation,
  ])

  useEffect(() => {
    setLoadingDataProp(true)
    initializeStateWeeklySpeedCalculProp()
    getGaugeLimitProp()
    initializeExpandViewProp()
  }, [
    employeeSelected,
    getGaugeLimitProp,
    setLoadingDataProp,
    initializeExpandViewProp,
    initializeStateWeeklySpeedCalculProp,
  ])

  return (
    <div>
      {(userConnectedOccupation.includes(REPORTING_OWNER) || !isEmpty(employeeIdAccess)) && <SelectEmployees />}

      <Container>
        {!isEmpty(employeeSelected) && isLoadingKpi && (
          <div>
            <Loader type="Rings" color="#6BD7DA" height={100} width={100} />
          </div>
        )}
        {!isEmpty(employeeSelected) && !isLoadingKpi && (
          <>
            <StyledGauge />
            <StyledTableData />
            <StyledTablePercentage />
          </>
        )}
      </Container>
    </div>
  )
}

Reporting.propTypes = {
  employeeSelected: object,
  isLoadingKpi: bool,
  userConnectedId: number,
  userConnectedOccupation: string,
  getEmployees: func,
  getEmployeeAccessibleData: func,
  employeeIdAccess: array,
  setEmployeeSelected: func,
  getGaugeLimit: func,
  setLoadingData: func,
  initializeStateWeeklySpeedCalcul: func,
  initializeExpandView: func,
}

export default connect(
  (state) => ({
    employeeSelected: path(['employees', 'employeeSelected'], state),
    isLoadingKpi: path(['kpi', 'isLoadingKpi'], state),
    userConnectedOccupation: path(['user', 'accessToReportingTab', 'occupation'], state),
    userConnectedId: path(['user', 'accessToReportingTab', 'userId'], state),
    employeeIdAccess: path(['user', 'accessToReportingTab', 'employeeIdAccess'], state),
  }),
  {
    getGaugeLimit,
    getEmployees,
    setEmployeeSelected,
    getEmployeeAccessibleData,
    setLoadingData,
    initializeStateWeeklySpeedCalcul,
    initializeExpandView,
  }
)(Reporting)
