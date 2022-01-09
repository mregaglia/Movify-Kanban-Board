import React from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'

const Badge = styled.div(({ priority, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.priorityColors[priority],
  height: theme.prioritySizes[priority],
  width: theme.prioritySizes[priority],
  borderRadius: theme.prioritySizes[priority] / 2,
  marginTop: 6,
  marginRight: 12,
}))

const Text = styled.div(({ priority, theme }) => ({
  display: 'inline-block',
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.prioritySizes[priority] * 0.45,
  fontWeight: 600,
  color: theme.colors.darkWhite,
  padding: 4,
}))

const PriorityBadge = ({ priority }) => (
  <Badge priority={priority}>
    <Text priority={priority}>{priority}</Text>
  </Badge>
)

PriorityBadge.propTypes = {
  priority: string,
}

export default PriorityBadge
