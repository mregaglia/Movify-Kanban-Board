import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import GaugeChart from "react-gauge-chart"
import theme from "../../style/theme"
import { number, object, bool, string } from "prop-types"
import { path } from "ramda"
import styled from "styled-components"
import debounce from "../../utils/debounce"
import { POINT_CV_SENT } from "../weeklySpeed/weeklySpeed.sagas"

const BoxGauge = styled.div`
  width: 410px;
  padding-top: 35px;
`

const Paragraph = styled.p`
  font-size: 35px;
  text-align: center;
`

const GaugeDataDisplaying = styled.p`
  font-size: 18px;
  text-align: center;
`

const GaugeComponent = ({
  className,
  gaugeGreenStart,
  weeklySpeedScore,
  hasCalculatedWeeklySpeed,
  cvsSent,
}) => {
  const [key, setKey] = useState(new Date())

  const weeklySpeedScoreWeek4 = cvsSent?.FOURTH_WEEK
    ? weeklySpeedScore.FOURTH_WEEK + cvsSent.FOURTH_WEEK * POINT_CV_SENT
    : weeklySpeedScore.FOURTH_WEEK

  const weeklySpeedGauge =
    weeklySpeedScoreWeek4 >= 0 && hasCalculatedWeeklySpeed
      ? parseFloat((weeklySpeedScoreWeek4 / gaugeGreenStart).toFixed(2))
      : 0
  const lastWeekScore = hasCalculatedWeeklySpeed ? weeklySpeedScoreWeek4 : 0
  const weeklySpeedGaugeDisplayed = weeklySpeedGauge > 1 ? 1 : weeklySpeedGauge

  useEffect(() => {
    // Changing the key on resize forces the component to re-render
    // Which will prevent the bug were the needle reverts back to its default value
    // Issue: https://github.com/Martin36/react-gauge-chart/issues/35
    // Once this PR is merged (https://github.com/Martin36/react-gauge-chart/pull/59),
    // the issue should be resolved and we can remove all this logic
    // The library seems to be rather dead though 🥲
    const handleResize = () => {
      setKey(new Date())
    }

    // Debounce to improve performance
    const debouncedHandleResize = debounce(handleResize, 1000)

    // Subscribe to the event
    window.addEventListener("resize", debouncedHandleResize)

    // Unsubscribe from the event
    return () => window.removeEventListener("resize", handleResize)
  })

  return (
    <BoxGauge key={key} className={className}>
      <GaugeChart
        id="gauge-chart5"
        nrOfLevels={420}
        arcsLength={[0.7, 0.15, 0.15]}
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
  weeklySpeedScore: object,
  cvsSent: object,
  hasCalculatedWeeklySpeed: bool,
  className: string,
}

export default connect(
  (state) => ({
    gaugeGreenStart: path(
      ["weeklySpeed", "gaugeLimitForEmployeeSelected", "GREEN", "START"],
      state
    ),
    weeklySpeedScore: path(["weeklySpeed", "weeklySpeedScores"], state),
    hasCalculatedWeeklySpeed: path(
      ["weeklySpeed", "hasCalculatedWeeklySpeed"],
      state
    ),
    cvsSent: state?.kpi?.dataEmployee?.datasBusinessManager?.CV_SENT,
  }),
  {}
)(GaugeComponent)
