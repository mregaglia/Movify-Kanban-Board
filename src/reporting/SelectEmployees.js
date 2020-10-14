import React from "react";
import Select from 'react-select'
import { setEmployeeSelected } from "./employees.actions"
import { connect } from "react-redux";
import { pathOr } from "ramda";
import { array, object } from "prop-types";
import styled from "styled-components"
import { BUSINESS_MANAGER, SOURCING_OFFICER } from "./Reporting"

const Container = styled.div({
    width: "30%",
    margin: "0 auto"

})

const SelectEmployees = ({ employees, setEmployeeSelected }) => {

    const options = getValuesFromEmployees(employees)

    const onChangeInput = (employeeSelected) => {
        for (let i = 0; i < employees.length; i++) {
            if (parseInt(employeeSelected.value) === employees[i].id) {
                setEmployeeSelected(employees[i])
                break;
            }
        }
    }

    return (
        <Container>
            <Select
                options={options}
                onChange={onChangeInput}
            />
        </Container>
    )
}

function getValuesFromEmployees(employees) {
    return employees.map((employee) => {
        let occupationLabel = "";
        switch (employee.occupation) {
            case BUSINESS_MANAGER:
                occupationLabel = "BM";
                break;
            case SOURCING_OFFICER:
                occupationLabel = "TA";
                break;
        }
        return ({ value: `${employee.id}`, label: occupationLabel + " - " +  employee.firstName + " " + employee.lastName })
    })
}

SelectEmployees.propTypes = {
    employees: array
};

export default connect(
    state => ({
        employees: pathOr([], ["employees", "employeesToSet", 'data'], state),

    }),
    { setEmployeeSelected }
)(SelectEmployees);