import styled from "styled-components";

export const Action = styled.button(({ positive, theme }) => ({
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.medium,
  color: positive ? theme.colors.red : theme.colors.mediumGrey,
  cursor: "pointer",
  padding: 4,
  marginLeft: 16,
  borderStyle: "none",
  background: "none"
}));

export default Action;
