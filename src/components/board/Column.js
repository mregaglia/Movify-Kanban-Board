import React from "react";
import { array, string } from "prop-types";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { STATUS_NO_GO } from "../../utils/kanban";
import Candidates from "./Candidates";

const getBackgroundColor = (isNoGo, snapshot, theme) => {
  if (snapshot.isDraggingOver) return theme.colors.transparentRed;
  if (snapshot.draggingFromThisWith) return theme.colors.transparentGrey;
  if (isNoGo) return theme.colors.lightGrey;
  return theme.colors.darkWhite;
};

const Container = styled.div(({ columnWidth }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  width: columnWidth,
  minWidth: columnWidth,
  maxWidth: columnWidth
}));

const Content = styled.div(({ isNoGo, snapshot, theme }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  padding: 8,
  margin: 4,
  backgroundColor: getBackgroundColor(isNoGo, snapshot, theme),
  borderRadius: theme.dimensions.borderRadius
}));

const Title = styled.div(({ theme }) => ({
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.medium,
  textAlign: "center",
  paddingTop: 4,
  paddingBottom: 4,
  textOverflow: "ellipsis",
  overflow: "hidden"
}));

const Column = ({ board, columnId, columnWidth, jobSubmissions, status }) => {
  return (
    <Container columnWidth={columnWidth}>
      <Title>{status}</Title>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <Content snapshot={snapshot} isNoGo={status === STATUS_NO_GO}>
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ minHeight: 65, height: "100%" }}
            >
              <Candidates board={board} jobSubmissions={jobSubmissions} />
              {provided.placeholder}
            </div>
          </Content>
        )}
      </Droppable>
    </Container>
  );
};
Column.propTypes = {
  board: string,
  columnId: string,
  columnWidth: string,
  jobSubmissions: array,
  status: string
};
export default Column;