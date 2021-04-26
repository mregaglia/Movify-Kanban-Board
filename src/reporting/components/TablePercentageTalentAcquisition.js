import React from "react"
import { connect } from "react-redux"
import {
  TableContentTd,
  TableContentTbodyTr,
  TableContentTbodyTrNoLine,
  TableContentTdTitleForBMEmpty,
  TableContentTdTitleEmpty,
} from "../../style/table_style"
import { pathOr } from "ramda"
import { object, bool, string } from "prop-types"
import Loader from "react-loader-spinner"
import { BUSINESS_MANAGER } from "../../auth/user.sagas"

const TablePercentageTalentAcquisition = ({
  dataConversionYTD,
  dataTotalYTD,
  dataAverageYTD,
  isLoadingConversionYTD,
  isLoadingTotalYTD,
  isLoadingAverageYTD,
  occupation,
}) => {
  return (
    <>
      {occupation.includes(BUSINESS_MANAGER) && (
        <TableContentTbodyTrNoLine>
          <TableContentTdTitleForBMEmpty></TableContentTdTitleForBMEmpty>
        </TableContentTbodyTrNoLine>
      )}
      {!occupation.includes(BUSINESS_MANAGER) && (
        <TableContentTbodyTrNoLine>
          <TableContentTdTitleEmpty></TableContentTdTitleEmpty>
        </TableContentTbodyTrNoLine>
      )}
      {Object.keys(dataConversionYTD).map((key, i) => {
        const shouldNotRender = (key === "PEOPLE_MANAGEMENT" && !occupation.includes(BUSINESS_MANAGER))
        if (shouldNotRender) {
          return null
        } else if (key === "PEOPLE_MANAGEMENT" || (key === "HIRED" && !occupation.includes(BUSINESS_MANAGER))) {
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
        } else {
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
        }
      })}
    </>
  )
}

TablePercentageTalentAcquisition.propTypes = {
  dataConversionYTD: object,
  dataTotalYTD: object,
  dataAverageYTD: object,
  isLoadingConversionYTD: bool,
  isLoadingTotalYTD: bool,
  isLoadingAverageYTD: bool,
  occupation: string,
}

export default connect(
  (state) => ({
    dataConversionYTD: pathOr({}, ["kpi", "dataYTDEmployee", "CONVERSION_YTD_RE"], state),
    dataTotalYTD: pathOr({}, ["kpi", "dataYTDEmployee", "TOTAL_YTD_RE"], state),
    dataAverageYTD: pathOr({}, ["kpi", "dataYTDEmployee", "AVERAGE_YTD_RE"], state),
    isLoadingConversionYTD: pathOr({}, ["kpi", "isLoadingYTDConversion"], state),
    isLoadingTotalYTD: pathOr({}, ["kpi", "isLoadingYTDTotal"], state),
    isLoadingAverageYTD: pathOr({}, ["kpi", "isLoadingYTDAverage"], state),
    occupation: pathOr("", ["employees", "employeeSelected", "occupation"], state),
  }),
  {}
)(TablePercentageTalentAcquisition)
