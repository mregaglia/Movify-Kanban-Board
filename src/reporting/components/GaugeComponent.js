import React from "react";
import { connect } from "react-redux";
import GaugeChart from 'react-gauge-chart'

const GaugeComponent = () => {
    return (
        <>
            <GaugeChart 
                id="gauge-chart5"
                nrOfLevels={420}
                arcsLength={[0.3, 0.5, 0.2]}
                colors={['#5BE12C', '#F5CD19', '#EA4228']}
                percent={0.37}
                arcPadding={0.02}
            />
        </>
    )
}

GaugeComponent.propTypes = {
};

export default connect(
    state => ({
    }),
    {}
)(GaugeComponent);