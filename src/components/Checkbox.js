import React from 'react'
import { bool, func, string } from 'prop-types'
import styled from 'styled-components'

const Container = styled.label({
  display: 'flex',
  flexDirection: 'row',
})

const Label = styled.span(({ theme }) => ({
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.regular,
  paddingLeft: 4,
  paddingTop: 1,
}))

const Checkbox = ({ checked, label, onChange }) => (
  <Container>
    <input type="checkbox" checked={checked} onChange={() => onChange(!checked)} />
    <Label>{label}</Label>
  </Container>
)

Checkbox.propTypes = {
  checked: bool,
  label: string,
  onChange: func,
}

Checkbox.defaultProps = { onChange: () => null }

export default Checkbox
