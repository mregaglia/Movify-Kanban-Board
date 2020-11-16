import React from "react";
import { connect } from "react-redux";
import { Table, TableTheadTr, TableContentTh } from "../../style/table_style"
import { pathOr, path } from "ramda"
import { string, bool } from 'prop-types'
import TablePercentageTalentAcquisition from './TablePercentageTalentAcquisition'
import TablePercentageBusinessManager from './TablePercentageBusinessManager'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import {
    BUSINESS_MANAGER,
    SOURCING_OFFICER,
    TALENT_ACQUISITION
} from '../../auth/user.sagas'

const Loading = styled.div({
    paddingTop: "280px",
    paddingLeft: "140px"

})


const TablePercentage = ({ occupation }) => {

    return (
        <div>
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
    occupation: string
};

export default connect(
    state => ({
        occupation: pathOr("", ["employees", "employeeSelected", "occupation"], state)
    }),
    {}
)(TablePercentage);