import React from "react";
import { connect } from "react-redux";
import { TableContentTd, TableContentTbodyTr, TableContentTbodyTrNoLine, TableContentTdTitleEmpty } from "../../style/table_style"
import { pathOr } from 'ramda'
import { object, bool } from "prop-types"
import Loader from 'react-loader-spinner'

const TablePercentageTalentAcquisition = ({ dataConversionYTD, dataTotalYTD, dataAverageYTD, isLoadingConversionYTD, isLoadingTotalYTD, isLoadingAverageYTD }) => {

    return (
        <>
            <TableContentTbodyTrNoLine>
                <TableContentTdTitleEmpty></TableContentTdTitleEmpty>
            </TableContentTbodyTrNoLine>
            {
                Object.keys(dataConversionYTD).map((key, i) => {
                    return (
                        <TableContentTbodyTr key={i}>
                            <TableContentTd>
                                {!isLoadingConversionYTD
                                    ? (dataConversionYTD[key])
                                    : (
                                        <Loader type="ThreeDots" color="#00BFFF" height={20} width={20} color="#6BD7DA" />
                                    )}
                            </TableContentTd>
                            <TableContentTd>
                                {!isLoadingTotalYTD
                                    ? dataTotalYTD[key]
                                    : (
                                        <Loader type="ThreeDots" color="#00BFFF" height={20} width={20} color="#6BD7DA" />
                                    )}
                            </TableContentTd>
                            <TableContentTd>
                                {!isLoadingAverageYTD
                                    ? dataAverageYTD[key]
                                    : (
                                        <Loader type="ThreeDots" color="#00BFFF" height={20} width={20} color="#6BD7DA" />
                                    )}
                            </TableContentTd>
                        </TableContentTbodyTr>
                    )
                })
            }
        </>
    )
}

TablePercentageTalentAcquisition.propTypes = {
    dataConversionYTD: object,
    dataTotalYTD: object,
    dataAverageYTD: object,
    isLoadingConversionYTD: bool,
    isLoadingTotalYTD: bool,
    isLoadingAverageYTD: bool
};

export default connect(
    state => ({
        dataConversionYTD: pathOr({}, ["kpi", "dataYTDEmployee", "CONVERSION_YTD_RE"], state),
        dataTotalYTD: pathOr({}, ["kpi", "dataYTDEmployee", "TOTAL_YTD_RE"], state),
        dataAverageYTD: pathOr({}, ["kpi", "dataYTDEmployee", "AVERAGE_YTD_RE"], state),
        isLoadingConversionYTD: pathOr({}, ["kpi", "isLoadingYTDConversion"], state),
        isLoadingTotalYTD: pathOr({}, ["kpi", "isLoadingYTDTotal"], state),
        isLoadingAverageYTD: pathOr({}, ["kpi", "isLoadingYTDAverage"], state)
    }),
    {}
)(TablePercentageTalentAcquisition);
