import React from "react";
import BusinessManager from './BusinessManager'
import TalentAcquisition from './TalentAcquisition'
import { connect } from "react-redux";
import { string, array } from "prop-types";
import { pathOr, paths, isNil } from "ramda";
import { Table, TableTheadTr, TableContentTh } from "../../style/table_style"
import { BUSINESS_MANAGER, SOURCING_OFFICER } from './Reporting'
import WeeklySpeed from './WeeklySpeed'
import { START_WEEK_DATE } from "../../utils/reporting"

const TableData = ({ occupation, dates }) => {

    return (
        <div>
            <Table>
                <thead>
                    <TableTheadTr>
                        <TableContentTh></TableContentTh>
                        {
                            dates.map((date) => {
                                if(!isNil(date))
                                    return <TableContentTh key={date[0]}>{date[1]}</TableContentTh>
                            })
                        }
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
        dates: paths([["kpi", "dataEmployee", "0", START_WEEK_DATE], ["kpi", "dataEmployee", "1", START_WEEK_DATE], ["kpi", "dataEmployee", "2", START_WEEK_DATE], ["kpi", "dataEmployee", "3", START_WEEK_DATE]], state)

    }),
    {}
)(TableData);