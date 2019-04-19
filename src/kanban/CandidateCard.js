import React from "react";
import { prop } from "ramda";
import { object } from "prop-types";
import styled from "styled-components";

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

const CandidateCard = ({ candidate }) => (
  <Container>
    <Text>
      {prop("firstName", candidate)} {prop("lastName", candidate)}
    </Text>
  </Container>
);

CandidateCard.propTypes = {
  candidate: object
};

export default CandidateCard;
