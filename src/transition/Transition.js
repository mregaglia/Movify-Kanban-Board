import React from "react";
import { connect } from "react-redux";
import { pathOr, prop } from "ramda";
import styled from "styled-components";
import { array } from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import CandidateCard from "./CandidateCard";

const getBackgroundColor = (isNoGo, snapshot, theme) => {
  if (snapshot.isDraggingOver) return theme.colors.transparentRed;
  if (snapshot.draggingFromThisWith) return theme.colors.transparentGrey;
  return theme.colors.lightGrey;
};

const Content = styled.div(({ isNoGo, snapshot, theme }) => ({
  padding: 8,
  marginTop: 4,
  marginBottom: 16,
  backgroundColor: getBackgroundColor(isNoGo, snapshot, theme),
  borderRadius: theme.dimensions.borderRadius
}));

const Transition = ({ candidates }) => (
  <div>
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
          </div>
        </Content>
      )}
    </Droppable>
  </div>
);

Transition.propTypes = {
  candidates: array
};

export default connect(state => ({
  candidates: pathOr([], ["transition", "candidates"], state)
}))(Transition);
