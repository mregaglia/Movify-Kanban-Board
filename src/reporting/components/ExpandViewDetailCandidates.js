import React from 'react'
import { connect } from "react-redux"
import { pathOr, propOr, prop } from 'ramda'
import { array } from 'prop-types'
import styled from 'styled-components'
import BullhornLink from './BullhornLink'

const Paragraph = styled.p({
    textAlign: "left",
    marginRight: 8
});

const Row = styled.div({
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
});

const ExpandViewDetailCandidates = ({ week, title, dataToDisplay }) => {

    return (
        dataToDisplay.map((data, i) => (
            <Row key={i}>
                <Paragraph >{propOr("", 'FIRSTNAME', data).trim() + ' ' + propOr("", 'LASTNAME', data).trim() + ' @' + propOr("", 'CATEGORY', data).trim()}</Paragraph>
                <BullhornLink candidateId={prop('ID', data)} />
            </Row>
        ))
    )
}

ExpandViewDetailCandidates.propTypes = {
    dataToDisplay: array
};

export default connect(
    (state, { week, title }) => ({
        dataToDisplay: pathOr([], ["expandView", title, week], state),
    })
)(ExpandViewDetailCandidates);