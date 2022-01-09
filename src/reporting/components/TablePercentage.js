import React from 'react'
import { connect } from 'react-redux'
import { string } from 'prop-types'
import { pathOr } from 'ramda'

import { BUSINESS_MANAGER, SOURCING_OFFICER, TALENT_ACQUISITION } from '../../auth/user.sagas'
import { Table, TableContentTh, TableTheadTr } from '../../style/table_style'

import TablePercentageBusinessManager from './TablePercentageBusinessManager'
import TablePercentageTalentAcquisition from './TablePercentageTalentAcquisition'

const TablePercentage = ({ occupation, className }) => (
  <div className={className}>
    <Table>
      <thead>
        <TableTheadTr>
          <TableContentTh>Conversion %</TableContentTh>
          <TableContentTh>Total YTD</TableContentTh>
          <TableContentTh>Average</TableContentTh>
        </TableTheadTr>
      </thead>
      <tbody>
        {occupation.includes(BUSINESS_MANAGER) && <TablePercentageBusinessManager />}
        {[BUSINESS_MANAGER, SOURCING_OFFICER, TALENT_ACQUISITION].includes(occupation) && (
          <TablePercentageTalentAcquisition />
        )}
      </tbody>
    </Table>
  </div>
)

TablePercentage.propTypes = {
  occupation: string,
  className: string,
}

export default connect(
  (state) => ({
    occupation: pathOr('', ['employees', 'employeeSelected', 'occupation'], state),
  }),
  {}
)(TablePercentage)
