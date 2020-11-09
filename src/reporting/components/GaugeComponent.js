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

const GaugeComponent = ({ gaugeGreenStart, gaugeGreenEnd, gaugeOrangeStart, gaugeOrangeEnd, gaugeRedStart, gaugeRedEnd }) => {

    const endGreenGaugeConverted = 1;
    const startGreendGaugeConverted = (gaugeGreenStart / gaugeGreenEnd).toFixed(2)
    const numberGapGreen = endGreenGaugeConverted - startGreendGaugeConverted

    const endOrangeGaugeConverted = (gaugeOrangeEnd / gaugeGreenEnd).toFixed(2)
    const startOrangeGaugeConverted = (gaugeOrangeStart / gaugeGreenEnd).toFixed(2)
    const numberGapOrange = endOrangeGaugeConverted - startOrangeGaugeConverted

    const endRedGaugeConverted = (gaugeRedEnd / gaugeGreenEnd).toFixed(2)
    const startRedGaugeConverted = (gaugeRedStart / gaugeGreenEnd).toFixed(2)
    const numberGapRed = endRedGaugeConverted - startRedGaugeConverted

    return (
        <BoxGauge>
            <GaugeChart
                id="gauge-chart5"
                nrOfLevels={420}
                arcsLength={[numberGapRed, numberGapOrange, numberGapGreen]}
                colors={[theme.bmColors[0], theme.colors.yellow, theme.bmColors[8]]}
                percent={0}
                arcPadding={0.02}
                textColor="#000000"
            />
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
};

export default connect(
    state => ({
        gaugeGreenStart: path(["kpi", "gaugeLimit", "GREEN", "START"], state),
        gaugeGreenEnd: path(["kpi", "gaugeLimit", "GREEN", "END"], state),
        gaugeOrangeStart: path(["kpi", "gaugeLimit", "ORANGE", "START"], state),
        gaugeOrangeEnd: path(["kpi", "gaugeLimit", "ORANGE", "END"], state),
        gaugeRedStart: path(["kpi", "gaugeLimit", "RED", "START"], state),
        gaugeRedEnd: path(["kpi", "gaugeLimit", "RED", "END"], state),
    }),
    {}
)(GaugeComponent);