import React, { useEffect } from "react";
import { getEmployees } from "./employees.actions"
import { connect } from "react-redux";

const Reporting = ({getEmployees}) => {
    useEffect(() => {
        getEmployees()
    }, [])

    return (
        <select name="employee" id="employee">

        </select>
    )
}

Reporting.propTypes = {

};

export default connect(
    state => ({

    }),
    { getEmployees }
)(Reporting);