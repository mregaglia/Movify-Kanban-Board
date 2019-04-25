import React from "react";
import { connect } from "react-redux";
import { pathOr, propOr } from "ramda";
import { number, object } from "prop-types";
import styled from "styled-components";
import { AVAILABLE_STATUSES, createColumnId } from "../../utils/kanban";
import Column from "./Column";

const Container = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  margin: 4,
  borderRadius: theme.dimensions.borderRadius,
  borderColor: theme.colors.lightGrey,
  borderStyle: "solid",
  borderWidth: 1,
  padding: 8
}));

const Board = ({ bmId, clientCorporationId, jobOrderId, jobSubmissions }) => (
  <Container>
    {AVAILABLE_STATUSES.map(status => (
      <Column
        key={status}
        status={status}
        jobSubmissions={propOr([], status, jobSubmissions)}
        columnId={createColumnId(bmId, clientCorporationId, jobOrderId, status)}
      />
    ))}
  </Container>
);

Board.propTypes = {
  bmId: number,
  clientCorporationId: number,
  jobOrderId: number,
  jobSubmissions: object
};

export default connect((state, { jobOrderId }) => ({
  jobSubmissions: pathOr(
    {},
    ["kanban", "jobOrders", jobOrderId, "jobSubmissions"],
    state
  )
}))(Board);
