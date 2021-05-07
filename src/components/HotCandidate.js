import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Draggable } from "react-beautiful-dnd"
import Board from './board/Board'
import { HOT_CANDIDATE_STATUSES } from '../utils/kanban'
import { Trash } from './svgs'
import enforceHighContrast from '../utils/enforceHighContrast'

const Container = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr 6fr;
`

const Name = styled.p`
  font-weight: 600;
  margin: 0;
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

const Role = styled.p`
  margin: 0;
`

const DateAvailable = styled.p`
  ${({ colorCode }) => css`
    background-color: ${colorCode};
    width: max-content;
    padding: 0.5rem;
    border-radius: 6px;
    color: ${enforceHighContrast(colorCode)};
    margin: 0;
  `}
`

const HotCandidate = ({ hotCandidate: { name, role, dateAvailable, id, dateColorCode, ...statusesData }, onOpenDeleteModal, onOpenAddCompanyModal, index }) => {
  const handleClickOpenDeleteModal = () => {
    onOpenDeleteModal(id)
  }
  const handleClickOpenAddCompanyModal = () => {
    onOpenAddCompanyModal(id)
  }

  const draggableId = `NO_STATUS@${id}`

  return (
    <Container>
      <Draggable draggableId={draggableId} index={index}>
        {(provided, snapshot) => (
          <Text
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Name>{name}</Name>
            <Role>{role}</Role>
            <DateAvailable colorCode={dateColorCode}>{dateAvailable}</DateAvailable>
          </Text>
        )}
      </Draggable>
      <StyledBoard
        board="hot-candidates"
        statuses={HOT_CANDIDATE_STATUSES}
        statusesData={statusesData}
        onOpenAddCompanyModal={handleClickOpenAddCompanyModal}
        candidateId={id}
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
  onOpenAddCompanyModal: PropTypes.func,
  index: PropTypes.number,
}

export default HotCandidate
