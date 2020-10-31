import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import GaugeChart from 'react-gauge-chart'
import theme from '../../style/theme'
import { number } from 'prop-types'
import { pathOr } from 'ramda'
import { getColorGaugeLimit } from '../../utils/gaugecalculation'
import styled from 'styled-components'

const BoxGauge = styled.div(({ color, theme }) => ({
    maxWidth: "500px"
}));

const GaugeComponent = ({ gaugeGreenStart, gaugeGreenEnd, gaugeOrangeStart, gaugeOrangeEnd, gaugeRedStart, gaugeRedEnd }) => {

    const [redLimit, setRedLimit] = useState(0);
    const [yellowLimit, setYellowLimit] = useState(0);
    const [greenLimit, setGreenLimit] = useState(0);

    useEffect(() => {
        //onsole.log(getColorGaugeLimit(gaugeRedEnd, gaugeGreenEnd))
        // setRedLimit(getColorGaugeLimit(gaugeRedEnd, gaugeGreenEnd));
        // setYellowLimit(getColorGaugeLimit(gaugeOrangeEnd, gaugeGreenEnd));
        // setGreenLimit(getColorGaugeLimit(gaugeGreenEnd, gaugeGreenEnd))
    }, [])

    return (


        <BoxGauge>
            <GaugeChart
                id="gauge-chart5"
                nrOfLevels={420}
                arcsLength={[0.3, 0.4, 0.3]}
                colors={[theme.bmColors[0], theme.colors.yellow, theme.bmColors[8]]}
                percent={0.37}
                arcPadding={0.02}
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
        gaugeGreenStart: pathOr({}, ["kpi", "gaugeLimit", "GREEN", "START"], state),
        gaugeGreenEnd: pathOr({}, ["kpi", "gaugeLimit", "GREEN", "END"], state),
        gaugeOrangeStart: pathOr({}, ["kpi", "gaugeLimit", "ORANGE", "START"], state),
        gaugeOrangeEnd: pathOr({}, ["kpi", "gaugeLimit", "ORANGE", "END"], state),
        gaugeRedStart: pathOr({}, ["kpi", "gaugeLimit", "RED", "START"], state),
        gaugeRedEnd: pathOr({}, ["kpi", "gaugeLimit", "RED", "END"], state),
    }),
    {}
)(GaugeComponent);