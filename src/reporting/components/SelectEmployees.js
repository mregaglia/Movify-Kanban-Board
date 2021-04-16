import React, { useCallback, useEffect } from "react";
import Select from 'react-select'
import { useHistory } from "react-router-dom";
import { setEmployeeSelected } from '../employees/employees.actions'

import { connect } from "react-redux";
import { pathOr, path } from "ramda";
import { array } from "prop-types";
import styled from "styled-components"
import { getValuesFromEmployees } from '../../utils/employees'
import useQuery from '../../hooks/useQuery'

const Container = styled.div({
    width: "17%",
    margin: "0 auto",
    position: "relative",
    zIndex: "1"
})

const SelectEmployees = ({ employees, setEmployeeSelected, employeeSelected }) => {
    const history = useHistory()
    const query = useQuery()
    const options = getValuesFromEmployees(employees)
    const defaultValue = options.find(({ value }) => Number(value) === employeeSelected?.id)

    const onChangeEmployee = useCallback((newlySelectedEmployee) => {
        const newlySelectedEmployeeId = typeof newlySelectedEmployee === 'number' ? newlySelectedEmployee : parseInt(newlySelectedEmployee.value)
        const newEmployee = employees.find(({ id }) => id === newlySelectedEmployeeId)
        setEmployeeSelected(newEmployee)
    }, [employees, setEmployeeSelected])

    useEffect(() => {
        const employeeId = employeeSelected?.id;

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
        <>
            <Container>
                <Select
                    options={options}
                    onChange={onChangeEmployee}
                    defaultValue={defaultValue}
                />
            </Container>
        </>

    )
}

SelectEmployees.propTypes = {
    employees: array,
};

export default connect(
    state => ({
        employees: pathOr([], ["employees", "employeesToSet"], state),
        employeeSelected: path(["employees", "employeeSelected"], state),
    }),
    { setEmployeeSelected,  }
)(SelectEmployees);