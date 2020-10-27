import React from "react";
import { connect } from "react-redux";
import { TableContentTd, TableContentTdTitle, TableContentTbodyTr } from "../../style/table_style"
import { pathOr } from 'ramda'
import { object } from "prop-types"

const TablePercentageBusinessManager = ({ dataConversionYTDBusinessManager }) => {

    return (
        <>
            <TableContentTbodyTr>
                <TableContentTdTitle></TableContentTdTitle>
            </TableContentTbodyTr>
            {
                Object.keys(dataConversionYTDBusinessManager).map((key, i) => {
                    return (
                        <TableContentTbodyTr key={i}>
                            <TableContentTd>{dataConversionYTDBusinessManager[key].CONVERSION_YTD}</TableContentTd>
                            <TableContentTd>{dataConversionYTDBusinessManager[key].TOTAL_YTD}</TableContentTd>
                            <TableContentTd>{dataConversionYTDBusinessManager[key].AVERAGE}</TableContentTd>
                        </TableContentTbodyTr>
                    )
                  })
            }
        </>
    )
}

TablePercentageBusinessManager.propTypes = {
    dataConversionYTDBusinessManager: object
};

export default connect(
    state => ({
        dataConversionYTDBusinessManager: pathOr({}, ["kpi", "dataEmployee", "objectConvertionYTDBusinessManager"], state),
    }),
    {}
)(TablePercentageBusinessManager);
