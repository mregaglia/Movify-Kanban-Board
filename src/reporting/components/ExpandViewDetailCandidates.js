import React from 'react'
import { connect } from 'react-redux'
import { array } from 'prop-types'
import { pathOr, prop, propOr } from 'ramda'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'

import BullhornLink from './BullhornLink'
import LinkedinLink from './LinkedinLink'

const Paragraph = styled.p`
  text-align: left;
`

const Row = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
})

const ExpandViewDetailCandidates = ({ dataToDisplay }) => {
  const filteredData = dataToDisplay?.reduce((accumulator, current) => {
    const isEqual = accumulator.some((item) => item.ID === current.ID && item.ID !== 0 && current.ID !== 0)
    if (!isEqual) {
      accumulator.push(current)
    }
    return accumulator
  }, [])

  return (
    <>
      {filteredData.map((data) => (
        <Row key={uuid()}>
          <Paragraph>
            {`${propOr('', 'FIRSTNAME', data).trim()} ${propOr('', 'LASTNAME', data).trim()} @ ${propOr(
              '',
              'CATEGORY',
              data
            ).trim()}`}
          </Paragraph>
          <BullhornLink candidateId={prop('ID', data)} isClient={false} />
          <LinkedinLink
            firstName={propOr('', 'FIRSTNAME', data).trim()}
            lastName={propOr('', 'LASTNAME', data).trim()}
          />
        </Row>
      ))}
    </>
  )
}

ExpandViewDetailCandidates.propTypes = {
  dataToDisplay: array,
}

export default connect(
  (state, { week, title }) => ({
    dataToDisplay: pathOr([], ['expandView', title, week], state),
  }),
  {}
)(ExpandViewDetailCandidates)
