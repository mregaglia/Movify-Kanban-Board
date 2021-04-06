import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import GaugeChart from 'react-gauge-chart'
import theme from '../../style/theme'
import { number, object, bool } from 'prop-types'
import { path } from 'ramda'
import styled from 'styled-components'
import debounce from "../../utils/debounce";

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

const GaugeComponent = ({ gaugeGreenStart, gaugeGreenEnd, gaugeOrangeStart, gaugeOrangeEnd, gaugeRedStart, gaugeRedEnd, weeklySpeedScore, hasCalculatedWeeklySpeed }) => {
    const [key, setKey] = useState(new Date())

    const endGreenGaugeConverted = 1;
    const startGreendGaugeConverted = (gaugeGreenStart / gaugeGreenEnd).toFixed(2)
    const numberGapGreen = endGreenGaugeConverted - startGreendGaugeConverted

    const endOrangeGaugeConverted = (gaugeOrangeEnd / gaugeGreenEnd).toFixed(2)
    const startOrangeGaugeConverted = (gaugeOrangeStart / gaugeGreenEnd).toFixed(2)
    const numberGapOrange = endOrangeGaugeConverted - startOrangeGaugeConverted

    const endRedGaugeConverted = (gaugeRedEnd / gaugeGreenEnd).toFixed(2)
    const startRedGaugeConverted = (gaugeRedStart / gaugeGreenEnd).toFixed(2)
    const numberGapRed = endRedGaugeConverted - startRedGaugeConverted

    let weeklySpeedGauge = (weeklySpeedScore.FOURTH_WEEK >= 0 && hasCalculatedWeeklySpeed) ? parseFloat((weeklySpeedScore.FOURTH_WEEK / gaugeGreenStart).toFixed(2)) : 0
    let lastWeekScore = (hasCalculatedWeeklySpeed) ? weeklySpeedScore.FOURTH_WEEK : 0
    let weeklySpeedGaugeDisplayed = (weeklySpeedGauge > 1) ? 1 : weeklySpeedGauge

    useEffect(() => {
        // Changing the key on resize forces the component to re-render
        // Which will prevent the bug were the needle reverts back to its default value
        // Issue: https://github.com/Martin36/react-gauge-chart/issues/35
        // Once this PR is merged (https://github.com/Martin36/react-gauge-chart/pull/59),
        // the issue should be resolved and we can remove all this logic
        // The library seems rather dead though 🥲
        const handleResize = () => {
            setKey(new Date())
        }

        // Debounce to improve performance
        const debouncedHandleResize = debounce(handleResize, 1000)

        // Subscribe to the event
        window.addEventListener('resize', debouncedHandleResize)

        // Unsubscribe from the event
        return () => window.removeEventListener('resize', handleResize)
    })

    return (
        <BoxGauge key={key}>
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
    hasCalculatedWeeklySpeed: bool
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
        hasCalculatedWeeklySpeed: path(["weeklySpeed", "hasCalculatedWeeklySpeed"], state),
    }),
    {}
)(GaugeComponent);