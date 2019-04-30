import React from "react";
import { array, string } from "prop-types";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Candidates from "./Candidates";

const getBackgroundColor = (snapshot, theme) => {
  if (snapshot.isDraggingOver) return theme.colors.transparentRed;
  if (snapshot.draggingFromThisWith) return theme.colors.transparentGrey;
  return theme.colors.darkWhite;
};

const Container = styled.div({
  display: "flex",
  flexGrow: 1,
  width: "16.6%",
  minWidth: "16.6%",
  maxWidth: "16.6%"
});

const Content = styled.div(({ snapshot, theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "80%",
  flexGrow: 1,
  padding: 8,
  margin: 4,
  backgroundColor: getBackgroundColor(snapshot, theme),
  borderRadius: theme.dimensions.borderRadius
}));

const Title = styled.div(({ theme }) => ({
  fontFamily: theme.fonts.fontFamily,
  fontSize: 16,
  textAlign: "center",
  paddingTop: 4,
  paddingBottom: 8,
  textOverflow: "ellipsis",
  overflow: "hidden"
}));

const Column = ({ columnId, jobSubmissions, status }) => {
  return (
    <Container>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <Content snapshot={snapshot}>
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ minHeight: 150, height: "100%" }}
            >
              <Title>{status}</Title>
              <Candidates jobSubmissions={jobSubmissions} />
              {provided.placeholder}
            </div>
          </Content>
        )}
      </Droppable>
    </Container>
  );
};
Column.propTypes = {
  columnId: string,
  jobSubmissions: array,
  status: string
};
export default Column;
