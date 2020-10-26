import React from "react";
import { connect } from "react-redux";
import { TableContentTd, TableContentTdTitle, TableContentTbodyTr } from "../../style/table_style"
import { pathOr } from 'ramda'
import { object } from "prop-types"



const BusinessManager = ({ datas }) => {

    return (
        <>
            <TableContentTbodyTr>
                <TableContentTdTitle>Business Development</TableContentTdTitle>
            </TableContentTbodyTr>
            {
                Object.keys(datas).map((key, i) => {
                    return (
                        <TableContentTbodyTr key={i}>
                            <TableContentTd>{datas[key].TITLE}</TableContentTd>
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
