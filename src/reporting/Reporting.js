import React, { useEffect } from "react";
import { isNil } from "ramda";
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

const Reporting = ({ getKpiJobOfferEmployee, kpiResetData, getEmployees, getKpiNoteEmployee, getDate, occupation, employeeId, dates }) => {

    useEffect(() => {
        getEmployees();
        getDate(getLast4weeksDate())
    }, [getEmployees, getDate])

    useEffect(() => {
        if(!isNil(employeeId)){
            kpiResetData();
            for(const date in dates) {
                getKpiNoteEmployee(employeeId, date.start, date.end)
                getKpiJobOfferEmployee(employeeId, date.startTimestamp, date.endTimestamp)
            }
        }
    }, [kpiResetData, employeeId, dates, getKpiNoteEmployee, getKpiJobOfferEmployee]);

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