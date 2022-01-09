import React from 'react'
import { connect } from 'react-redux'
import { array, string } from 'prop-types'
import { pathOr } from 'ramda'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'

import { CV_SENT, INTAKES, NEW_VACANCY } from '../expandView/expandView.sagas'

import BullhornLink from './BullhornLink'
import LinkedinLink from './LinkedinLink'

const Paragraph = styled.p`
  text-align: left;
  font-weight: bold;
`

const Row = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
})

const ExpandViewDetailClient = ({ title, dataToDisplay }) => {
  const paragraph = (data) => {
    const companyNameOrJobTitle = title === CV_SENT ? data?.JOB_TITLE : data.COMPANY
    const name = title === NEW_VACANCY ? data.JOB_TITLE : `${data.FIRSTNAME} ${data.LASTNAME}`
    if (data.ID_JOB_TITLE) {
      return `${data.ID_JOB_TITLE} ${name} @ ${companyNameOrJobTitle}`
    }
    return `${name} @ ${companyNameOrJobTitle}`
  }

  return (
    <>
      {dataToDisplay.map((data) => (
        <Row key={uuid()}>
          <Paragraph>{paragraph(data)}</Paragraph>
          <BullhornLink candidateId={data.ID} isClient={![INTAKES, CV_SENT].includes(title)} />
          <LinkedinLink firstName={data.FIRSTNAME} lastName={data.LASTNAME} />
        </Row>
      ))}
    </>
  )
}

ExpandViewDetailClient.propTypes = {
  dataToDisplay: array,
  title: string,
}

export default connect(
  (state, { week, title }) => ({
    dataToDisplay: pathOr([], ['expandView', title, week], state),
  }),
  {}
)(ExpandViewDetailClient)
