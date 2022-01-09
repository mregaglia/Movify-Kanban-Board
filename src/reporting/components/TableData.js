import React from 'react'
import { connect } from 'react-redux'
import { object, string } from 'prop-types'
import { pathOr } from 'ramda'

import { BUSINESS_MANAGER, SOURCING_OFFICER, TALENT_ACQUISITION } from '../../auth/user.sagas'
import { Table, TableContentTh, TableTheadTr } from '../../style/table_style'

import BusinessManager from './BusinessManager'
import GaugeScore from './GaugeScore'
import TalentAcquisition from './TalentAcquisition'

const TableData = ({ occupation, dates, className }) => (
  <div className={className}>
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
        {occupation.includes(BUSINESS_MANAGER) && <BusinessManager />}
        {(occupation.includes(BUSINESS_MANAGER) ||
          occupation.includes(SOURCING_OFFICER) ||
          occupation.includes(TALENT_ACQUISITION)) && (
          <>
            <TalentAcquisition />
            <GaugeScore />
          </>
        )}
      </tbody>
    </Table>
  </div>
)

TableData.propTypes = {
  occupation: string,
  className: string,
  dates: object,
}

export default connect(
  (state) => ({
    occupation: pathOr('', ['employees', 'employeeSelected', 'occupation'], state),
    dates: pathOr({}, ['kpi', 'dataEmployee', 'dates', 'DATES'], state),
  }),
  {}
)(TableData)
