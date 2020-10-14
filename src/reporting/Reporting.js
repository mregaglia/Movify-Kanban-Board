import React, { useEffect, useState } from "react";
import { getEmployees } from "./employees.actions"
import { connect } from "react-redux";
import { array, object } from "prop-types";
import SelectEmployees from "./SelectEmployees"
import { pathOr } from "ramda";
import BusinessManager from './BusinessManager'
import TalentAcquisition from './TalentAcquisition'
import WeeklySpeed from './WeeklySpeed'
import styled from 'styled-components'

export const BUSINESS_MANAGER = "Business Manager"
export const SOURCING_OFFICER = "Sourcing Officer"

const Container = styled.div({
    display: "flex",
    flexWrap: "wrap",
    padding: "15px",
    justifyContent: "center",
    div : {
        padding: "10px",
    }

})

const BoxTable = styled.div({
    flex: "2",
    order: "2"
})

const BoxGauge = styled.div({
    flex: "1",
    order: "1"
})

const Reporting = ({ getEmployees, employeeSelected }) => {
    const [employeeOccupation, setEmployeeOccupation] = useState("");

    useEffect(() => {
        getEmployees();
        setEmployeeOccupation(employeeSelected.occupation)
    }, [employeeSelected]);

    return (
        <div>
            <SelectEmployees />
            <Container>
                <div>
                    <BoxGauge>
                        <div>
                            <p>C'est ici que sera la jauge</p>
                        </div>

                    </BoxGauge>
                </div>
                <div>
                    <BoxTable>

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


                    </BoxTable>
                </div>
                    

            </Container>

        </div >

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