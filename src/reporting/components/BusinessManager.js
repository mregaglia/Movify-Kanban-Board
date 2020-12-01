import React from "react";
import { connect } from "react-redux";
import { TableContentTd, TableContentTdTitle, TableContentTbodyTr, TableContentTbodyTrNoLine, TableContentTdLabel, TableContentTdBold, TableContentTdLabelBold, TableContentTdBoldClickable } from "../../style/table_style"
import { path, pathOr } from 'ramda'
import { object, bool } from "prop-types"
import Loader from 'react-loader-spinner'
import { LABEL_PROJECT_START, LABEL_CV_SENT, LABEL_MEETING_DONE, LABEL_INTAKE } from '../../utils/reporting'

const BusinessManager = ({ datas, isCvSentWeekLoading }) => {
    function onClickBusinessManagerData(e) {
        console.log("click")
    }
    return (
        <>
            <TableContentTbodyTrNoLine>
                <TableContentTdTitle>Business Development</TableContentTdTitle>
            </TableContentTbodyTrNoLine>
            {
                Object.keys(datas).map((key, i) => {
                    if (datas[key].TITLE === LABEL_CV_SENT) {
                        
                        if (isCvSentWeekLoading) {
                            return (
                                <TableContentTbodyTr key={i}>
                                    <TableContentTdLabel>{datas[key].TITLE}</TableContentTdLabel>
                                    <TableContentTd><Loader type="ThreeDots" color="#00BFFF" height={15} width={20} /></TableContentTd>
                                    <TableContentTd><Loader type="ThreeDots" color="#00BFFF" height={15} width={20} /></TableContentTd>
                                    <TableContentTd><Loader type="ThreeDots" color="#00BFFF" height={15} width={20} /></TableContentTd>
                                    <TableContentTd><Loader type="ThreeDots" color="#00BFFF" height={15} width={20} /></TableContentTd>
                                </TableContentTbodyTr>
                            )
                        } else {
                            return (
                                <TableContentTbodyTr key={i}>
                                    <TableContentTdLabel>{datas[key].TITLE}</TableContentTdLabel>
                                    <TableContentTd>{datas[key].FIRST_WEEK}</TableContentTd>
                                    <TableContentTd>{datas[key].SECOND_WEEK}</TableContentTd>
                                    <TableContentTd>{datas[key].THIRD_WEEK}</TableContentTd>
                                    <TableContentTd>{datas[key].FOURTH_WEEK}</TableContentTd>
                                </TableContentTbodyTr>
                            )
                        }
                    } else if (datas[key].TITLE === LABEL_PROJECT_START) {
                        return (
                            <tr key={i}>
                                <TableContentTdLabel>{datas[key].TITLE}</TableContentTdLabel>
                                <TableContentTd>{datas[key].FIRST_WEEK}</TableContentTd>
                                <TableContentTd>{datas[key].SECOND_WEEK}</TableContentTd>
                                <TableContentTd>{datas[key].THIRD_WEEK}</TableContentTd>
                                <TableContentTd>{datas[key].FOURTH_WEEK}</TableContentTd>
                            </tr>
                        )
                    } else if (datas[key].TITLE === LABEL_INTAKE || datas[key].TITLE === LABEL_MEETING_DONE) {
                        return (
                            <TableContentTbodyTr key={i}>
                                <TableContentTdLabelBold>{datas[key].TITLE}</TableContentTdLabelBold>
                                <TableContentTdBold>{datas[key].FIRST_WEEK}</TableContentTdBold>
                                <TableContentTdBold>{datas[key].SECOND_WEEK}</TableContentTdBold>
                                <TableContentTdBold>{datas[key].THIRD_WEEK}</TableContentTdBold>
                                <TableContentTdBoldClickable onClick={onClickBusinessManagerData}>{datas[key].FOURTH_WEEK}</TableContentTdBoldClickable>
                            </TableContentTbodyTr>
                        )
                    } else {
                        return (
                            <TableContentTbodyTr key={i}>
                                <TableContentTdLabel>{datas[key].TITLE}</TableContentTdLabel>
                                <TableContentTd>{datas[key].FIRST_WEEK}</TableContentTd>
                                <TableContentTd>{datas[key].SECOND_WEEK}</TableContentTd>
                                <TableContentTd>{datas[key].THIRD_WEEK}</TableContentTd>
                                <TableContentTd>{datas[key].FOURTH_WEEK}</TableContentTd>
                            </TableContentTbodyTr>
                        )
                    }
                })
            }
        </>
    )
}

BusinessManager.propTypes = {
    datas: object,
    isCvSentWeekLoading: bool
};

export default connect(
    state => ({
        datas: pathOr({}, ["kpi", "dataEmployee", "datasBusinessManager"], state),
        isCvSentWeekLoading: path(["kpi", "isCvSentWeekLoading"], state)
    }),
    {}
)(BusinessManager);
