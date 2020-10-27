import React, { useEffect } from "react";
import styled from 'styled-components'
import SelectEmployees from "./SelectEmployees"
import { getEmployees } from "../employees/employees.actions"
import { connect } from "react-redux";
import { bool, object } from "prop-types";
import { path, pathOr, isEmpty } from "ramda";
import TableData from "./TableData";
import TablePercentage from './TablePercentage'

const Container = styled.div({
    display: "flex",
    flexWrap: "nowrap",
    padding: "15px",
    justifyContent: "center",
    div: {
        padding: "10px",
    }
})

const BoxGauge = styled.div({
    flex: "1",
    order: "1"
})

const BoxTableData = styled.div({
    flex: "2",
    order: "2"
})

const BoxTablePercentage = styled.div({
    flex: "1",
    order: "3"
})

const Reporting = ({ getEmployees, employeeSelected, downloadingData }) => {

    useEffect(() => {
        getEmployees();
    }, [getEmployees])

    return (

        <div>
            <SelectEmployees />
            <Container>

                {
                    (!isEmpty(employeeSelected)) && (
                        <>
                            <BoxGauge>
                                <p> C'est ici que sera la jauge</p>
                            </BoxGauge>
                            <BoxTableData>
                                <TableData />
                            </BoxTableData>
                            <BoxTablePercentage>
                                <TablePercentage />
                            </BoxTablePercentage>
                        </>
                    )
                }
            </Container>

        </div >
    )
}

Reporting.propTypes = {
    downloadingData: bool,
    employeeSelected: object,
    data: object
};

export default connect(
    state => ({
        downloadingData: pathOr(false, ["employees", "downloadingData"], state),
        employeeSelected: path(["employees", "employeeSelected"], state)
    }),
    { getEmployees }
)(Reporting);