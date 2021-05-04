import React from 'react'
import PropTypes from 'prop-types'
import { Action, Modal, Row, Title } from '../components/modal'
import { useIndexedDb } from "../hooks"

const DeleteCandidateModal = ({ isOpen, onClose, title, candidateId }) => {
  const db = useIndexedDb()

  const handleRemoveCandidate = async () => {
    await db.users.where({ id: candidateId }).delete()
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
  onAdd: PropTypes.func,
  onClose: PropTypes.func,
  title: PropTypes.string,
  candidateId: PropTypes.number,
}

export default DeleteCandidateModal
