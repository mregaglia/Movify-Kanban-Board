import React from 'react'
import PropTypes from 'prop-types'

import { Action, Modal, Row, Title } from '../components/modal'
import { useDeleteJobSubmission } from '../hooks'

const DeleteCandidateModal = ({ isOpen, onClose, title, jobSubmissionId }) => {
  const deleteJobSubmission = useDeleteJobSubmission(jobSubmissionId)

  const handleRemoveCandidate = () => {
    deleteJobSubmission.mutate()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Title>{`Delete candidate from ${title}`}</Title>
      <Row>
        <Action type="button" onClick={onClose}>
          Cancel
        </Action>
        <Action type="button" positive onClick={handleRemoveCandidate}>
          Delete candidate
        </Action>
      </Row>
    </Modal>
  )
}

DeleteCandidateModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  jobSubmissionId: PropTypes.number,
}

export default DeleteCandidateModal
