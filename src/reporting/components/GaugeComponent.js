import React from "react";
import { connect } from "react-redux";
import GaugeChart from 'react-gauge-chart'
import theme from '../../style/theme'
import { number, object, bool } from 'prop-types'
import { path } from 'ramda'
import styled from 'styled-components'

const BoxGauge = styled.div(() => ({
    width: "410px",
    paddingTop: "35px"
}));

const Paragraph = styled.p`
  font-size: 35px;
  text-align: center;
`

const GaugeDataDisplaying = styled.p`
  font-size: 18px;
  text-align: center;
`

const GaugeComponent = ({ gaugeGreenStart, gaugeGreenEnd, gaugeOrangeStart, gaugeOrangeEnd, gaugeRedStart, gaugeRedEnd, weeklySpeedScore, isCalculatingWeeklySpeed }) => {

    const endGreenGaugeConverted = 1;
    const startGreendGaugeConverted = (gaugeGreenStart / gaugeGreenEnd).toFixed(2)
    const numberGapGreen = endGreenGaugeConverted - startGreendGaugeConverted

    const endOrangeGaugeConverted = (gaugeOrangeEnd / gaugeGreenEnd).toFixed(2)
    const startOrangeGaugeConverted = (gaugeOrangeStart / gaugeGreenEnd).toFixed(2)
    const numberGapOrange = endOrangeGaugeConverted - startOrangeGaugeConverted

    const endRedGaugeConverted = (gaugeRedEnd / gaugeGreenEnd).toFixed(2)
    const startRedGaugeConverted = (gaugeRedStart / gaugeGreenEnd).toFixed(2)
    const numberGapRed = endRedGaugeConverted - startRedGaugeConverted

    let weeklySpeedGauge = (weeklySpeedScore.FOURTH_WEEK >= 0 && !isCalculatingWeeklySpeed) ? parseFloat((weeklySpeedScore.FOURTH_WEEK / gaugeGreenEnd).toFixed(2)) : 0
    let lastWeekScore = (!isCalculatingWeeklySpeed) ? weeklySpeedScore.FOURTH_WEEK : 0
    let weeklySpeedGaugeDisplayed = (weeklySpeedGauge > 1) ? 1 : weeklySpeedGauge

    return (
        <BoxGauge>
            <GaugeChart
                id="gauge-chart5"
                nrOfLevels={420}
                arcsLength={[numberGapRed, numberGapOrange, numberGapGreen]}
                colors={[theme.bmColors[0], theme.colors.yellow, theme.bmColors[8]]}
                percent={weeklySpeedGaugeDisplayed}
                arcPadding={0.02}
                textColor="#000000"
            />
            <Paragraph>Weekly Speed</Paragraph>
            <GaugeDataDisplaying>The target : {gaugeGreenStart}</GaugeDataDisplaying>
            <GaugeDataDisplaying>Your score : {lastWeekScore}</GaugeDataDisplaying>
        </BoxGauge>
    )
}

GaugeComponent.propTypes = {
    gaugeGreenStart: number,
    gaugeGreenEnd: number,
    gaugeOrangeStart: number,
    gaugeOrangeEnd: number,
    gaugeRedStart: number,
    gaugeRedEnd: number,
    weeklySpeedScore: object,
    isCalculatingWeeklySpeed: bool
};

export default connect(
    state => ({
        gaugeGreenStart: path(["weeklySpeed", "gaugeLimitForEmployeeSelected", "GREEN", "START"], state),
        gaugeGreenEnd: path(["weeklySpeed", "gaugeLimitForEmployeeSelected", "GREEN", "END"], state),
        gaugeOrangeStart: path(["weeklySpeed", "gaugeLimitForEmployeeSelected", "ORANGE", "START"], state),
        gaugeOrangeEnd: path(["weeklySpeed", "gaugeLimitForEmployeeSelected", "ORANGE", "END"], state),
        gaugeRedStart: path(["weeklySpeed", "gaugeLimitForEmployeeSelected", "RED", "START"], state),
        gaugeRedEnd: path(["weeklySpeed", "gaugeLimitForEmployeeSelected", "RED", "END"], state),
        weeklySpeedScore: path(["weeklySpeed", "weeklySpeedScores"], state),
        isCalculatingWeeklySpeed: path(["weeklySpeed", "isCalculatingWeeklySpeed"], state),
    }),
    {}
)(GaugeComponent);