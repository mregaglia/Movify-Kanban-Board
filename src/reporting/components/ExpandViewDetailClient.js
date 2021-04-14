import React from 'react'
import { connect } from "react-redux"
import { pathOr } from 'ramda'
import { array } from 'prop-types'
import styled from 'styled-components'
import BullhornLink from './BullhornLink'
import LinkedinLink from './LinkedinLink'
import { CV_SENT, INTAKES, NEW_VACANCY } from '../expandView/expandView.sagas'

const Paragraph = styled.p`
    text-align: left;
    font-weight: bold;
`

const Row = styled.div({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
});

const ExpandViewDetailClient = ({ week, title, dataToDisplay }) => {

    const filteredData = dataToDisplay?.reduce((accumulator, current) => {
        const isEqual = accumulator.some(item => ((item.ID === current.ID) && (item.ID !== 0 && current.ID !== 0)))
        if (!isEqual) {
            accumulator.push(current);
        }
        return accumulator;
    }, [])

    const paragraph = (data) => {
        const companyNameOrJobTitle = title === CV_SENT ? data?.JOB_TITLE : data.COMPANY
        const name = title === NEW_VACANCY ? data.JOB_TITLE : `${data.FIRSTNAME} ${data.LASTNAME}`

        return `${name} @ ${companyNameOrJobTitle}`
    }

    return (
        <>
            {
                filteredData.map((data) => (
                    <Row key={data.ID}>
                        <Paragraph>{paragraph(data)}</Paragraph>
                        <BullhornLink candidateId={data.ID} isClient={![INTAKES, CV_SENT].includes(title)} />
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