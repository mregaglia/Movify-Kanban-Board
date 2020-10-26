import React from "react";
import { connect } from "react-redux";
import { pathOr, prop } from "ramda";
import { func, object, string } from "prop-types";
import styled from "styled-components";
import { updatePriorityFilter } from "./priorityFilter.actions";
import Checkbox from "../components/Checkbox";

const Row = styled.div({
  display: "flex",
  flex: 1,
  justifyContent: "flex-end",
  flexDirection: "row",
  paddingTop: 12,
  paddingBottom: 12,
  paddingRight: 24
});

const Column = styled.div({
  display: "flex",
  flexDirection: "column"
});

const Title = styled.div(({ theme }) => ({
  fontWeight: 600,
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.regular,
  paddingRight: 12
}));

const PriorityFilter = ({ board, filter, updatePriorityFilter }) => {
  if (board !== "kanban") return null;

  return (
    <Row>
      <Title>Priorities</Title>
      <Column>
        {Object.keys(filter).map(key => (
          <Checkbox
            key={key}
            checked={prop(key, filter)}
            label={key}
            onChange={value => updatePriorityFilter({ [key]: value })}
          />
        ))}
      </Column>
    </Row>
  );
};

PriorityFilter.propTypes = {
  board: string,
  filter: object,
  updatePriorityFilter: func
};

export default connect(
  state => ({
    filter: pathOr({}, ["priorityFilter", "filter"], state)
  }),
  { updatePriorityFilter }
)(PriorityFilter);
