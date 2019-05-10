import React from "react";
import { string } from "prop-types";
import styled from "styled-components";

const Badge = styled.div(({ priority, theme }) => ({
  backgroundColor: theme.priorityColors[priority],
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
  <Badge priority={priority}>
    <Text>{priority}</Text>
  </Badge>
);

PriorityBadge.propTypes = {
  priority: string
};

export default PriorityBadge;
