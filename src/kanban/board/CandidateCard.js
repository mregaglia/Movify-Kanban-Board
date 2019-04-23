import React from "react";
import { prop } from "ramda";
import { number, object } from "prop-types";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div(({ theme }) => ({
  display: "inline-block",
  backgroundColor: theme.colors.lightGrey,
  borderRadius: theme.dimensions.borderRadius,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 15,
  paddingRight: 15,
  margin: 5
}));

const Text = styled.div(({ theme }) => ({
  display: "inline-block",
  fontFamily: theme.fonts.fontFamily,
  fontSize: 14
}));

const CandidateCard = ({ candidate, index }) => (
  <Draggable draggableId={candidate.id} index={index}>
    {provided => (
      <Container
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <Text>
          {prop("firstName", candidate)} {prop("lastName", candidate)}
        </Text>
      </Container>
    )}
  </Draggable>
);

CandidateCard.propTypes = {
  candidate: object,
  index: number
};

export default CandidateCard;
