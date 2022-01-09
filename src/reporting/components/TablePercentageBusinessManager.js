import React from 'react'
import Loader from 'react-loader-spinner'
import { connect } from 'react-redux'
import { bool, object } from 'prop-types'
import { pathOr } from 'ramda'

import {
  TableContentTbodyTr,
  TableContentTbodyTrNoLine,
  TableContentTd,
  TableContentTdTitleEmpty,
} from '../../style/table_style'

const TablePercentageBusinessManager = ({
  isLoadingYTDConversionCVSent,
  isLoadingYTDCVSent,
  dataConversionYTD,
  dataTotalYTD,
  dataAverageYTD,
  isLoadingConversionYTD,
  isLoadingTotalYTD,
  isLoadingAverageYTD,
  isLoadingYTDNewVacancy,
  isLoadingYTDConversionNewVacancy,
}) => (
  <>
    <TableContentTbodyTrNoLine>
      <TableContentTdTitleEmpty />
    </TableContentTbodyTrNoLine>
    {Object.keys(dataConversionYTD).map((key, i) => {
      if (key === 'NEW_VACANCY') {
        if (isLoadingYTDNewVacancy) {
          return (
            <TableContentTbodyTr key={i}>
              <TableContentTd>
                <Loader type="ThreeDots" height={15} width={20} color="#6BD7DA" />
              </TableContentTd>
              <TableContentTd>
                <Loader type="ThreeDots" height={15} width={20} color="#6BD7DA" />
              </TableContentTd>
              <TableContentTd>
                <Loader type="ThreeDots" height={15} width={20} color="#6BD7DA" />
              </TableContentTd>
            </TableContentTbodyTr>
          )
        }
        if (isLoadingYTDConversionNewVacancy) {
          return (
            <TableContentTbodyTr key={i}>
              <TableContentTd>
                <Loader type="ThreeDots" height={15} width={20} color="#6BD7DA" />
              </TableContentTd>
              <TableContentTd>{dataTotalYTD[key]}</TableContentTd>
              <TableContentTd>{dataAverageYTD[key]}</TableContentTd>
            </TableContentTbodyTr>
          )
        }
        return (
          <TableContentTbodyTr key={i}>
            <TableContentTd>{dataConversionYTD[key]}</TableContentTd>
            <TableContentTd>{dataTotalYTD[key]}</TableContentTd>
            <TableContentTd>{dataAverageYTD[key]}</TableContentTd>
          </TableContentTbodyTr>
        )
      }
      if (key === 'CV_SENT') {
        if (isLoadingYTDCVSent) {
          return (
            <TableContentTbodyTr key={i}>
              <TableContentTd>
                <Loader type="ThreeDots" height={15} width={20} color="#6BD7DA" />
              </TableContentTd>
              <TableContentTd>
                <Loader type="ThreeDots" height={15} width={20} color="#6BD7DA" />
              </TableContentTd>
              <TableContentTd>
                <Loader type="ThreeDots" height={15} width={20} color="#6BD7DA" />
              </TableContentTd>
            </TableContentTbodyTr>
          )
        }
        if (isLoadingYTDConversionCVSent) {
          return (
            <TableContentTbodyTr key={i}>
              <TableContentTd>
                <Loader type="ThreeDots" height={15} width={20} color="#6BD7DA" />
              </TableContentTd>
              <TableContentTd>{dataTotalYTD[key]}</TableContentTd>
              <TableContentTd>{dataAverageYTD[key]}</TableContentTd>
            </TableContentTbodyTr>
          )
        }
        return (
          <TableContentTbodyTr key={i}>
            <TableContentTd>{dataConversionYTD[key]}</TableContentTd>
            <TableContentTd>{dataTotalYTD[key]}</TableContentTd>
            <TableContentTd>{dataAverageYTD[key]}</TableContentTd>
          </TableContentTbodyTr>
        )
      }
      if (key === 'PROJECT_START') {
        return (
          <tr key={i}>
            <TableContentTd>
              {!isLoadingConversionYTD ? (
                dataConversionYTD[key]
              ) : (
                <Loader type="ThreeDots" height={15} width={20} color="#6BD7DA" />
              )}
            </TableContentTd>
            <TableContentTd>
              {!isLoadingTotalYTD ? (
                dataTotalYTD[key]
              ) : (
                <Loader type="ThreeDots" height={15} width={20} color="#6BD7DA" />
              )}
            </TableContentTd>
            <TableContentTd>
              {!isLoadingAverageYTD ? (
                dataAverageYTD[key]
              ) : (
                <Loader type="ThreeDots" height={15} width={20} color="#6BD7DA" />
              )}
            </TableContentTd>
          </tr>
        )
      }
      return (
        <TableContentTbodyTr key={i}>
          <TableContentTd>
            {!isLoadingConversionYTD ? (
              dataConversionYTD[key]
            ) : (
              <Loader type="ThreeDots" height={15} width={20} color="#6BD7DA" />
            )}
          </TableContentTd>
          <TableContentTd>
            {!isLoadingTotalYTD ? (
              dataTotalYTD[key]
            ) : (
              <Loader type="ThreeDots" height={15} width={20} color="#6BD7DA" />
            )}
          </TableContentTd>
          <TableContentTd>
            {!isLoadingAverageYTD ? (
              dataAverageYTD[key]
            ) : (
              <Loader type="ThreeDots" height={15} width={20} color="#6BD7DA" />
            )}
          </TableContentTd>
        </TableContentTbodyTr>
      )
    })}
  </>
)

TablePercentageBusinessManager.propTypes = {
  dataConversionYTD: object,
  dataTotalYTD: object,
  dataAverageYTD: object,
  isLoadingConversionYTD: bool,
  isLoadingTotalYTD: bool,
  isLoadingAverageYTD: bool,
  isLoadingYTDNewVacancy: bool,
  isLoadingYTDConversionNewVacancy: bool,
  isLoadingYTDCVSent: bool,
  isLoadingYTDConversionCVSent: bool,
}

export default connect(
  (state) => ({
    dataConversionYTD: pathOr({}, ['kpi', 'dataYTDEmployee', 'CONVERSION_YTD_BM'], state),
    dataTotalYTD: pathOr({}, ['kpi', 'dataYTDEmployee', 'TOTAL_YTD_BM'], state),
    dataAverageYTD: pathOr({}, ['kpi', 'dataYTDEmployee', 'AVERAGE_YTD_BM'], state),
    isLoadingConversionYTD: pathOr({}, ['kpi', 'isLoadingYTDConversion'], state),
    isLoadingTotalYTD: pathOr({}, ['kpi', 'isLoadingYTDTotal'], state),
    isLoadingAverageYTD: pathOr({}, ['kpi', 'isLoadingYTDAverage'], state),
    isLoadingYTDNewVacancy: pathOr({}, ['kpi', 'isLoadingYTDNewVacancy'], state),
    isLoadingYTDConversionNewVacancy: pathOr({}, ['kpi', 'isLoadingYTDConversionNewVacancy'], state),
    isLoadingYTDCVSent: pathOr({}, ['kpi', 'isLoadingYTDCVSent'], state),
    isLoadingYTDConversionCVSent: pathOr({}, ['kpi', 'isLoadingYTDConversionCVSent'], state),
  }),
  {}
)(TablePercentageBusinessManager)
