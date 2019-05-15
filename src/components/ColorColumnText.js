import styled from "styled-components";

export const ColorColumnText = styled.div(({ color, theme }) => ({
  display: "inline-block",
  width: "50px",
  backgroundColor: color,
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.medium,
  textAlign: "center",
  padding: 12,
  textOverflow: "ellipsis",
  overflow: "hidden",
  borderTopLeftRadius: 4,
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
  paddingLeft: 4
}));

export default ColorColumnText;
