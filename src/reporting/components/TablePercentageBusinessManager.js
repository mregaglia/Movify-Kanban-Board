import React from "react";
import { connect } from "react-redux";
import { TableContentTd, TableContentTbodyTr, TableContentTbodyTrNoLine, TableContentTdTitleEmpty } from "../../style/table_style"
import { pathOr } from 'ramda'
import { object } from "prop-types"

const TablePercentageBusinessManager = ({ dataConversionYTD, dataTotalYTD, dataAverageYTD }) => {

    return (
        <>
            <TableContentTbodyTrNoLine>
                <TableContentTdTitleEmpty></TableContentTdTitleEmpty>
            </TableContentTbodyTrNoLine>
            {
                Object.keys(dataConversionYTD).map((key, i) => {
                    return (
                        <TableContentTbodyTr key={i}>
                            <TableContentTd>{dataConversionYTD[key]}</TableContentTd>
                            <TableContentTd>{dataTotalYTD[key]}</TableContentTd>
                            <TableContentTd>{dataAverageYTD[key]}</TableContentTd>
                        </TableContentTbodyTr>
                    )
                })
            }
        </>
    )
}

TablePercentageBusinessManager.propTypes = {
    dataConversionYTD: object,
    dataTotalYTD: object,
    dataAverageYTD: object
};

export default connect(
    state => ({
        dataConversionYTD: pathOr({}, ["kpi", "dataYTDEmployee", "CONVERSION_YTD_BM"], state),
        dataTotalYTD: pathOr({}, ["kpi", "dataYTDEmployee", "TOTAL_YTD_BM"], state),
        dataAverageYTD: pathOr({}, ["kpi", "dataYTDEmployee", "AVERAGE_YTD_BM"], state),
    }),
    {}
)(TablePercentageBusinessManager);
