import React from "react";
import { string } from "prop-types";
import styled from "styled-components";

const getColorFromPriority = priority => {
  switch (priority) {
    case "P1":
      return "red";
    case "P2":
      return "orange";
    case "P3":
      return "yellow";
    case "P4":
      return "green";
    default:
      return;
  }
};

const Badge = styled.div(({ color, theme }) => ({
  backgroundColor: theme.colors[color],
  height: 20,
  width: 20,
  borderRadius: 10,
  marginTop: 6,
  marginRight: 12
}));

const Text = styled.div(({ theme }) => ({
  display: "inline-block",
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.small,
  fontWeight: 600,
  color: theme.colors.darkWhite,
  padding: 4
}));

const PriorityBadge = ({ priority }) => (
  <Badge color={getColorFromPriority(priority)}>
    <Text>{priority}</Text>
  </Badge>
);

PriorityBadge.propTypes = {
  priority: string
};

export default PriorityBadge;
