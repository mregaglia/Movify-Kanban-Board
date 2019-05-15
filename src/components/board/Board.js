import React from "react";
import { propOr } from "ramda";
import { array, number, object, string } from "prop-types";
import styled from "styled-components";
import { createColumnId, getColumnWidth } from "../../utils/kanban";
import Column from "./Column";

const Container = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flex: 1,
  marginTop: 4,
  marginBottom: 4,
  backgroundColor: theme.colors.lightGrey,
  borderRadius: theme.dimensions.borderRadius,
  padding: 8
}));

const Board = ({
  bmId,
  board,
  clientCorporationId,
  jobOrderId,
  jobSubmissions,
  statuses
}) => (
  <Container>
    {statuses.map(status => (
      <Column
        board={board}
        key={status}
        status={status}
        columnWidth={getColumnWidth(propOr(1, "length", statuses))}
        jobSubmissions={propOr([], status, jobSubmissions)}
        columnId={createColumnId(bmId, clientCorporationId, jobOrderId, status)}
      />
    ))}
  </Container>
);

Board.propTypes = {
  bmId: number,
  board: string,
  clientCorporationId: number,
  jobOrderId: number,
  jobSubmissions: object,
  statuses: array
};

export default Board;
