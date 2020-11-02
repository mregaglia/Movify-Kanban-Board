import React from "react";
import { connect } from "react-redux";
import { TableContentTd, TableContentTdTitle, TableContentTbodyTr, TableContentTbodyTrNoLine, TableContentTdLabel } from "../../style/table_style"
import { pathOr } from 'ramda'
import { object } from "prop-types"



const BusinessManager = ({ datas }) => {

    return (
        <>
            <TableContentTbodyTrNoLine>
                <TableContentTdTitle>Business Development</TableContentTdTitle>
            </TableContentTbodyTrNoLine>
            {
                Object.keys(datas).map((key, i) => {
                    return (
                        <TableContentTbodyTr key={i}>
                            <TableContentTdLabel>{datas[key].TITLE}</TableContentTdLabel>
                            <TableContentTd>{datas[key].FIRST_WEEK}</TableContentTd>
                            <TableContentTd>{datas[key].SECOND_WEEK}</TableContentTd>
                            <TableContentTd>{datas[key].THIRD_WEEK}</TableContentTd>
                            <TableContentTd>{datas[key].FOURTH_WEEK}</TableContentTd>
                        </TableContentTbodyTr>
                    )
                  })
            }
        </>
    )
}

BusinessManager.propTypes = {
    datas: object
};

export default connect(
    state => ({
        datas: pathOr({}, ["kpi", "dataEmployee", "datasBusinessManager"], state)
    }),
    {}
)(BusinessManager);
