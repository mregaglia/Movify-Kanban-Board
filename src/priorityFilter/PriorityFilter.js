import React from 'react'
import { connect } from 'react-redux'
import { func, object, string } from 'prop-types'
import { pathOr, prop } from 'ramda'
import styled from 'styled-components'

import Checkbox from '../components/Checkbox'

import { updatePriorityFilter } from './priorityFilter.actions'

const Row = styled.div({
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-end',
  flexDirection: 'row',
  paddingTop: 12,
  paddingBottom: 12,
  paddingRight: 40,
})

const Column = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

const Title = styled.div(({ theme }) => ({
  fontWeight: 600,
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.regular,
  paddingRight: 12,
}))

const PriorityFilter = ({ board, filter, updatePriorityFilter: updatePriorityFilterProp }) => {
  if (board !== 'kanban') return null

  return (
    <Row>
      <Title>Priorities</Title>
      <Column>
        {Object.keys(filter).map((key) => (
          <Checkbox
            key={key}
            checked={prop(key, filter)}
            label={key}
            onChange={(value) => updatePriorityFilterProp({ [key]: value })}
          />
        ))}
      </Column>
    </Row>
  )
}

PriorityFilter.propTypes = {
  board: string,
  filter: object,
  updatePriorityFilter: func,
}

export default connect(
  (state) => ({
    filter: pathOr({}, ['priorityFilter', 'filter'], state),
  }),
  { updatePriorityFilter }
)(PriorityFilter)
