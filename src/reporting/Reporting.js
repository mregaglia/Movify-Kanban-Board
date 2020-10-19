import React, { useEffect, useState } from "react";
import Table from "./Table"
import styled from 'styled-components'
import WeeklySpeed from './WeeklySpeed'
import SelectEmployees from "./SelectEmployees"
import { getEmployees } from "./employees.actions"
import { getKpiNoteEmployee, kpiResetData, getKpiJobOfferEmployee } from "./kpi.actions"
import { getDate } from './reporting.action'
import { connect } from "react-redux";
import { string, object, number, array } from "prop-types";
import { pathOr } from "ramda";
import { getLast4weeksDate } from '../utils/date'

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

const Reporting = ({ getKpiJobOfferEmployee, kpiResetData, getEmployees, employeeSelected, getKpiNoteEmployee, getDate, occupation, employeeId, dates}) => {
    const [employeeOccupation, setEmployeeOccupation] = useState("");

    useEffect(() => {
        getEmployees();
        getDate(getLast4weeksDate())
    }, [])

    useEffect(() => {
        kpiResetData()
        setEmployeeOccupation(occupation);
        dates.map((date) => {
            getKpiNoteEmployee(employeeId, date.start, date.end)
            getKpiJobOfferEmployee(employeeId, date.startTimestamp, date.endTimestamp)
        })
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
    occupation: string,
    employeeId: number,
    dates: array
};

export default connect(
    state => ({
        employeeSelected: pathOr([], ["employees", "employeeSelected"], state),
        occupation: pathOr([], ["employees", "employeeSelected", "occupation"], state),
        employeeId: pathOr([], ["employees", "employeeSelected", "id"], state),
        dates: pathOr([], ["reporting", "dates"], state)
    }),
    { getEmployees, getDate, getKpiNoteEmployee, kpiResetData, getKpiJobOfferEmployee }
)(Reporting);