import React from "react";
import { connect } from "react-redux";
import { TableContentTd, TableContentTdTitle, TableContentTbodyTr, TableContentTbodyTrNoLine, TableContentTdLabel, TableContentTdLabelBold, TableContentTdBoldClickable } from "../../style/table_style"
import { path, pathOr } from 'ramda'
import { object, bool } from "prop-types"
import Loader from 'react-loader-spinner'
import { LABEL_PROJECT_START, LABEL_CV_SENT, LABEL_MEETING_DONE, LABEL_INTAKE } from '../../utils/reporting'
import {
    INTAKES,
    PROSPECTION_MEETING_DONE
} from '../expandView/expandView.sagas'
import ExpandViewDetailClient from './ExpandViewDetailClient'
import ReactTooltip from 'react-tooltip'
import {
    FIRST_WEEK, SECOND_WEEK, FOURTH_WEEK, THIRD_WEEK
} from '../kpi/kpi.sagas'

const tableWeek = [FIRST_WEEK, SECOND_WEEK, THIRD_WEEK, FOURTH_WEEK]

const BusinessManager = ({ datas, isCvSentWeekLoading }) => {
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
                    } else if (datas[key].TITLE === LABEL_INTAKE ) {
                        return (
                            <TableContentTbodyTr key={i}>
                                <TableContentTdLabelBold >{datas[key].TITLE}</TableContentTdLabelBold>
                                {
                                    tableWeek.map((week) =>
                                        <TableContentTdBoldClickable key={week} data-for={i + '' + key + '' + week} data-event="click" data-tip>{datas[key][week]}
                                            <ReactTooltip id={i + '' + key + '' + week} globalEventOff='click' place="right" clickable={true}>
                                                <ExpandViewDetailClient week={week} title={INTAKES} />
                                            </ReactTooltip>
                                        </TableContentTdBoldClickable>
                                    )
                                }

                            </TableContentTbodyTr>
                        )
                    } else if(datas[key].TITLE === LABEL_MEETING_DONE) {
                        return (
                            <TableContentTbodyTr key={i}>
                                <TableContentTdLabelBold >{datas[key].TITLE}</TableContentTdLabelBold>
                                {
                                    tableWeek.map((week) =>
                                        <TableContentTdBoldClickable key={week} data-for={i + '' + key + '' + week} data-event="click" data-tip>{datas[key][week]}
                                            <ReactTooltip id={i + '' + key + '' + week} globalEventOff='click' place="right" clickable={true}>
                                                <ExpandViewDetailClient week={week} title={PROSPECTION_MEETING_DONE} />
                                            </ReactTooltip>
                                        </TableContentTdBoldClickable>
                                    )
                                }

                            </TableContentTbodyTr>
                        )
                    }else {
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
