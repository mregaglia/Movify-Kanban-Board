import React from "react";
import { connect } from "react-redux";
import { pathOr, prop } from "ramda";
import styled from "styled-components";
import { array, string } from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import CandidateCard from "./CandidateCard";

const getBackgroundColor = (isNoGo, snapshot, theme) => {
  if (snapshot.isDraggingOver) return theme.colors.transparentRed;
  if (snapshot.draggingFromThisWith) return theme.colors.transparentGrey;
  return theme.colors.lightGrey;
};

const Container = styled.div(({ theme }) => ({
  padding: 8,
  marginTop: 4,
  marginBottom: 16,
  backgroundColor: theme.colors.lightGrey,
  borderRadius: theme.dimensions.borderRadius
}));

const Content = styled.div(({ isNoGo, snapshot, theme }) => ({
  padding: 8,
  backgroundColor: getBackgroundColor(isNoGo, snapshot, theme),
  borderRadius: theme.dimensions.borderRadius
}));

const Title = styled.div(({ theme }) => ({
  display: "inline-block",
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.medium,
  fontWeight: 600,
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 8,
  textOverflow: "ellipsis",
  overflow: "hidden"
}));

const Transition = ({ board, candidates }) => {
  if (board === "kanban" && !prop("length", candidates)) return null;

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
              {candidates.map((candidate, index) => (
                <CandidateCard
                  index={index}
                  key={`${index}.${prop("id", candidate)}`}
                  candidate={candidate}
                />
              ))}
              {provided.placeholder}
            </div>
          </Content>
        )}
      </Droppable>
    </Container>
  );
};

Transition.propTypes = {
  board: string,
  candidates: array
};

export default connect(state => ({
  candidates: pathOr([], ["transition", "candidates"], state)
}))(Transition);
