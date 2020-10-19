import React from "react";
import BusinessManager from './BusinessManager'
import TalentAcquisition from './TalentAcquisition'
import { connect } from "react-redux";
import { string, array } from "prop-types";
import { pathOr } from "ramda";
import { Table, TableTheadTr, TableContentTh } from "../style/table_style"
import { BUSINESS_MANAGER, SOURCING_OFFICER } from './Reporting'
import { getDateLabel } from '../utils/date'
import WeeklySpeed from './WeeklySpeed'

const TableData = ({ occupation, dates }) => {

    return (
        <div>
            <Table>
                <thead>
                    <TableTheadTr>
                        <TableContentTh></TableContentTh>
                        {dates.map((date) => (
                            <TableContentTh>{getDateLabel(date.start)}</TableContentTh>
                        ))}
                    </TableTheadTr>
                </thead>
                <tbody>
                    {
                        occupation === BUSINESS_MANAGER && <BusinessManager />
                    }

                    {
                        occupation === SOURCING_OFFICER && <TalentAcquisition />
                    }

                </tbody>
            </Table>
            <WeeklySpeed />
        </div>
    )
}

TableData.propTypes = {
    occupation: string,
    dates: array
};

export default connect(
    state => ({
        occupation: pathOr([], ["employees", "employeeSelected", "occupation"], state),
        dates: pathOr([], ["reporting", "dates"], state)
    }),
    {}
)(TableData);