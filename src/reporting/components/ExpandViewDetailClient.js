import React from 'react'
import { connect } from "react-redux"
import { pathOr } from 'ramda'
import { array } from 'prop-types'
import styled from 'styled-components'

const Paragraph = styled.p`
    text-align: left
`



const ExpandViewDetailClient = ({ week, title, dataToDisplay }) => {

    return (
        <>
            {
                dataToDisplay.map((data, i) => 
                    <Paragraph key={i}>{}</Paragraph>
                )
            }
        </>

    )

}

ExpandViewDetailClient.propTypes = {
    dataToDisplay: array
};

export default connect(
    (state, { week, title }) => ({
        dataToDisplay: pathOr([], ["expandView", title, week], state),
    }),
    {}
)(ExpandViewDetailClient);