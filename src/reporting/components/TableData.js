import React from "react";
import BusinessManager from './BusinessManager'
import TalentAcquisition from './TalentAcquisition'
import { connect } from "react-redux";
import { string, object } from "prop-types";
import { pathOr } from "ramda";
import { Table, TableTheadTr, TableContentTh } from "../../style/table_style"
import { BUSINESS_MANAGER, SOURCING_OFFICER, TALENT_ACQUISITION } from './EmployeeData'
import WeeklySpeed from './WeeklySpeed'

const TableData = ({ occupation, dates }) => {

    return (
        <div>
            <Table>
                <thead>
                    <TableTheadTr>
                        <TableContentTh key="NO_WEEK" />
                        <TableContentTh>{dates.FIRST_WEEK}</TableContentTh>
                        <TableContentTh>{dates.SECOND_WEEK}</TableContentTh>
                        <TableContentTh>{dates.THIRD_WEEK}</TableContentTh>
                        <TableContentTh>{dates.FOURTH_WEEK}</TableContentTh>
                    </TableTheadTr>
                </thead>
                <tbody>
                    {
                        occupation === BUSINESS_MANAGER && <BusinessManager />
                    }

                    {
                        (occupation === BUSINESS_MANAGER || occupation === SOURCING_OFFICER || occupation === TALENT_ACQUISITION) && <TalentAcquisition />
                    }

                </tbody>
            </Table>
            <WeeklySpeed />
        </div>
    )
}

TableData.propTypes = {
    occupation: string,
    dates: object
};

export default connect(
    state => ({
        occupation: pathOr("", ["employees", "employeeSelected", "occupation"], state),
        dates: pathOr({}, ["kpi", "dataEmployee", "dates", "DATES"], state),
    }),
    {}
)(TableData);