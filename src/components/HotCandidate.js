import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Board from './board/Board'
import { HOT_CANDIDATE_STATUSES } from '../utils/kanban'
import { Trash } from './svgs'

const Container = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr 6fr;
`

const Name = styled.p`
  font-weight: 600;
`

const StyledBoard = styled(Board)`
  grid-row: 1;
  grid-column: 2;
`

const Text = styled.div`
  display: grid;
  gap: 0.5rem;
  align-self: start;
  padding-top: 1rem;
  grid-column: 1;
  grid-row: 1;
`

const DeleteButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  width: 2rem;
  height: 2rem;
  grid-column: 1;
  grid-row: 1;
  justify-self: end;
  font-size: 0;
  margin-top: 0.5rem;
  &:hover {
    cursor: pointer;
  }
`

const HotCandidate = ({ hotCandidate: { name, role, dateAvailable, id, ...statusesData }, onOpenDeleteModal }) => {
  const handleClickOpenDeleteModal = () => {
    onOpenDeleteModal(id)
  }
  return (
    <Container>
      <Text>
        <Name>{name}</Name>
        <p>{role}</p>
        <p>{dateAvailable}</p>
      </Text>
      <StyledBoard
        board="hot-candidates"
        statuses={HOT_CANDIDATE_STATUSES}
        statusesData={statusesData}
      />
      <DeleteButton onClick={handleClickOpenDeleteModal}>
        <Trash size={16} />
      </DeleteButton>
    </Container>
  )
}

HotCandidate.propTypes = {
  hotCandidate: PropTypes.object,
  onOpenDeleteModal: PropTypes.func,
}

export default HotCandidate
