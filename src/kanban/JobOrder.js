import React from "react";
import { connect } from "react-redux";
import { pathOr, prop, propOr } from "ramda";
import { number, object } from "prop-types";
import styled from "styled-components";
import { Row, Text } from "./Kanban";
import Board from "./board/Board";

const Column = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "110px"
});

const JobOrder = ({ jobOrder }) => (
  <Row>
    <Column>
      <Text>{propOr("", "title", jobOrder)}</Text>
      <Text>
        {`${pathOr("", ["clientContact", "firstName"], jobOrder)} ${pathOr(
          "",
          ["clientContact", "lastName"],
          jobOrder
        )} `}
      </Text>
    </Column>
    <Board
      bmId={prop("bmId", jobOrder)}
      clientCorporationId={prop("clientCorporationId", jobOrder)}
      jobOrderId={prop("id", jobOrder)}
    />
  </Row>
);

JobOrder.propTypes = {
  joId: number,
  jobOrder: object
};

export default connect((state, { joId }) => ({
  jobOrder: pathOr({}, ["kanban", "jobOrders", joId], state)
}))(JobOrder);
