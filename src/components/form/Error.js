import React from "react";
import { string } from "prop-types";
import styled from "styled-components";

const StyledError = styled.div(({ theme }) => ({
  color: theme.colors.red,
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.small,
  marginTop: 6
}));

export const Error = ({ error }) => <StyledError>{error}</StyledError>;

Error.propTypes = {
  error: string
};

export default Error;
