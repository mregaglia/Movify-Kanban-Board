import React from 'react'
import { connect } from "react-redux"
import { pathOr } from 'ramda'
import { array } from 'prop-types'
import styled from 'styled-components'
import BullhornLink from './BullhornLink'
import LinkedinLink from './LinkedinLink'

const Paragraph = styled.p`
    text-align: left
`

const Row = styled.div({
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
});

const ExpandViewDetailClient = ({ week, title, dataToDisplay }) => {

    const filteredData = dataToDisplay?.reduce((accumulator, current) => {
        if(!accumulator.some(item => item.ID === current.ID)) {
            accumulator.push(current);
        }
        return accumulator;
    }, [])
    
    const paragraph = (data) => {
        const companyName = data.COMPANY
        const name = title === "NEW_VACANCY" ? data.JOB_TITLE : `${data.FIRSTNAME} ${data.LASTNAME}`

        return `${name} @ ${companyName}`
    }

    return (
        <>
            {
                filteredData.map((data) => (
                    <Row key={data.ID}>
                        <Paragraph>{paragraph(data)}</Paragraph>
                        <BullhornLink candidateId={data.ID} isClient={title !== "INTAKES"} />
                        <LinkedinLink firstName={data.FIRSTNAME} lastName={data.LASTNAME} />
                    </Row>
                ))
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