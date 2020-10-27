import React, { useEffect } from "react";
import styled from 'styled-components'
import SelectEmployees from "./SelectEmployees"
import { getEmployees } from "../employees/employees.actions"
import { connect } from "react-redux";
import { bool, object } from "prop-types";
import { path, isEmpty } from "ramda";
import TableData from "./TableData";
import TablePercentage from './TablePercentage'
import Loader from 'react-loader-spinner'
import GaugeComponent from './GaugeComponent'

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

const Reporting = ({ getEmployees, employeeSelected, isLoadingKpi }) => {

    useEffect(() => {
        getEmployees();
    }, [getEmployees])

    return (

        <div>
            <SelectEmployees />
            <Container>
                {
                    (!isEmpty(employeeSelected) && isLoadingKpi) && (
                        <div>
                            <Loader
                                type="Rings"
                                color="#6BD7DA"
                                height={100}
                                width={100}
                            />
                        </div>
                    )
                }
                {
                    (!isEmpty(employeeSelected) && !isLoadingKpi) && (
                        <>
                            <BoxGauge>
                                <GaugeComponent />
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
    employeeSelected: object,
    isLoadingKpi: bool
};

export default connect(
    state => ({
        employeeSelected: path(["employees", "employeeSelected"], state),
        isLoadingKpi: path(["kpi", "isLoadingKpi"], state)
    }),
    { getEmployees }
)(Reporting);