import React, { useEffect, useState } from "react";
import { getEmployees } from "./employees.actions"
import { connect } from "react-redux";
import { array, object } from "prop-types";
import SelectEmployees from "./SelectEmployees"
import { pathOr } from "ramda";
import BusinessManager from './BusinessManager'
import TalentAcquisition from './TalentAcquisition'
import WeeklySpeed from './WeeklySpeed'
import { isEmpty, isNil } from "ramda";

const BUSINESS_MANAGER = "Business Manager"
const SOURCING_OFFICER = "Sourcing Officer"

const Reporting = ({ getEmployees, employeeSelected }) => {
    const [employeeOccupation, setEmployeeOccupation] = useState("");

    useEffect(() => {
        getEmployees();
        setEmployeeOccupation(employeeSelected.occupation)
    }, [employeeSelected]);

    return (
        <div>
            {
                console.log(employeeOccupation)
            }
            <SelectEmployees />
            {
                employeeOccupation === BUSINESS_MANAGER &&
                <BusinessManager />

            }

            {
                (employeeOccupation === BUSINESS_MANAGER || employeeOccupation === SOURCING_OFFICER) &&
                <TalentAcquisition />
            }

            {
                (employeeOccupation !== "" &&
                    <WeeklySpeed />
                )
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