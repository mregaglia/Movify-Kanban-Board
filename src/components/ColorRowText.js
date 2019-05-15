import styled from "styled-components";

export const ColorRowText = styled.div(({ color, theme }) => ({
  display: "inline-block",
  width: "100%",
  backgroundColor: `${color}50`,
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.medium,
  fontWeight: 600,
  padding: 12,
  textOverflow: "ellipsis",
  overflow: "hidden",
  paddingLeft: 16
}));

export default ColorRowText;
