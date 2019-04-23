import React from "react";
import { propOr } from "ramda";
import { object } from "prop-types";
import styled from "styled-components";
import { AVAILABLE_STATUSES } from "../../utils/kanban";
import Column from "./Column";

const Container = styled.div({
  display: "flex",
  flexDirection: "row"
});

const Board = ({ jobSubmissions }) => {
  return (
    <Container>
      {AVAILABLE_STATUSES.map(status => (
        <Column
          key={status}
          status={status}
          jobSubmissions={propOr([], status, jobSubmissions)}
        />
      ))}
    </Container>
  );
};
Board.propTypes = {
  jobSubmissions: object
};
export default Board;
