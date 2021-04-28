import styled, { css } from "styled-components";

export const ColorColumnText = styled.p`
  ${({ theme: { fonts, textDimensions }, color, title }) => css`
    display: inline-block;
    width: 50px;
    background-color: ${color};
    font-family: ${fonts.fontFamily};
    font-size: ${textDimensions.medium}px;
    text-align: center;
    padding: 12px;
    text-overflow: ellipsis;
    border-radius: 4px 0 4px 4px;
    padding-left: 4px;
    margin: 0;
    ${title && css`
      writing-mode: vertical-rl;
      text-orientation: upright;
      text-transform: uppercase;
      text-align: left;
    `}
  `}
`

export default ColorColumnText;
