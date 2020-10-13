import React, { useEffect } from "react";
import { getEmployees } from "./employees.actions"
import { connect } from "react-redux";
import { array } from "prop-types";
import SelectEmployees from "./SelectEmployees"


const Reporting = ({ getEmployees, employees }) => {
    useEffect(() => {
        getEmployees()
    }, [])

    return (
        <div>
            <SelectEmployees />
        </div>

    )
}

Reporting.propTypes = {
    employees: array
};

export default connect(
    state => ({

    }),
    { getEmployees }
)(Reporting);