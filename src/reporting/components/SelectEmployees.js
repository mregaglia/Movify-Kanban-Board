import React from "react";
import Select from 'react-select'
import { setEmployeeSelected } from '../employees/employees.actions'
import { setKpiLoading, setLoadingYTDTotal, setLoadingYTDAverage, setLoadingYTDConversion, setCvSentIsLoadingWeek } from '../kpi/kpi.actions'
import { connect } from "react-redux";
import { pathOr } from "ramda";
import { array, func } from "prop-types";
import styled from "styled-components"
import { getValuesFromEmployees } from '../../utils/employees'

const Container = styled.div({
    width: "30%",
    margin: "0 auto",
    position: "relative",
    zIndex: "1"
})

const SelectCustomized = styled(Select)`
position: relative; z-index: 1000;
`

const SelectEmployees = ({ employees, setEmployeeSelected, setKpiLoading, setLoadingYTDTotal, setLoadingYTDAverage, setLoadingYTDConversion, setCvSentIsLoadingWeek }) => {

    const options = getValuesFromEmployees(employees)

    const onChangeInput = (employeeSelected) => {
        for (let i = 0; i < employees.length; i++) {
            if (parseInt(employeeSelected.value) === employees[i].id) {
                setEmployeeSelected(employees[i]);
                setKpiLoading(true)
                setCvSentIsLoadingWeek(true)
                setLoadingYTDTotal(true)
                setLoadingYTDAverage(true)
                setLoadingYTDConversion(true)
                break;
            }
        }
    }

    return (
        <>
            <Container>
                <SelectCustomized
                    options={options}
                    onChange={onChangeInput}
                />
            </Container>
        </>

    )
}

SelectEmployees.propTypes = {
    employees: array,
    setEmployeeSelected: func,
    setKpiLoading: func,
    setLoadingYTDTotal: func,
    setLoadingYTDAverage: func,
    setLoadingYTDConversion: func,
    setCvSentIsLoadingWeek: func
};

export default connect(
    state => ({
        employees: pathOr([], ["employees", "employeesToSet"], state),
    }),
    { setEmployeeSelected, setKpiLoading, setLoadingYTDTotal, setLoadingYTDAverage, setLoadingYTDConversion, setCvSentIsLoadingWeek }
)(SelectEmployees);