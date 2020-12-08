import React from 'react'
import { connect } from "react-redux";
import { TableContentTd, TableContentTbodyTr, TableContentTdTitle, TableContentTbodyTrNoLine, TableContentTdLabel, TableContentTdBoldClickable, TableContentTdLabelBold } from "../../style/table_style"
import { pathOr } from 'ramda'
import { object, string } from "prop-types"
import { LABEL_HIRED, LABEL_INTERVIEW_DONE, LABEL_INTERVIEW_SCHEDULE, LABEL_CONTACTED_BY_INMAIL } from '../../utils/reporting'
import {
    BUSINESS_MANAGER,
    SOURCING_OFFICER
} from '../../auth/user.sagas'

const TalentAcquisition = ({ datas, occupation }) => {
    function onClickBusinessManagerData(e) {
        
    }
    return (
        <>
            <TableContentTbodyTrNoLine>
                <TableContentTdTitle isBM={occupation.includes(BUSINESS_MANAGER)}>Recruitment</TableContentTdTitle>
            </TableContentTbodyTrNoLine>

            {
                Object.keys(datas).map((key, i) => {

                    if (datas[key].TITLE === LABEL_CONTACTED_BY_INMAIL && occupation.includes(SOURCING_OFFICER)) {
                        return (
                            <TableContentTbodyTr key={i}>
                                <TableContentTdLabelBold>{datas[key].TITLE}</TableContentTdLabelBold>
                                <TableContentTdBoldClickable onClick={onClickBusinessManagerData}>{datas[key].FIRST_WEEK}</TableContentTdBoldClickable>
                                <TableContentTdBoldClickable onClick={onClickBusinessManagerData}>{datas[key].SECOND_WEEK}</TableContentTdBoldClickable>
                                <TableContentTdBoldClickable onClick={onClickBusinessManagerData}>{datas[key].THIRD_WEEK}</TableContentTdBoldClickable>
                                <TableContentTdBoldClickable onClick={onClickBusinessManagerData}>{datas[key].FOURTH_WEEK}</TableContentTdBoldClickable>
                            </TableContentTbodyTr>
                        )
                    } else if ((datas[key].TITLE === LABEL_INTERVIEW_DONE && !occupation.includes(SOURCING_OFFICER)) || (datas[key].TITLE === LABEL_INTERVIEW_SCHEDULE && !occupation.includes(BUSINESS_MANAGER))) {
                        return (
                            <TableContentTbodyTr key={i}>
                                <TableContentTdLabelBold>{datas[key].TITLE}</TableContentTdLabelBold>
                                <TableContentTdBoldClickable onClick={onClickBusinessManagerData}>{datas[key].FIRST_WEEK}</TableContentTdBoldClickable>
                                <TableContentTdBoldClickable onClick={onClickBusinessManagerData}>{datas[key].SECOND_WEEK}</TableContentTdBoldClickable>
                                <TableContentTdBoldClickable onClick={onClickBusinessManagerData}>{datas[key].THIRD_WEEK}</TableContentTdBoldClickable>
                                <TableContentTdBoldClickable onClick={onClickBusinessManagerData}>{datas[key].FOURTH_WEEK}</TableContentTdBoldClickable>
                            </TableContentTbodyTr>
                        )
                    } else if (datas[key].TITLE === LABEL_HIRED) {
                        return (
                            <tr key={i}>
                                <TableContentTdLabel>{datas[key].TITLE}</TableContentTdLabel>
                                <TableContentTd>{datas[key].FIRST_WEEK}</TableContentTd>
                                <TableContentTd>{datas[key].SECOND_WEEK}</TableContentTd>
                                <TableContentTd>{datas[key].THIRD_WEEK}</TableContentTd>
                                <TableContentTd>{datas[key].FOURTH_WEEK}</TableContentTd>
                            </tr>
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

TalentAcquisition.propTypes = {
    datas: object,
    occupation: string
};

export default connect(
    state => ({
        datas: pathOr({}, ["kpi", "dataEmployee", "datasRecruitment"], state),
        occupation: pathOr("", ["employees", "employeeSelected", "occupation"], state)
    }),
    {}
)(TalentAcquisition);