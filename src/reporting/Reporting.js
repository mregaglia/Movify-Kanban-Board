import React, { useEffect } from "react";
import TableData from "./TableData"
import styled from 'styled-components'
import SelectEmployees from "./SelectEmployees"
import TablePercentage from "./TablePercentage"
import { getEmployees } from "./employees.actions"
import { getKpiNoteEmployee, kpiResetData, getKpiJobOfferEmployee } from "./kpi.actions"
import { getDate } from './reporting.action'
import { connect } from "react-redux";
import { string, number, array } from "prop-types";
import { pathOr, path } from "ramda";
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

const Reporting = ({ getEmployees, getDate, occupation }) => {

    useEffect(() => {
        getEmployees();
        getDate(getLast4weeksDate())
    }, [getEmployees, getDate])

    return (
        <div>
            <SelectEmployees />
            <Container>
                <div>
                    <BoxGauge>
                        {
                            (occupation === BUSINESS_MANAGER || occupation === SOURCING_OFFICER) &&
                            <p>C'est ici que sera la jauge</p>
                        }
                    </BoxGauge>
                </div>
                <div>
                    <BoxTable>
                        {
                            (occupation === BUSINESS_MANAGER || occupation === SOURCING_OFFICER) &&
                            <TableData />
                        }
                    </BoxTable>
                </div>
                <div>
                    <BoxTable>
                        {
                            (occupation === BUSINESS_MANAGER || occupation === SOURCING_OFFICER) &&
                            <TablePercentage />
                        }
                    </BoxTable>
                </div>
            </Container>
        </div >
    )
}

Reporting.propTypes = {
    occupation: string,
    employeeId: number,
    dates: array
};

export default connect(
    state => ({
        occupation: path(["employees", "employeeSelected", "occupation"], state),
        employeeId: path(["employees", "employeeSelected", "id"], state),
        dates: pathOr([], ["reporting", "dates"], state)
    }),
    { getEmployees, getDate, getKpiNoteEmployee, kpiResetData, getKpiJobOfferEmployee }
)(Reporting);