import React from 'react'
import { connect } from "react-redux";
import { TableContentTd, TableContentTbodyTr, TableContentTdTitle, TableContentTbodyTrNoLine, TableContentTdLabel } from "../../style/table_style"
import { pathOr } from 'ramda'
import { object } from "prop-types"

const TalentAcquisition = ({ datas }) => {
    return (
        <>
            <TableContentTbodyTrNoLine>
                <TableContentTdTitle>Recruitment</TableContentTdTitle>
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

TalentAcquisition.propTypes = {
    datas: object
};

export default connect(
    state => ({
        datas: pathOr({}, ["kpi", "dataEmployee", "datasRecruitment"], state)
    }),
    {}
)(TalentAcquisition);