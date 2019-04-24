import React from "react";
import { pathOr, prop } from "ramda";
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

const Board = ({ bmId, clientCorporationId, jobOrder }) => {
  return (
    <Container>
      {AVAILABLE_STATUSES.map(status => (
        <Column
          key={status}
          status={status}
          jobSubmissions={pathOr([], ["jobSubmissions", status], jobOrder)}
          columnId={createColumnId(
            bmId,
            clientCorporationId,
            prop("id", jobOrder),
            status
          )}
        />
      ))}
    </Container>
  );
};

Board.propTypes = {
  bmId: number,
  clientCorporationId: number,
  jobOrder: object
};

export default Board;
