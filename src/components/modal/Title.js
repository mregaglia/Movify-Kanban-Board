import styled from "styled-components";

export const Title = styled.div(({ theme }) => ({
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.large,
  textAlign: "justify",
  marginTop: 4,
  marginBottom: 16
}));

export default Title;
