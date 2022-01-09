import React, { useState } from 'react'
import { connect } from 'react-redux'
import { func, object, string } from 'prop-types'
import { pathOr, prop } from 'ramda'
import styled from 'styled-components'

import AddCandidateModal from '../addCandidate/AddCandidateModal'
import { ColorRowText } from '../components'
import Board from '../components/board/Board'
import { Add } from '../components/svgs'
import { RECRUITMENT_STATUSES } from '../utils/kanban'

import { createJobSubmission } from './recruitment.actions'

const Container = styled.div({
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 24,
})

const AddButton = styled.div(({ color, theme }) => ({
  alignSelf: 'center',
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: theme.colors.darkWhite,
  color,
  height: 30,
  width: 30,
  borderRadius: 15,
  marginRight: 8,
  marginLeft: 16,
}))

const JobOrder = ({ createJobSubmission: createJobSubmissionProp, jobOrder, color }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onAddCandidate = (values) =>
    createJobSubmissionProp(jobOrder, { candidate: prop('candidate', values) }, prop('status', values))
  return (
    <div>
      <ColorRowText color={color}>
        {`${prop('title', jobOrder)} – ${prop('id', jobOrder)}`}
        <AddButton color={color} onClick={() => setIsModalOpen(true)}>
          <Add color={color} style={{ paddingTop: 3, paddingLeft: 0.5 }} />
        </AddButton>
        <AddCandidateModal
          statuses={RECRUITMENT_STATUSES}
          jobOrder={jobOrder}
          isOpen={isModalOpen}
          onAdd={onAddCandidate}
          onClose={() => setIsModalOpen(false)}
        />
      </ColorRowText>
      <Container>
        <Board
          board="recruitment"
          jobSubmissions={prop('jobSubmissions', jobOrder)}
          statuses={RECRUITMENT_STATUSES}
          jobOrderId={prop('id', jobOrder)}
        />
      </Container>
    </div>
  )
}

JobOrder.propTypes = {
  color: string,
  createJobSubmission: func,
  jobOrder: object,
}

export default connect(
  (state, { joId }) => ({
    jobOrder: pathOr({}, ['recruitment', 'jobOrders', joId], state),
  }),
  { createJobSubmission }
)(JobOrder)
