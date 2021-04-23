import React from "react"
import { connect } from "react-redux"
import {
  TableContentTd,
  TableContentTbodyTr,
  TableContentTbodyTrNoLine,
  TableContentTdTitleEmpty,
} from "../../style/table_style"
import { pathOr } from "ramda"
import { object, bool, string, number, oneOfType } from "prop-types"
import Loader from "react-loader-spinner"

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
  noShowTotalYTD,
  averageNoShowYTD,
  conversionNoShowYTD,
}) => {
  return (
    <>
      <TableContentTbodyTrNoLine>
        <TableContentTdTitleEmpty></TableContentTdTitleEmpty>
      </TableContentTbodyTrNoLine>
      {Object.keys(dataConversionYTD).map((key, i) => {
        if (key === "NEW_VACANCY") {
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
          } else {
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
            } else {
              return (
                <TableContentTbodyTr key={i}>
                  <TableContentTd>{dataConversionYTD[key]}</TableContentTd>
                  <TableContentTd>{dataTotalYTD[key]}</TableContentTd>
                  <TableContentTd>{dataAverageYTD[key]}</TableContentTd>
                </TableContentTbodyTr>
              )
            }
          }
        } else if (key === "CV_SENT") {
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
          } else {
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
            } else {
              return (
                <TableContentTbodyTr key={i}>
                  <TableContentTd>{dataConversionYTD[key]}</TableContentTd>
                  <TableContentTd>{dataTotalYTD[key]}</TableContentTd>
                  <TableContentTd>{dataAverageYTD[key]}</TableContentTd>
                </TableContentTbodyTr>
              )
            }
          }
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
      <tr>
        <TableContentTd>
          {!isLoadingConversionYTD ? (
            conversionNoShowYTD
          ) : (
            <Loader type="ThreeDots" height={15} width={20} color="#6BD7DA" />
          )}
        </TableContentTd>
        <TableContentTd>
          {!isLoadingTotalYTD ? noShowTotalYTD : <Loader type="ThreeDots" height={15} width={20} color="#6BD7DA" />}
        </TableContentTd>
        <TableContentTd>
          {!isLoadingAverageYTD ? averageNoShowYTD : <Loader type="ThreeDots" height={15} width={20} color="#6BD7DA" />}
        </TableContentTd>
      </tr>
    </>
  )
}

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
  noShowTotalYTD: number,
  averageNoShowYTD: number,
  conversionNoShowYTD: oneOfType([string, number]),
}

export default connect(
  (state) => ({
    noShowTotalYTD: state?.kpi?.dataYTDEmployee?.TOTAL_YTD_RE?.NO_SHOW,
    averageNoShowYTD: state?.kpi?.dataYTDEmployee?.AVERAGE_YTD_RE?.NO_SHOW,
    conversionNoShowYTD: state?.kpi?.dataYTDEmployee?.CONVERSION_YTD_RE?.NO_SHOW,
    dataConversionYTD: pathOr({}, ["kpi", "dataYTDEmployee", "CONVERSION_YTD_BM"], state),
    dataTotalYTD: pathOr({}, ["kpi", "dataYTDEmployee", "TOTAL_YTD_BM"], state),
    dataAverageYTD: pathOr({}, ["kpi", "dataYTDEmployee", "AVERAGE_YTD_BM"], state),
    isLoadingConversionYTD: pathOr({}, ["kpi", "isLoadingYTDConversion"], state),
    isLoadingTotalYTD: pathOr({}, ["kpi", "isLoadingYTDTotal"], state),
    isLoadingAverageYTD: pathOr({}, ["kpi", "isLoadingYTDAverage"], state),
    isLoadingYTDNewVacancy: pathOr({}, ["kpi", "isLoadingYTDNewVacancy"], state),
    isLoadingYTDConversionNewVacancy: pathOr({}, ["kpi", "isLoadingYTDConversionNewVacancy"], state),
    isLoadingYTDCVSent: pathOr({}, ["kpi", "isLoadingYTDCVSent"], state),
    isLoadingYTDConversionCVSent: pathOr({}, ["kpi", "isLoadingYTDConversionCVSent"], state),
  }),
  {}
)(TablePercentageBusinessManager)
