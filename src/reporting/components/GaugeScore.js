import React from "react";
import { connect } from "react-redux";
import { TableContentTdTitle, TableContentTbodyTrNoLine, TableContentTdTitleForBM, TableContentTdLabelBold, TableContentTdBold } from "../../style/table_style"
import { string, bool, object } from "prop-types"
import { pathOr } from 'ramda'
import Loader from 'react-loader-spinner'
import {
    BUSINESS_MANAGER
} from '../../auth/user.sagas'


const GaugeScore = ({ occupation, isCalculatingWeeklySpeed, weeklySpeedScore }) => {


    return (

        <>


            <TableContentTbodyTrNoLine>
                <TableContentTdTitle isBM={occupation.includes(BUSINESS_MANAGER)}>WeeklySpeed</TableContentTdTitle>
            </TableContentTbodyTrNoLine>


            <tr>
                <TableContentTdLabelBold>Your score</TableContentTdLabelBold>
                {
                    (isCalculatingWeeklySpeed) && (
                        <>
                            <TableContentTdBold><Loader type="ThreeDots" color="#00BFFF" height={15} width={20} /></TableContentTdBold>
                            <TableContentTdBold><Loader type="ThreeDots" color="#00BFFF" height={15} width={20} /></TableContentTdBold>
                            <TableContentTdBold><Loader type="ThreeDots" color="#00BFFF" height={15} width={20} /></TableContentTdBold>
                            <TableContentTdBold><Loader type="ThreeDots" color="#00BFFF" height={15} width={20} /></TableContentTdBold>
                        </>
                    )
                }
                {
                    (!isCalculatingWeeklySpeed) && (
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
        isCalculatingWeeklySpeed: pathOr(false, ["weeklySpeed", "isCalculatingWeeklySpeed"], state),
        weeklySpeedScore: pathOr({}, ["weeklySpeed", "weeklySpeedScores"], state)
    }),
    {}
)(GaugeScore);
