import React from "react";
import { number, object } from "prop-types";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from { 
    transform: rotate(0deg); 
  }

  to { 
    transform: rotate(360deg); 
  }
`;

const Spinner = styled.div`
  display: inline-block;
  border: ${props => `3px solid ${props.theme.colors.darkWhite}`};
  border-top: ${props => `3px solid ${props.theme.colors.red}`};
  border-radius: 50%;
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  animation: ${spin} 2s linear infinite;
`;

const Loader = ({ size, style }) => <Spinner size={size} style={style} />;

Loader.propTypes = {
  size: number,
  style: object
};

Loader.defaultProps = {
  size: 20
};

export default Loader;
