import React, { useEffect } from "react";
import TableData from "./TableData"
import styled from 'styled-components'
import SelectEmployees from "./SelectEmployees"
import TablePercentage from "./TablePercentage"
import { getEmployees } from "../employees/employees.actions"
import { connect } from "react-redux";
import { string, number } from "prop-types";
import { path } from "ramda";

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

const Reporting = ({ getEmployees, occupation }) => {

    useEffect(() => {
        getEmployees();
    }, [getEmployees])

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
    employeeId: number
};

export default connect(
    state => ({
        occupation: path(["employees", "employeeSelected", "occupation"], state),
        employeeId: path(["employees", "employeeSelected", "id"], state)
    }),
    { getEmployees }
)(Reporting);