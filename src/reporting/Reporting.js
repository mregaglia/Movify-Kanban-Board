import React, { useEffect, useState } from "react";
import { getEmployees } from "./employees.actions"
import { connect } from "react-redux";
import  { array, object } from "prop-types";
import SelectEmployees from "./SelectEmployees"
import { pathOr } from "ramda";


const Reporting = ({ getEmployees, employeeSelected }) => {
    const [employeeOccupation, setEmployeeOccupation] = useState("");

    useEffect(() => {
        getEmployees();
        setEmployeeOccupation(employeeSelected.occupation)
    }, [employeeSelected]);

    return (
        <div>
            <SelectEmployees />
            {
                employeeOccupation === "Business Manager" && 
                <p>Business Manager</p>
            }

            {
                employeeOccupation  === "Sourcing Officer" && 
                <p>Sourcing Officer</p>
            }
        </div>

    )
}

Reporting.propTypes = {
    employees: array,
    employeeSelected: object
};

export default connect(
    state => ({
        employeeSelected: pathOr([], ["employees", "employeeSelected"], state)
    }),
    { getEmployees }
)(Reporting);