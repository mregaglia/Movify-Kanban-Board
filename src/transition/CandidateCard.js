import React from "react";
import { connect } from "react-redux";
import { prop, propOr } from "ramda";
import { func, number, object } from "prop-types";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import LinkedinBadge from "../components/LinkedinBadge";
import { removeCandidate } from "./transition.actions";

const Container = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  width: "10%",
  borderRadius: theme.dimensions.borderRadius,
  backgroundColor: theme.colors.grey,
  margin: 5,
  textOverflow: "ellipsis",
  overflow: "hidden",
  textAlign: "center"
}));

const Text = styled.div(({ theme }) => ({
  display: "flex",
  flex: 1,
  alignSelf: "center",
  marginTop: 10,
  marginBottom: 10,
  marginLeft: 15,
  marginRight: 4,
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.regular,
  textOverflow: "ellipsis",
  overflow: "hidden"
}));

const Column = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between"
});

const Delete = styled.div(({ theme }) => ({
  cursor: "pointer",
  color: theme.colors.darkWhite,
  height: 14,
  width: 14,
  marginTop: 4,
  marginBottom: 4
}));

const CandidateCard = ({ candidate, index, removeCandidate }) => (
  <Draggable draggableId={prop("id", candidate)} index={index}>
    {provided => (
      <Container
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <Text>
          {propOr("", "firstName", candidate)}{" "}
          {propOr("", "lastName", candidate)}
        </Text>
        <Column>
          <LinkedinBadge candidate={candidate} />
          <Delete onClick={() => removeCandidate(candidate)}>X</Delete>
        </Column>
      </Container>
    )}
  </Draggable>
);

CandidateCard.propTypes = {
  candidate: object,
  index: number,
  removeCandidate: func
};

export default connect(
  null,
  { removeCandidate }
)(CandidateCard);
