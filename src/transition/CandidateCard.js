import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { func, number, object } from 'prop-types'
import { path, prop, propOr } from 'ramda'
import styled from 'styled-components'

import Function from '../components/board/Function'
import BullhornBadge from '../components/BullhornBadge'
import LinkedinBadge from '../components/LinkedinBadge'
import { Clear } from '../components/svgs'
import { isFreelance } from '../utils/kanban'

import { removeCandidate } from './transition.actions'

const Container = styled.div(({ borderColor, theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '10%',
  borderRadius: theme.dimensions.borderRadius,
  borderBottomColor: path(['colors', borderColor], theme),
  borderBottomWidth: borderColor ? 4 : 0,
  borderBottomStyle: borderColor ? 'solid' : 'none',
  backgroundColor: theme.colors.grey,
  margin: 5,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  textAlign: 'center',
}))

const Text = styled.div(({ theme }) => ({
  display: 'flex',
  flex: 1,
  alignSelf: 'center',
  marginTop: 10,
  marginBottom: 10,
  marginLeft: 15,
  marginRight: 4,
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.regular,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
}))

const Column = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const TextColumn = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
})

const Delete = styled.div(({ theme }) => ({
  cursor: 'pointer',
  color: theme.colors.darkWhite,
  height: 14,
  width: 14,
  marginTop: 4,
  marginBottom: 4,
}))

const CandidateCard = ({ candidate, index, removeCandidate: removeCandidateProp }) => (
  <Draggable draggableId={prop('id', candidate)} index={index}>
    {(provided) => (
      <Container
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        borderColor={isFreelance(candidate) ? 'darkGrey' : undefined}
      >
        <Column>
          <BullhornBadge candidate={candidate} />
        </Column>
        <TextColumn>
          <Text>
            {propOr('', 'firstName', candidate)} {propOr('', 'lastName', candidate)}
          </Text>
          <Function functionTitle={path(['category', 'name'], candidate)} />
        </TextColumn>
        <Column>
          <LinkedinBadge candidate={candidate} />
          <Delete onClick={() => removeCandidateProp(candidate)}>
            <Clear size={14} />
          </Delete>
        </Column>
      </Container>
    )}
  </Draggable>
)

CandidateCard.propTypes = {
  candidate: object,
  index: number,
  removeCandidate: func,
}

export default connect(null, { removeCandidate })(CandidateCard)
