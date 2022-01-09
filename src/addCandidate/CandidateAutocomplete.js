import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { array, bool, func, object } from 'prop-types'
import { pathOr, prop, propOr } from 'ramda'
import styled from 'styled-components'

import debounce from '../utils/debounce'
import { getCandidateName } from '../utils/kanban'

import { getSuggestions } from './addCandidate.actions'
import { Input } from './CandidateInput'

const Container = styled.div(({ displayAuto }) => ({
  opacity: displayAuto ? 1 : 0,
  position: 'absolute',
}))

const SuggestionsContainer = styled.div(({ theme }) => ({
  width: '200px + 1rem',
  backgroundColor: theme.colors.darkWhite,
  borderColor: theme.colors.mediumGrey,
  borderWidth: 1,
  borderStyle: 'solid',
  borderTopWidth: 0,
  maxHeight: 130,
  overflowY: 'auto',
}))
const Suggestion = styled.div(({ theme }) => ({
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.regular,
  paddingLeft: 8,
  paddingRight: 8,
  paddingTop: 10,
  paddingBottom: 10,
  borderBottomStyle: 'solid',
  borderBottomColor: theme.colors.grey,
  borderBottomWidth: 1,
}))

export const CandidateInput = ({
  autoInput,
  displayAuto,
  getSuggestions: getSuggestionsProp,
  onSelect,
  suggestions,
}) => {
  useEffect(() => {
    getSuggestionsProp()
  }, [getSuggestionsProp])

  const getSuggestionsDebounced = debounce(getSuggestionsProp, 350)

  const onEnterText = (event) => getSuggestionsDebounced(event.target.value)
  const onSelectSuggestion = (suggestion) => {
    getSuggestionsProp()
    onSelect(suggestion)
  }

  return (
    <Container displayAuto={displayAuto}>
      <Input ref={autoInput} onChange={onEnterText} />
      {!!prop('length', suggestions) && (
        <SuggestionsContainer>
          {suggestions.map((suggestion, index) => (
            <Suggestion key={propOr(index, 'id', suggestion)} onClick={() => onSelectSuggestion(suggestion)}>
              {getCandidateName(suggestion)}
            </Suggestion>
          ))}
        </SuggestionsContainer>
      )}
    </Container>
  )
}

CandidateInput.propTypes = {
  autoInput: object,
  displayAuto: bool,
  getSuggestions: func,
  onSelect: func,
  suggestions: array,
}

export default connect(
  (state) => ({
    suggestions: pathOr([], ['addCandidate', 'suggestions'], state),
  }),
  { getSuggestions }
)(CandidateInput)
