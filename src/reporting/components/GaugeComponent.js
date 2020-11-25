import React from "react";
import { connect } from "react-redux";
import GaugeChart from 'react-gauge-chart'
import theme from '../../style/theme'
import { number } from 'prop-types'
import { path } from 'ramda'
import styled from 'styled-components'

const BoxGauge = styled.div(({ color, theme }) => ({
    width: "410px",
    paddingTop: "35px"
}));

const Paragraph = styled.p`
  font-size: 35px;
  text-align: center;
`

const GaugeComponent = ({ gaugeGreenStart, gaugeGreenEnd, gaugeOrangeStart, gaugeOrangeEnd, gaugeRedStart, gaugeRedEnd, pointWeeklySpeed }) => {

    const endGreenGaugeConverted = 1;
    const startGreendGaugeConverted = (gaugeGreenStart / gaugeGreenEnd).toFixed(2)
    const numberGapGreen = endGreenGaugeConverted - startGreendGaugeConverted

    const endOrangeGaugeConverted = (gaugeOrangeEnd / gaugeGreenEnd).toFixed(2)
    const startOrangeGaugeConverted = (gaugeOrangeStart / gaugeGreenEnd).toFixed(2)
    const numberGapOrange = endOrangeGaugeConverted - startOrangeGaugeConverted

    const endRedGaugeConverted = (gaugeRedEnd / gaugeGreenEnd).toFixed(2)
    const startRedGaugeConverted = (gaugeRedStart / gaugeGreenEnd).toFixed(2)
    const numberGapRed = endRedGaugeConverted - startRedGaugeConverted

    const weeklySpeedGauge = parseFloat((pointWeeklySpeed / gaugeGreenEnd).toFixed(2))


    return (
        <BoxGauge>
            <GaugeChart
                id="gauge-chart5"
                nrOfLevels={420}
                arcsLength={[numberGapRed, numberGapOrange, numberGapGreen]}
                colors={[theme.bmColors[0], theme.colors.yellow, theme.bmColors[8]]}
                percent={weeklySpeedGauge}
                arcPadding={0.02}
                textColor="#000000"
            />
            <Paragraph>Weekly Speed</Paragraph>
            <p>The goal : {gaugeGreenStart}</p>
            <p>Your points : {pointWeeklySpeed}</p>
            <p>Percentage : {weeklySpeedGauge * 100}</p>
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
    pointWeeklySpeed: number
};

export default connect(
    state => ({
        gaugeGreenStart: path(["weeklySpeed", "gaugeLimitForEmployeeSelected", "GREEN", "START"], state),
        gaugeGreenEnd: path(["weeklySpeed", "gaugeLimitForEmployeeSelected", "GREEN", "END"], state),
        gaugeOrangeStart: path(["weeklySpeed", "gaugeLimitForEmployeeSelected", "ORANGE", "START"], state),
        gaugeOrangeEnd: path(["weeklySpeed", "gaugeLimitForEmployeeSelected", "ORANGE", "END"], state),
        gaugeRedStart: path(["weeklySpeed", "gaugeLimitForEmployeeSelected", "RED", "START"], state),
        gaugeRedEnd: path(["weeklySpeed", "gaugeLimitForEmployeeSelected", "RED", "END"], state),
        pointWeeklySpeed: path(["weeklySpeed", "pointWeeklySpeed"], state)
    }),
    {}
)(GaugeComponent);