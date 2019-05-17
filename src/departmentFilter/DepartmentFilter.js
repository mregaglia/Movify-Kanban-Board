import React from "react";
import { connect } from "react-redux";
import { pathOr, prop } from "ramda";
import { func, object } from "prop-types";
import styled from "styled-components";
import { updateDepartmentFilter } from "./departmentFilter.actions";
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

const DepartmentFilter = ({ filter, updateDepartmentFilter }) => (
  <Row>
    <Title>Departments</Title>
    <Column>
      {Object.keys(filter).map(key => (
        <Checkbox
          key={key}
          checked={prop(key, filter)}
          label={key}
          onChange={value => updateDepartmentFilter({ [key]: value })}
        />
      ))}
    </Column>
  </Row>
);

DepartmentFilter.propTypes = {
  filter: object,
  updateDepartmentFilter: func
};

export default connect(
  state => ({
    filter: pathOr({}, ["departmentFilter", "filter"], state)
  }),
  { updateDepartmentFilter }
)(DepartmentFilter);
