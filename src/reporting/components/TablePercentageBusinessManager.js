import React from "react";
import { connect } from "react-redux";
import { TableContentTd, TableContentTbodyTr, TableContentTbodyTrNoLine, TableContentTdTitleEmpty } from "../../style/table_style"
import { pathOr } from 'ramda'
import { object, bool } from "prop-types"
import Loader from 'react-loader-spinner'

const TablePercentageBusinessManager = ({ dataConversionYTD, dataTotalYTD, dataAverageYTD, isLoadingConversionYTD, isLoadingTotalYTD, isLoadingAverageYTD, isLoadingYTDNewVacancy }) => {

    return (
        <>
            <TableContentTbodyTrNoLine>
                <TableContentTdTitleEmpty></TableContentTdTitleEmpty>
            </TableContentTbodyTrNoLine>
            {
                Object.keys(dataConversionYTD).map((key, i) => {
                    if (key === "NEW_VACANCY") {
                        if (isLoadingYTDNewVacancy) {
                            return (
                                <TableContentTbodyTr key={i}>
                                    <TableContentTd>
                                        <Loader type="ThreeDots" height={20} width={20} color="#6BD7DA" />
                                    </TableContentTd>
                                    <TableContentTd>
                                        <Loader type="ThreeDots" height={20} width={20} color="#6BD7DA" />
                                    </TableContentTd>
                                    <TableContentTd>
                                        <Loader type="ThreeDots" height={20} width={20} color="#6BD7DA" />
                                    </TableContentTd>
                                </TableContentTbodyTr>
                            )
                        } else {
                            return (
                                <TableContentTbodyTr key={i}>
                                    <TableContentTd>
                                        {dataConversionYTD[key]}
                                    </TableContentTd>
                                    <TableContentTd>
                                        {dataTotalYTD[key]}
                                    </TableContentTd>
                                    <TableContentTd>
                                        {dataAverageYTD[key]}
                                    </TableContentTd>
                                </TableContentTbodyTr>
                            )
                        }
                    } else {
                        return (
                            <TableContentTbodyTr key={i}>
                                <TableContentTd>
                                    {!isLoadingConversionYTD
                                        ? dataConversionYTD[key]
                                        : (
                                            <Loader type="ThreeDots" height={20} width={20} color="#6BD7DA" />
                                        )}
                                </TableContentTd>
                                <TableContentTd>
                                    {!isLoadingTotalYTD
                                        ? dataTotalYTD[key]
                                        : (
                                            <Loader type="ThreeDots" height={20} width={20} color="#6BD7DA" />

                                        )}
                                </TableContentTd>
                                <TableContentTd>
                                    {!isLoadingAverageYTD
                                        ? dataAverageYTD[key]
                                        : (
                                            <Loader type="ThreeDots" height={20} width={20} color="#6BD7DA" />

                                        )}
                                </TableContentTd>
                            </TableContentTbodyTr>
                        )
                    }

                })
            }
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
    isLoadingYTDNewVacancy: bool
};

export default connect(
    state => ({
        dataConversionYTD: pathOr({}, ["kpi", "dataYTDEmployee", "CONVERSION_YTD_BM"], state),
        dataTotalYTD: pathOr({}, ["kpi", "dataYTDEmployee", "TOTAL_YTD_BM"], state),
        dataAverageYTD: pathOr({}, ["kpi", "dataYTDEmployee", "AVERAGE_YTD_BM"], state),
        isLoadingConversionYTD: pathOr({}, ["kpi", "isLoadingYTDConversion"], state),
        isLoadingTotalYTD: pathOr({}, ["kpi", "isLoadingYTDTotal"], state),
        isLoadingAverageYTD: pathOr({}, ["kpi", "isLoadingYTDAverage"], state),
        isLoadingYTDNewVacancy: pathOr({}, ["kpi", "isLoadingYTDNewVacancy"], state)
    }),
    {}
)(TablePercentageBusinessManager);
