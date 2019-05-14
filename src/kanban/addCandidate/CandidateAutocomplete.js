import React, { useEffect } from "react";
import { connect } from "react-redux";
import { pathOr, prop, propOr } from "ramda";
import { array, bool, func, object } from "prop-types";
import styled from "styled-components";
import { getCandidateName } from "../../utils/kanban";
import { getSuggestions } from "./addCandidate.actions";

const Container = styled.div(({ displayAuto }) => ({
  opacity: displayAuto ? 1 : 0,
  position: "absolute"
}));

const SuggestionsContainer = styled.div({
  backgroundColor: "white",
  border: "1px solid #999",
  borderTopWidth: 0,
  listStyle: "none",
  maxHeight: 130,
  overflowY: "auto"
});
const Suggestion = styled.div(({ theme }) => ({
  fontFamily: theme.fonts.fontFamily
}));

export const CandidateInput = ({
  autoInput,
  displayAuto,
  getSuggestions,
  onSelect,
  suggestions
}) => {
  useEffect(() => {
    getSuggestions();
  }, []);

  const onEnterText = event => getSuggestions(event.target.value);
  const onSelectSuggestion = suggestion => {
    getSuggestions();
    onSelect(suggestion);
  };

  return (
    <Container displayAuto={displayAuto}>
      <input ref={autoInput} onChange={onEnterText} />
      {!!prop("length", suggestions) && (
        <SuggestionsContainer>
          {suggestions.map((suggestion, index) => (
            <Suggestion
              key={propOr(index, "id", suggestion)}
              onClick={() => onSelectSuggestion(suggestion)}
            >
              {getCandidateName(suggestion)}
            </Suggestion>
          ))}
        </SuggestionsContainer>
      )}
    </Container>
  );
};

CandidateInput.propTypes = {
  autoInput: object,
  displayAuto: bool,
  getSuggestions: func,
  onSelect: func,
  suggestions: array
};

export default connect(
  state => ({
    suggestions: pathOr([], ["addCandidate", "suggestions"], state)
  }),
  { getSuggestions }
)(CandidateInput);
