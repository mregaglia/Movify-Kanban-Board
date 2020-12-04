import React from "react";
import { connect } from "react-redux";
import { TableContentTdTitle, TableContentTbodyTrNoLine, TableContentTdLabelBold, TableContentTdBold, TableContentTd, TableContentTdLabel, TableContentTbodyTr } from "../../style/table_style"
import { string, bool, object, number } from "prop-types"
import { pathOr } from 'ramda'
import Loader from 'react-loader-spinner'
import {
    BUSINESS_MANAGER
} from '../../auth/user.sagas'


const GaugeScore = ({ occupation, isCalculatingWeeklySpeed, weeklySpeedScore, gaugeGreenStart }) => {

    let percentageFirstWeek = ((weeklySpeedScore.FIRST_WEEK / gaugeGreenStart).toFixed(2) * 100)
    let percentageSecondWeek = ((weeklySpeedScore.SECOND_WEEK / gaugeGreenStart).toFixed(2) * 100)
    let percentageThirdWeek = ((weeklySpeedScore.THIRD_WEEK / gaugeGreenStart).toFixed(2) * 100)
    let percentageFourthWeek = ((weeklySpeedScore.FOURTH_WEEK / gaugeGreenStart).toFixed(2) * 100)

    return (

        <>
            <TableContentTbodyTrNoLine>
                <TableContentTdTitle isBM={occupation.includes(BUSINESS_MANAGER)}>WeeklySpeed</TableContentTdTitle>
            </TableContentTbodyTrNoLine>

            <TableContentTbodyTr>
                <TableContentTdLabel>Your percentage</TableContentTdLabel>
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
                            <TableContentTd>{percentageFirstWeek} %</TableContentTd>
                            <TableContentTd>{percentageSecondWeek} %</TableContentTd>
                            <TableContentTd>{percentageThirdWeek} %</TableContentTd>
                            <TableContentTd>{percentageFourthWeek} %</TableContentTd>
                        </>
                    )
                }
            </TableContentTbodyTr>
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
    weeklySpeedScore: object,
    gaugeGreenStart: number
};

export default connect(
    state => ({
        occupation: pathOr("", ["employees", "employeeSelected", "occupation"], state),
        isCalculatingWeeklySpeed: pathOr(false, ["weeklySpeed", "isCalculatingWeeklySpeed"], state),
        weeklySpeedScore: pathOr({}, ["weeklySpeed", "weeklySpeedScores"], state),
        gaugeGreenStart: pathOr(0, ["weeklySpeed", "gaugeLimitForEmployeeSelected", "GREEN", "START"], state),
    }),
    {}
)(GaugeScore);
