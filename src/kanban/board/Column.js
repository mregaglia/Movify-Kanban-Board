import React from "react";
import { array, string } from "prop-types";
import { propOr } from "ramda";
import styled from "styled-components";
import CandidateCard from "./CandidateCard";

const Container = styled.div(({ theme }) => ({
  padding: 8,
  boarderRadius: theme.dimensions.borderRadius,
  borderColor: theme.colors.lightGrey,
  marginBottom: 8
}));

const Title = styled.div(({ theme }) => ({
  fontFamily: theme.fonts.fontFamily,
  fontSize: 16
}));

const Column = ({ jobSubmissions, status }) => {
  return (
    <Container>
      <Title>{status}</Title>
      {jobSubmissions.map(jobSubmission => (
        <CandidateCard
          key={jobSubmission.id}
          candidate={propOr({}, "candidate", jobSubmission)}
        />
      ))}
    </Container>
  );
};
Column.propTypes = {
  jobSubmissions: array,
  status: string
};
export default Column;
