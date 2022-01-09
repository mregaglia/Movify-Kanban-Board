import React from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'

const StyledLabel = styled.div(({ theme }) => ({
  color: theme.colors.red,
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.regular,
  marginRight: 8,
  minWidth: 80,
  maxWidth: 80,
  width: 80,
}))

export const Label = ({ label }) => <StyledLabel>{label}</StyledLabel>

Label.propTypes = {
  label: string,
}

export default Label
