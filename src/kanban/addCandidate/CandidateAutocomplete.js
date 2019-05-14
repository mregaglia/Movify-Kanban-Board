import React from "react";
import { connect } from "react-redux";
import { pathOr, propOr } from "ramda";
import { array, bool, func, object } from "prop-types";
import styled from "styled-components";
import { getCandidateName } from "../../utils/kanban";
import { getSuggestions } from "./addCandidate.actions";

const Container = styled.div(({ displayAuto }) => ({
  opacity: displayAuto ? 1 : 0,
  position: "absolute"
}));

export const CandidateInput = ({
  autoInput,
  displayAuto,
  getSuggestions,
  onSelect,
  suggestions
}) => {
  const onEnterText = event => getSuggestions(event.target.value);

  return (
    <Container displayAuto={displayAuto}>
      <input ref={autoInput} onChange={onEnterText} />
      <div>
        {suggestions.map((suggestion, index) => (
          <div
            key={propOr(index, "id", suggestion)}
            onClick={() => onSelect(suggestion)}
          >
            {getCandidateName(suggestion)}
          </div>
        ))}
      </div>
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
