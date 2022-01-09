import React from 'react'
import { connect } from 'react-redux'
import { array, bool, func, object } from 'prop-types'
import { pathOr, prop, propOr } from 'ramda'

import ConfirmationModal from '../components/ConfirmationModal'
import { removeCandidate } from '../transition/transition.actions'

import { createJobSubmission } from './kanban.actions'

const AddModal = ({
  candidates,
  createJobSubmission: createJobSubmissionProp,
  data,
  isOpen,
  jobOrder,
  onClose,
  hotCandidates,
}) => {
  const candidate = candidates.find(
    (currentCandidate) => String(currentCandidate?.id) === String(data?.candidateId)
  ) || {
    id: hotCandidates.find((hotCandidateId) => String(hotCandidateId) === String(data?.candidateId)),
  }

  const onConfirm = () => {
    createJobSubmissionProp(
      jobOrder,
      {
        candidate,
      },
      data?.status
    )
    removeCandidate(prop('candidateId', data))
    onClose()
  }

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={`Candidate ${propOr('', 'firstName', candidate)} ${propOr('', 'lastName', candidate)}`}
      text={`Do you want to add this candidate for the vacancy ${propOr('', 'title', jobOrder)} from ${pathOr(
        '',
        ['clientCorporation', 'name'],
        jobOrder
      )} ?`}
    />
  )
}

AddModal.propTypes = {
  candidates: array,
  hotCandidates: array,
  createJobSubmission: func,
  isOpen: bool,
  jobOrder: object,
  data: object,
  onClose: func,
}

AddModal.defaultProps = {
  isOpen: false,
  onClose: () => null,
}

export default connect(
  (state, { data }) => ({
    jobOrder: pathOr({}, ['kanban', 'jobOrders', prop(['jobOrderId'], data)], state),
    candidates: pathOr({}, ['transition', 'candidates'], state),
    hotCandidates: pathOr({}, ['transition', 'hotCandidates'], state),
  }),
  { createJobSubmission, removeCandidate }
)(AddModal)
