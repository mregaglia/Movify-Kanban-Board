import React from "react";
import Select from 'react-select'
import { getEmployees } from "./employees.actions"
import { connect } from "react-redux";
import { pathOr } from "ramda";
import { array } from "prop-types";

const styles = {
    select: {
        width: "100%",
        maxWidth: 300
    }
}

const SelectEmployees = ({ employees, length }) => {
    const options = getValuesFromEmployees(employees)
    return (
        <div style={styles.select}>
            <Select
                options={options}
                onChange={onChangeInput}
            />
        </div>
    )
}

function onChangeInput(value) {
    console.log(value)
}

function getValuesFromEmployees(employees) {
    return employees.map((employee) => {
        return ({ value: `${employee.id}`, label: employee.firstName + " " + employee.lastName })
    })
}

SelectEmployees.propTypes = {
    employees: array
};

export default connect(
    state => ({
        employees: pathOr([], ["employees", "employeesToSet", 'data'], state),
        length: pathOr([], ["employees", "employeesToSet", 'count'], state),
    }),
    { getEmployees }
)(SelectEmployees);