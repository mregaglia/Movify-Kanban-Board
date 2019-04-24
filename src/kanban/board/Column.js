import React from "react";
import { array, number, string } from "prop-types";
import { propOr } from "ramda";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import CandidateCard from "./CandidateCard";

const Container = styled.div(({ theme }) => ({
  padding: 8,
  margin: 4,
  width: "20%",
  minWidth: "20%",
  maxWidth: "20%",
  borderRadius: theme.dimensions.borderRadius,
  borderColor: theme.colors.lightGrey,
  borderStyle: "solid",
  borderWidth: 1
}));

const Title = styled.div(({ theme }) => ({
  fontFamily: theme.fonts.fontFamily,
  fontSize: 16
}));

const Column = ({ jobOrderId, jobSubmissions, status }) => {
  return (
    <Container>
      <Title>{status}</Title>
      <Droppable droppableId={`${jobOrderId}.${status}`}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ minHeight: 150, height: "100%" }}
          >
            {jobSubmissions.map((jobSubmission, index) => (
              <CandidateCard
                key={jobSubmission.id}
                candidate={propOr({}, "candidate", jobSubmission)}
                index={index}
              />
            ))}
          </div>
        )}
      </Droppable>
    </Container>
  );
};
Column.propTypes = {
  jobOrderId: number,
  jobSubmissions: array,
  status: string
};
export default Column;
