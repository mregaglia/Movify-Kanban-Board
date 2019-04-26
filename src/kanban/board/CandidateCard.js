import React from "react";
import { connect } from "react-redux";
import { pathOr } from "ramda";
import { number, object } from "prop-types";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div(({ theme }) => ({
  display: "inline-block",
  backgroundColor: theme.colors.grey,
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

const CandidateCard = ({ index, jobSubmissionId, jobSubmission }) => (
  <Draggable draggableId={jobSubmissionId} index={index}>
    {provided => (
      <Container
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <Text>
          {pathOr("", ["candidate", "firstName"], jobSubmission)}{" "}
          {pathOr("", ["candidate", "lastName"], jobSubmission)}
        </Text>
      </Container>
    )}
  </Draggable>
);

CandidateCard.propTypes = {
  candidate: object,
  index: number,
  jobSubmissionId: number,
  jobSubmission: object
};

export default connect((state, { jobSubmissionId }) => ({
  jobSubmission: pathOr(
    {},
    ["kanban", "jobSubmissions", jobSubmissionId],
    state
  )
}))(CandidateCard);
