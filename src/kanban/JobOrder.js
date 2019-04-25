import React from "react";
import { connect } from "react-redux";
import { pathOr, propOr } from "ramda";
import { number, object } from "prop-types";
import styled from "styled-components";
import { Row, Text } from "./Kanban";

const Column = styled.div({
  display: "flex",
  flexDirection: "column"
});

const JobOrder = ({ jobOrder }) => (
  <Row>
    <Column>
      <Text>{propOr("", "title", jobOrder)}</Text>
      <br />
      <Text>
        {`${pathOr("", ["clientContact", "firstName"], jobOrder)} ${pathOr(
          "",
          ["clientContact", "lastName"],
          jobOrder
        )} `}
      </Text>
    </Column>
    <Text>process here</Text>
  </Row>
);

JobOrder.propTypes = {
  joId: number,
  jobOrder: object
};

export default connect((state, { joId }) => ({
  jobOrder: pathOr({}, ["kanban", "jobOrders", joId], state)
}))(JobOrder);
