import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import theme from '../style/theme'

import { Add } from './svgs'

const Button = styled.button`
  ${({ color }) => css`
    background-color: ${color};
    border: none;
    padding: 0;
    margin: 0;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.75rem;
    font-size: 0;
    &:hover {
      cursor: pointer;
    }
  `}
`

const AddButton = ({ backgroundColor, color = theme.colors.white, onClick, title, className }) => (
  <Button color={backgroundColor} onClick={onClick} title={title} className={className}>
    <Add color={color} />
  </Button>
)

AddButton.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

export default AddButton
