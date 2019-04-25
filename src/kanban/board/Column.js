import React from "react";
import { array, string } from "prop-types";
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

const Column = ({ columnId, jobSubmissions, status }) => {
  return (
    <Container>
      <Title>{status}</Title>
      <Droppable droppableId={columnId}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ minHeight: 150, height: "100%" }}
          >
            {jobSubmissions.map((jobSubmissionId, index) => (
              <CandidateCard
                key={jobSubmissionId}
                jobSubmissionId={jobSubmissionId}
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
  columnId: string,
  jobSubmissions: array,
  status: string
};
export default Column;
