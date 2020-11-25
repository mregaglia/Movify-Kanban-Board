import React from "react";
import Select from 'react-select'
import { setEmployeeSelected } from '../employees/employees.actions'

import { connect } from "react-redux";
import { pathOr } from "ramda";
import { array } from "prop-types";
import styled from "styled-components"
import { getValuesFromEmployees } from '../../utils/employees'

const Container = styled.div({
    width: "17%",
    margin: "0 auto",
    position: "relative",
    zIndex: "1"
})

const SelectEmployees = ({ employees, setEmployeeSelected }) => {

    const options = getValuesFromEmployees(employees)

    const onChangeInput = (employeeSelected) => {
        for (let i = 0; i < employees.length; i++) {
            if (parseInt(employeeSelected.value) === employees[i].id) {
                setEmployeeSelected(employees[i]);
                break;
            }
        }
    }

    return (
        <>
            <Container>
                <Select
                    options={options}
                    onChange={onChangeInput}
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
    }),
    { setEmployeeSelected,  }
)(SelectEmployees);