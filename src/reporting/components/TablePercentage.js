import React from "react";
import { connect } from "react-redux";
import { Table, TableTheadTr, TableContentTh } from "../../style/table_style"
import { pathOr } from "ramda"
import { string } from 'prop-types'
import { BUSINESS_MANAGER, SOURCING_OFFICER} from './EmployeeData'
import TablePercentageTalentAcquisition from './TablePercentageTalentAcquisition'
import TablePercentageBusinessManager from './TablePercentageBusinessManager'

const TablePercentage = ({ occupation }) => {

    return (
        <div>
            <Table>
                <thead>
                    <TableTheadTr>
                        <TableContentTh>Conversion %</TableContentTh>
                        <TableContentTh>Total YTD</TableContentTh>
                        <TableContentTh>Average</TableContentTh>
                    </TableTheadTr>
                </thead>
                <tbody>
                    {
                        occupation === BUSINESS_MANAGER && <TablePercentageBusinessManager />
                    }

                    {
                        (occupation === BUSINESS_MANAGER || occupation === SOURCING_OFFICER) && <TablePercentageTalentAcquisition />
                    }
                    
                </tbody>
            </Table>
        </div>
    )
}

TablePercentage.propTypes = {
    occupation: string
};

export default connect(
    state => ({
        occupation: pathOr("", ["employees", "employeeSelected", "occupation"], state)
    }),
    {}
)(TablePercentage);