import React from "react";
import { array, string } from "prop-types";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import CandidateCard from "./CandidateCard";

const Container = styled.div({
  display: "flex",
  flexGrow: 1,
  width: "16.6%",
  minWidth: "16.6%",
  maxWidth: "16.6%"
});

const Content = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  padding: 8,
  margin: 4,
  backgroundColor: theme.colors.darkWhite,
  borderRadius: theme.dimensions.borderRadius
}));

const Title = styled.div(({ theme }) => ({
  fontFamily: theme.fonts.fontFamily,
  fontSize: 16,
  textAlign: "center",
  paddingTop: 4,
  paddingBottom: 8
}));

const Column = ({ columnId, jobSubmissions, status }) => {
  return (
    <Container>
      <Content>
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
      </Content>
    </Container>
  );
};
Column.propTypes = {
  columnId: string,
  jobSubmissions: array,
  status: string
};
export default Column;
