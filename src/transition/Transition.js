import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { connect, useSelector } from 'react-redux'
import { func, string } from 'prop-types'
import { prop } from 'ramda'
import styled, { css } from 'styled-components'

import { useFindCandidates } from '../hooks'

import CandidateCard from './CandidateCard'
import { removeHotCandidate } from './transition.actions'

const getBackgroundColor = (isNoGo, snapshot, theme) => {
  if (snapshot.isDraggingOver) return theme.colors.transparentRed
  if (snapshot.draggingFromThisWith) return theme.colors.transparentGrey
  return theme.colors.lightGrey
}

const Container = styled.div(({ theme }) => ({
  padding: 8,
  marginBottom: 16,
  backgroundColor: theme.colors.lightGrey,
  borderRadius: theme.dimensions.borderRadius,
}))

const Content = styled.div(({ isNoGo, snapshot, theme }) => ({
  padding: 8,
  backgroundColor: getBackgroundColor(isNoGo, snapshot, theme),
  borderRadius: theme.dimensions.borderRadius,
}))

const Title = styled.div(({ theme }) => ({
  display: 'inline-block',
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.medium,
  fontWeight: 600,
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 8,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
}))

export const HotCandidate = styled.p`
  background-color: #d3d3d340;
  border-radius: 6px;
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  padding: 0.6rem;
  width: max-content;
  height: max-content;
  font-size: 0.875rem;
  line-height: 1.3;
  min-width: 8rem;
  position: relative;
`

const RemoveHotCandidate = styled.button`
  ${({ theme: { colors } }) => css`
    width: 10px;
    height: 10px;
    position: absolute;
    padding: 0;
    border: none;
    background: none;
    right: 0.3rem;
    bottom: 0.3rem;
    &:hover {
      cursor: pointer;
    }
    &::before,
    &::after {
      content: '';
      position: absolute;
      height: 10px;
      width: 2px;
      background-color: ${colors.darkGrey};
      top: 0;
    }
    &::before {
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
  `}
`

const Transition = ({ board, removeHotCandidate: removeHotCandidateProp }) => {
  const { candidates, hotCandidateIds } = useSelector(({ transition }) => ({
    candidates: transition?.candidates ?? [],
    hotCandidateIds: transition?.hotCandidates ?? [],
  }))

  let hotCandidates = useFindCandidates(hotCandidateIds?.map((id) => ({ id })))

  const doNotRender =
    board === 'reporting' || (board === 'kanban' && !candidates?.length > 0 && !hotCandidates?.length > 0)

  if (doNotRender) return null

  const queriesFailed = hotCandidates?.some((hotCandidate) => !hotCandidate.isSuccess)

  hotCandidates = hotCandidates?.map((hotCandidate) => hotCandidate?.data?.data) ?? []

  const renderContent = () => {
    if (hotCandidates?.length > 0 && !queriesFailed) {
      return hotCandidates?.map(({ id, firstName, lastName }, index) => (
        <Draggable draggableId={id} index={index} key={id}>
          {(provided2) => (
            <HotCandidate ref={provided2.innerRef} {...provided2.draggableProps} {...provided2.dragHandleProps}>
              {`${firstName} ${lastName}`}
              <RemoveHotCandidate onClick={() => removeHotCandidateProp(id)} />
            </HotCandidate>
          )}
        </Draggable>
      ))
    }
    if (candidates?.length > 0) {
      return candidates.map((candidate, index) => (
        <CandidateCard index={index} key={`${index}.${prop('id', candidate)}`} candidate={candidate} />
      ))
    }

    return null
  }

  return (
    <Container>
      <Title>Transition board</Title>
      <Droppable droppableId="transition" direction="horizontal">
        {(provided, snapshot) => (
          <Content snapshot={snapshot}>
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ minHeight: 65, height: '100%', display: 'flex' }}
            >
              {renderContent()}
              {provided.placeholder}
            </div>
          </Content>
        )}
      </Droppable>
    </Container>
  )
}

Transition.propTypes = {
  board: string,
  removeHotCandidate: func,
}

export default connect(null, { removeHotCandidate })(Transition)
