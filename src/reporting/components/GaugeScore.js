import React, { useMemo } from 'react'
import Loader from 'react-loader-spinner'
import { connect } from 'react-redux'
import { bool, number, object, string } from 'prop-types'
import { pathOr } from 'ramda'

import { BUSINESS_MANAGER } from '../../auth/user.sagas'
import {
  TableContentTbodyTr,
  TableContentTbodyTrNoLine,
  TableContentTd,
  TableContentTdBold,
  TableContentTdLabel,
  TableContentTdLabelBold,
  TableContentTdTitle,
} from '../../style/table_style'
import { POINT_CV_SENT } from '../weeklySpeed/weeklySpeed.sagas'

const calculatePercentage = (weeklySpeedScore, gaugeGreenStart) =>
  ((weeklySpeedScore / gaugeGreenStart) * 100).toFixed(0)

const GaugeScore = ({ occupation, hasCalculatedWeeklySpeed, weeklySpeedScore, gaugeGreenStart, cvsSent }) => {
  const scores = useMemo(() => {
    const firstWeekScore = cvsSent?.FIRST_WEEK
      ? weeklySpeedScore.FIRST_WEEK + POINT_CV_SENT * cvsSent.FIRST_WEEK
      : weeklySpeedScore.FIRST_WEEK
    const secondWeekScore = cvsSent?.SECOND_WEEK
      ? weeklySpeedScore.SECOND_WEEK + POINT_CV_SENT * cvsSent.SECOND_WEEK
      : weeklySpeedScore.SECOND_WEEK
    const thirdWeekScore = cvsSent?.THIRD_WEEK
      ? weeklySpeedScore.THIRD_WEEK + POINT_CV_SENT * cvsSent.THIRD_WEEK
      : weeklySpeedScore.THIRD_WEEK
    const fourthWeekScore = cvsSent?.FOURTH_WEEK
      ? weeklySpeedScore.FOURTH_WEEK + POINT_CV_SENT * cvsSent.FOURTH_WEEK
      : weeklySpeedScore.FOURTH_WEEK

    return {
      FIRST_WEEK: {
        percentage: calculatePercentage(firstWeekScore, gaugeGreenStart),
        value: firstWeekScore,
      },
      SECOND_WEEK: {
        percentage: calculatePercentage(secondWeekScore, gaugeGreenStart),
        value: secondWeekScore,
      },
      THIRD_WEEK: {
        percentage: calculatePercentage(thirdWeekScore, gaugeGreenStart),
        value: thirdWeekScore,
      },
      FOURTH_WEEK: {
        percentage: calculatePercentage(fourthWeekScore, gaugeGreenStart),
        value: fourthWeekScore,
      },
    }
  }, [weeklySpeedScore, gaugeGreenStart, cvsSent])

  return (
    <>
      <TableContentTbodyTrNoLine>
        <TableContentTdTitle isBM={[BUSINESS_MANAGER].includes(occupation)}>Weekly Speed</TableContentTdTitle>
      </TableContentTbodyTrNoLine>

      <TableContentTbodyTr>
        <TableContentTdLabel>Your percentage</TableContentTdLabel>
        {!hasCalculatedWeeklySpeed && (
          <>
            <TableContentTdBold>
              <Loader type="ThreeDots" color="#00BFFF" height={15} width={20} />
            </TableContentTdBold>
            <TableContentTdBold>
              <Loader type="ThreeDots" color="#00BFFF" height={15} width={20} />
            </TableContentTdBold>
            <TableContentTdBold>
              <Loader type="ThreeDots" color="#00BFFF" height={15} width={20} />
            </TableContentTdBold>
            <TableContentTdBold>
              <Loader type="ThreeDots" color="#00BFFF" height={15} width={20} />
            </TableContentTdBold>
          </>
        )}
        {hasCalculatedWeeklySpeed && (
          <>
            <TableContentTd>{scores.FIRST_WEEK.percentage} %</TableContentTd>
            <TableContentTd>{scores.SECOND_WEEK.percentage} %</TableContentTd>
            <TableContentTd>{scores.THIRD_WEEK.percentage} %</TableContentTd>
            <TableContentTd>{scores.FOURTH_WEEK.percentage} %</TableContentTd>
          </>
        )}
      </TableContentTbodyTr>
      <tr>
        <TableContentTdLabelBold>Your score</TableContentTdLabelBold>
        {!hasCalculatedWeeklySpeed && (
          <>
            <TableContentTdBold>
              <Loader type="ThreeDots" color="#00BFFF" height={15} width={20} />
            </TableContentTdBold>
            <TableContentTdBold>
              <Loader type="ThreeDots" color="#00BFFF" height={15} width={20} />
            </TableContentTdBold>
            <TableContentTdBold>
              <Loader type="ThreeDots" color="#00BFFF" height={15} width={20} />
            </TableContentTdBold>
            <TableContentTdBold>
              <Loader type="ThreeDots" color="#00BFFF" height={15} width={20} />
            </TableContentTdBold>
          </>
        )}
        {hasCalculatedWeeklySpeed && (
          <>
            <TableContentTdBold>{scores.FIRST_WEEK.value}</TableContentTdBold>
            <TableContentTdBold>{scores.SECOND_WEEK.value}</TableContentTdBold>
            <TableContentTdBold>{scores.THIRD_WEEK.value}</TableContentTdBold>
            <TableContentTdBold>{scores.FOURTH_WEEK.value}</TableContentTdBold>
          </>
        )}
      </tr>
    </>
  )
}

GaugeScore.propTypes = {
  occupation: string,
  hasCalculatedWeeklySpeed: bool,
  weeklySpeedScore: object,
  cvsSent: object,
  gaugeGreenStart: number,
}

export default connect(
  (state) => ({
    occupation: pathOr('', ['employees', 'employeeSelected', 'occupation'], state),
    hasCalculatedWeeklySpeed: pathOr(false, ['weeklySpeed', 'hasCalculatedWeeklySpeed'], state),
    weeklySpeedScore: pathOr({}, ['weeklySpeed', 'weeklySpeedScores'], state),
    gaugeGreenStart: pathOr(0, ['weeklySpeed', 'gaugeLimitForEmployeeSelected', 'GREEN', 'START'], state),
    cvsSent: state?.kpi?.dataEmployee?.datasBusinessManager?.CV_SENT,
  }),
  {}
)(GaugeScore)
