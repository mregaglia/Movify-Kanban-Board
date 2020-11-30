import React from "react";
import { connect } from "react-redux";
import { TableContentTdTitle, TableContentTbodyTrNoLine, TableContentTdTitleForBM, TableContentTbodyTr, TableContentTdLabelBold, TableContentTdBold } from "../../style/table_style"
import { string, bool, object } from "prop-types"
import { pathOr } from 'ramda'
import Loader from 'react-loader-spinner'
import {
    BUSINESS_MANAGER
} from '../../auth/user.sagas'


const GaugeScore = ({ occupation, isCalculatingWeeklySpeed, weeklySpeedScore }) => {


    return (

        <>
            {
                (occupation.includes(BUSINESS_MANAGER)) && (
                    <TableContentTbodyTrNoLine>
                        <TableContentTdTitleForBM>WeeklySpeed</TableContentTdTitleForBM>
                    </TableContentTbodyTrNoLine>
                )
            }
            {
                (!occupation.includes(BUSINESS_MANAGER)) && (
                    <TableContentTbodyTrNoLine>
                        <TableContentTdTitle>WeeklySpeed</TableContentTdTitle>
                    </TableContentTbodyTrNoLine>
                )
            }
            <tr>
                <TableContentTdLabelBold>Your score</TableContentTdLabelBold>
                {
                    (isCalculatingWeeklySpeed && (weeklySpeedScore.FIRST_WEEK === -1 || weeklySpeedScore.SECOND_WEEK === -1 || weeklySpeedScore.THIRD_WEEK === -1 || weeklySpeedScore.FOURTH_WEEK === -1)) && (
                        <>
                            <TableContentTdBold><Loader type="ThreeDots" color="#00BFFF" height={15} width={20} /></TableContentTdBold>
                            <TableContentTdBold><Loader type="ThreeDots" color="#00BFFF" height={15} width={20} /></TableContentTdBold>
                            <TableContentTdBold><Loader type="ThreeDots" color="#00BFFF" height={15} width={20} /></TableContentTdBold>
                            <TableContentTdBold><Loader type="ThreeDots" color="#00BFFF" height={15} width={20} /></TableContentTdBold>
                        </>
                    )
                }
                {
                    (weeklySpeedScore.FIRST_WEEK !== -1 && weeklySpeedScore.SECOND_WEEK !== -1 && weeklySpeedScore.THIRD_WEEK !== -1 && weeklySpeedScore.FOURTH_WEEK !== -1) && (
                        <>
                            <TableContentTdBold>{weeklySpeedScore.FIRST_WEEK}</TableContentTdBold>
                            <TableContentTdBold>{weeklySpeedScore.SECOND_WEEK}</TableContentTdBold>
                            <TableContentTdBold>{weeklySpeedScore.THIRD_WEEK}</TableContentTdBold>
                            <TableContentTdBold>{weeklySpeedScore.FOURTH_WEEK}</TableContentTdBold>
                        </>
                    )
                }
            </tr>
        </>
    )
}

GaugeScore.propTypes = {
    occupation: string,
    isCalculatingWeeklySpeed: bool,
    weeklySpeedScore: object
};

export default connect(
    state => ({
        occupation: pathOr("", ["employees", "employeeSelected", "occupation"], state),
        isCalculatingWeeklySpeed: pathOr("", ["weeklySpeed", "isCalculatingWeeklySpeed"], state),
        weeklySpeedScore: pathOr({}, ["weeklySpeed", "weeklySpeedScores"], state)
    }),
    {}
)(GaugeScore);
