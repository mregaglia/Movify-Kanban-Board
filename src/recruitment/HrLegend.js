import React from "react";
import { connect } from "react-redux";
import { pathOr, prop } from "ramda";
import styled from "styled-components";
import { array } from "prop-types";
import theme from "../style/theme";
import { formatBmName } from "../utils/kanban";

const Container = styled.div({
  paddingTop: 20,
  paddingBottom: 20
});

const HR = styled.div(({ color, theme }) => ({
  display: "inline-block",
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.regular,
  backgroundColor: color,
  color: theme.colors.darkWhite,
  borderRadius: 16,
  padding: 8,
  margin: 4
}));

export const getHrColor = index =>
  theme.hrColors[index % theme.hrColors.length];

const HrLegend = ({ hrs }) => (
  <Container>
    {hrs.map((hr, index) => (
      <HR color={getHrColor(index)} key={prop("id", hr)}>
        {formatBmName(hr)}
      </HR>
    ))}
  </Container>
);

HrLegend.propTypes = {
  hrs: array
};

export default connect(state => ({
  hrs: pathOr([], ["recruitment", "hrs"], state)
}))(HrLegend);
