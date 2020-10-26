import React from 'react'
import { connect } from "react-redux";
import { TableContentTd, TableContentTbodyTr,  TableContentTdTitle } from "../../style/table_style"
import { pathOr } from 'ramda'
import { object } from "prop-types"

const TalentAcquisition = ({ datas }) => {
    return (
        <>

            <TableContentTbodyTr>
                <TableContentTdTitle>Recruitment</TableContentTdTitle>
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

TalentAcquisition.propTypes = {
    datas: object
};

export default connect(
    state => ({
        datas: pathOr({}, ["kpi", "dataEmployee", "datasRecruitment"], state)
    }),
    {}
)(TalentAcquisition);