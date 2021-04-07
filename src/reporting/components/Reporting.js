import React, { useEffect } from "react";
import styled from 'styled-components'
import SelectEmployees from "./SelectEmployees"
import { getEmployees } from "../employees/employees.actions"
import { connect } from "react-redux";
import { setEmployeeSelected, getEmployeeAccessibleData } from '../employees/employees.actions'
import { setLoadingData } from '../kpi/kpi.actions'
import { array, bool, func, object, string, number } from "prop-types";
import { path, isEmpty } from "ramda";
import TableData from "./TableData";
import TablePercentage from './TablePercentage'
import Loader from 'react-loader-spinner'
import GaugeComponent from './GaugeComponent'
import { initializeEmployeeSelected } from '../../utils/employees'
import { getGaugeLimit, initializeStateWeeklySpeedCalcul } from '../weeklySpeed/weeklySpeed.action'
import {
    REPORTING_OWNER
} from '../../auth/user.sagas'
import { initializeExpandView } from '../expandView/expandView.action'

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

const Reporting = ({ initializeExpandView, initializeStateWeeklySpeedCalcul, setLoadingData, getGaugeLimit, getEmployees, employeeSelected, isLoadingKpi, setEmployeeSelected, userConnectedId, userConnectedOccupation, getEmployeeAccessibleData, employeeIdAccess }) => {

    useEffect(() => {
        if (!userConnectedOccupation.includes(REPORTING_OWNER)) {
            let initializedEmployeeConnected = initializeEmployeeSelected(userConnectedId, userConnectedOccupation)

            setEmployeeSelected(initializedEmployeeConnected);

            if (!isEmpty(employeeIdAccess)) {
                getEmployeeAccessibleData(employeeIdAccess)
            }
        } else {
            getEmployees();
        }
    }, [employeeIdAccess, getEmployeeAccessibleData, getEmployees, setEmployeeSelected, userConnectedId, userConnectedOccupation])

    useEffect(() => {
        setLoadingData(true)
        initializeStateWeeklySpeedCalcul()
        getGaugeLimit()
        initializeExpandView()
    }, [employeeSelected, getGaugeLimit, setLoadingData, initializeExpandView, initializeStateWeeklySpeedCalcul])

    return (
        <div>
            {
                (userConnectedOccupation.includes(REPORTING_OWNER) || !isEmpty(employeeIdAccess)) && <SelectEmployees />
            }

            <Container>
                {
                    (!isEmpty(employeeSelected) && isLoadingKpi) && (
                        <div>
                            <Loader
                                type="Rings"
                                color="#6BD7DA"
                                height={100}
                                width={100}
                            />
                        </div>
                    )
                }
                {
                    (!isEmpty(employeeSelected) && !isLoadingKpi) && (
                        <>
                            <StyledGauge />
                            <StyledTableData />
                            <StyledTablePercentage />
                        </>
                    )
                }
            </Container>

        </div >
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
    initializeExpandView: func
};

export default connect(
    state => ({
        employeeSelected: path(["employees", "employeeSelected"], state),
        isLoadingKpi: path(["kpi", "isLoadingKpi"], state),
        userConnectedOccupation: path(["user", "accessToReportingTab", "occupation"], state),
        userConnectedId: path(["user", "accessToReportingTab", "userId"], state),
        employeeIdAccess: path(["user", "accessToReportingTab", "employeeIdAccess"], state),
    }),
    { getGaugeLimit, getEmployees, setEmployeeSelected, getEmployeeAccessibleData, setLoadingData, initializeStateWeeklySpeedCalcul, initializeExpandView }
)(Reporting);