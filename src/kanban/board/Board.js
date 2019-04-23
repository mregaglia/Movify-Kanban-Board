import React from "react";
import { propOr } from "ramda";
import { object } from "prop-types";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { AVAILABLE_STATUSES } from "../../utils/kanban";
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

const Board = ({ jobSubmissions }) => {
  return (
    <Container>
      <DragDropContext onDragEnd={() => null}>
        {AVAILABLE_STATUSES.map(status => (
          <Column
            key={status}
            status={status}
            jobSubmissions={propOr([], status, jobSubmissions)}
          />
        ))}
      </DragDropContext>
    </Container>
  );
};
Board.propTypes = {
  jobSubmissions: object
};
export default Board;
