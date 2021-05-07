import React from "react"
import { prop } from "ramda"
import styled from "styled-components"
import { string } from "prop-types"
import { Draggable, Droppable } from "react-beautiful-dnd"
import CandidateCard from "./CandidateCard"
import { useSelector } from "react-redux"
import { useFindCandidates } from "../hooks"

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
  display: "inline-block",
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.medium,
  fontWeight: 600,
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 8,
  textOverflow: "ellipsis",
  overflow: "hidden",
}))

export const HotCandidateCompany = styled.p`
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
`

const Transition = ({ board }) => {
  const { candidates, hotCandidateIds } = useSelector(({ transition }) => ({
    candidates: transition?.candidates ?? [],
    hotCandidateIds: transition?.hotCandidates ?? [],
  }))

  let hotCandidates = useFindCandidates(hotCandidateIds?.map((id) => ({ id })))

  // Temp add hot candidates
  const doNotRender =
    board === "reporting" || board === "hot-candidates" || (board === "kanban" && !candidates?.length > 0 && !hotCandidates?.length > 0)

  if (doNotRender) return null

  const queriesFailed = hotCandidates?.some((hotCandidate) => !hotCandidate.isSuccess)

  hotCandidates = hotCandidates?.map((hotCandidate) => hotCandidate?.data?.data) ?? []

  return (
    <Container>
      <Title>Transition board</Title>
      <Droppable droppableId="transition" direction="horizontal">
        {(provided, snapshot) => (
          <Content snapshot={snapshot}>
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ minHeight: 65, height: "100%", display: "flex" }}
            >
              {hotCandidates?.length > 0 && !queriesFailed
                ? hotCandidates?.map(({ id, firstName, lastName }, index) => (
                    <Draggable draggableId={id} index={index} key={id}>
                      {(provided) => (
                        <HotCandidateCompany
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >{`${firstName} ${lastName}`}</HotCandidateCompany>
                      )}
                    </Draggable>
                  ))
                : candidates?.length > 0
                ? candidates.map((candidate, index) => (
                    <CandidateCard index={index} key={`${index}.${prop("id", candidate)}`} candidate={candidate} />
                  ))
                : null}
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
}

export default Transition
