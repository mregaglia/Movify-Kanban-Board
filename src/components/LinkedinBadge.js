import React from "react";
import { object } from "prop-types";
import styled from "styled-components";
import { getLinkedinUrl } from "../utils/linkedin";

const Badge = styled.div(({ theme }) => ({
  cursor: "pointer",
  backgroundColor: theme.colors.linkedin,
  height: 20,
  width: 20,
  borderTopRightRadius: theme.dimensions.borderRadius,
  borderBottomLeftRadius: theme.dimensions.borderRadius
}));

const Text = styled.div(({ theme }) => ({
  display: "inline-block",
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.small,
  fontWeight: 600,
  color: "white",
  padding: 4
}));

const LinkedinBadge = ({ candidate }) => (
  <Badge onClick={() => window.open(getLinkedinUrl(candidate), "_blank")}>
    <Text>in</Text>
  </Badge>
);

LinkedinBadge.propTypes = {
  candidate: object
};

export default LinkedinBadge;
