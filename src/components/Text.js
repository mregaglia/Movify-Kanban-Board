import styled from "styled-components";

export const Text = styled.div(({ theme }) => ({
  display: "inline-block",
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.regular,
  padding: 12,
  textOverflow: "ellipsis",
  overflow: "hidden"
}));

export default Text;
