import React from "react";
import { connect } from "react-redux";
import { Table, TableTheadTr, TableContentTh } from "../../style/table_style"
import { pathOr } from "ramda"
import { string } from 'prop-types'
import TablePercentageTalentAcquisition from './TablePercentageTalentAcquisition'
import TablePercentageBusinessManager from './TablePercentageBusinessManager'
import {
    BUSINESS_MANAGER,
    SOURCING_OFFICER,
    TALENT_ACQUISITION
} from '../../auth/user.sagas'

const TablePercentage = ({ occupation, className }) => {

    return (
        <div className={className}>
            {
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
                            occupation.includes(BUSINESS_MANAGER) && <TablePercentageBusinessManager />
                        }
                        {
                            (occupation.includes(BUSINESS_MANAGER) || occupation.includes(SOURCING_OFFICER) || occupation.includes(TALENT_ACQUISITION)) && <TablePercentageTalentAcquisition />
                        }
                    </tbody>
                </Table>
            }
        </div>
    )
}

TablePercentage.propTypes = {
    occupation: string,
    className: string,
};

export default connect(
    state => ({
        occupation: pathOr("", ["employees", "employeeSelected", "occupation"], state)
    }),
    {}
)(TablePercentage);