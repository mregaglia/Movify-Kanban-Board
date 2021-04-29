import React from "react"
import { array, string } from "prop-types"
import styled, { css } from "styled-components"
import { Droppable } from "react-beautiful-dnd"
import { STATUS_IDENTIFIED, STATUS_NO_GO } from "../../utils/kanban"
import Candidates from "./Candidates"
import { statusLabels } from "../../utils/statusLabels"
import { useLocation } from "react-router"
import AddButton from "../AddButton"

const getBackgroundColor = (isNoGo, snapshot, theme) => {
  if (snapshot?.isDraggingOver) return theme.colors.transparentRed
  if (snapshot?.draggingFromThisWith) return theme.colors.transparentGrey
  if (isNoGo) return theme.colors.lightGrey
  return theme.colors.darkWhite
}

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 0.25rem;
`

const Content = styled.div(({ isNoGo, snapshot, theme }) => ({
  display: "flex",
  flexDirection: "column",
  maxHeight: 250,
  overflowY: "auto",
  flexGrow: 1,
  padding: 8,
  backgroundColor: getBackgroundColor(isNoGo, snapshot, theme),
  borderRadius: theme.dimensions.borderRadius,
}))

const Title = styled.div(({ theme }) => ({
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.medium,
  textAlign: "center",
  paddingTop: 4,
  paddingBottom: 4,
  textOverflow: "ellipsis",
  overflow: "hidden",
}))

const ContentContainer = styled.div`
  position: relative;
`

const StyledAddButton = styled(AddButton)`
  ${({ theme: { dimensions, colors } }) => css`
    position: absolute;
    right: 0;
    top: 0;
    background-color: ${colors.mediumGrey};
    border-top-right-radius: ${dimensions.borderRadius}px;
    border-top-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  `}
`

const getStatusLabel = (status) => statusLabels.get(status) ?? status

const Column = ({ board, columnId, jobSubmissions, status, statusData }) => {
  const { pathname } = useLocation()

  return (
    <Container>
      <Title>{getStatusLabel(status)}</Title>
      <ContentContainer>
        <Droppable droppableId={columnId}>
          {(provided, snapshot) => (
            <Content snapshot={snapshot} isNoGo={status === STATUS_NO_GO}>
              <div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: 65, height: "100%" }}>
                {pathname === "/hot-candidates" ? "" : <Candidates board={board} jobSubmissions={jobSubmissions} />}
                {provided.placeholder}
              </div>
            </Content>
          )}
        </Droppable>
        {status === STATUS_IDENTIFIED ? <StyledAddButton title="Add company" /> : null}
      </ContentContainer>
    </Container>
  )
}
Column.propTypes = {
  board: string,
  columnId: string,
  jobSubmissions: array,
  status: string,
  statusData: array,
}
export default Column
