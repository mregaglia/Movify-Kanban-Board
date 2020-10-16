import React, { useEffect, useState } from "react";
import WeeklySpeed from './WeeklySpeed'
import { getEmployees } from "./employees.actions"
import { getDataEmployee } from "./dataemployee.actions"
import { getDate } from './reporting.action'
import { connect } from "react-redux";
import { string, object } from "prop-types";
import SelectEmployees from "./SelectEmployees"
import { pathOr } from "ramda";
import styled from 'styled-components'
import { getLast4weeksDate } from '../utils/date'
import Table from "./Table"

export const BUSINESS_MANAGER = "Business Manager"
export const SOURCING_OFFICER = "Sourcing Officer"

const Container = styled.div({
    display: "flex",
    flexWrap: "wrap",
    padding: "15px",
    justifyContent: "center",
    div: {
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

const Reporting = ({ getEmployees, employeeSelected, getDate, occupation }) => {
    const [employeeOccupation, setEmployeeOccupation] = useState("");

    useEffect(() => {
        getEmployees();
        getDate(getLast4weeksDate())
    }, [])

    useEffect(() => {
        setEmployeeOccupation(employeeSelected.occupation)
    }, [employeeSelected]);

    return (
        <div>
            <SelectEmployees />
            <Container>
                <div>
                    <BoxGauge>
                        {
                            (employeeOccupation === BUSINESS_MANAGER || employeeOccupation === SOURCING_OFFICER) &&
                            <p>C'est ici que sera la jauge</p>
                        }
                    </BoxGauge>
                </div>
                <div>
                    <BoxTable>
                        {
                            (employeeOccupation === BUSINESS_MANAGER || employeeOccupation === SOURCING_OFFICER) &&
                            <Table />
                        }
                    </BoxTable>
                    {
                        (occupation === BUSINESS_MANAGER || occupation === SOURCING_OFFICER) && <WeeklySpeed />
                    }
                </div>
            </Container>
        </div >
    )
}

Reporting.propTypes = {
    employeeSelected: object,
    occupation: string
};

export default connect(
    state => ({
        employeeSelected: pathOr([], ["employees", "employeeSelected"], state),
        occupation: pathOr([], ["employees", "employeeSelected", "occupation"], state)
    }),
    { getEmployees, getDataEmployee, getDate }
)(Reporting);