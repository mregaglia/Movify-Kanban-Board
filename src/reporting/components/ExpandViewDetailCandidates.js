import React from 'react'
import { connect } from "react-redux"
import { pathOr, propOr, prop } from 'ramda'
import { array } from 'prop-types'
import styled from 'styled-components'
import BullhornBadge from '../../components/BullhornBadge'
import { Row } from '../../components/modal'

const Paragraph = styled.p`
    text-align: left
`

const ExpandViewDetailCandidates = ({ week, title, dataToDisplay }) => {

    return (
        <>
            {
                dataToDisplay.map((data, i) => (
                    <Row key={i}>
                        <Paragraph >{propOr("", 'FIRSTNAME', data).trim() + ' ' + propOr("", 'LASTNAME', data).trim() + ' @' + propOr("", 'CATEGORY', data).trim()}</Paragraph>
                        <BullhornBadge candidate={{ id: prop('ID', data) }} />
                    </Row>
                ))
            }
        </>

    )

}

ExpandViewDetailCandidates.propTypes = {
    dataToDisplay: array
};

export default connect(
    (state, { week, title }) => ({
        dataToDisplay: pathOr([], ["expandView", title, week], state),
    }),
    {}
)(ExpandViewDetailCandidates);