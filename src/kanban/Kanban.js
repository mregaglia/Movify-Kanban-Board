import React, { useEffect } from "react";
import { connect } from "react-redux";
import { path, pathOr, prop, propOr } from "ramda";
import { bool, func, object } from "prop-types";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { getColumnData, isFromSameBoard } from "../utils/kanban";
import { getKanban, updateJobSubmission } from "./kanban.actions";
import Bm from "./Bm";

const Container = styled.div({
  paddingLeft: 30,
  paddingRight: 30,
  paddingTop: 20,
  paddingBottom: 20
});

export const Row = styled.div({
  display: "flex",
  flexDirection: "row"
});

export const Text = styled.div(({ theme }) => ({
  display: "inline-block",
  fontFamily: theme.fonts.fontFamily,
  fontSize: 14,
  padding: 4
}));

const Title = styled(Text)({
  fontSize: 32,
  marginBottom: 20
});

const Kanban = ({ bms, getKanban, loading, updateJobSubmission }) => {
  useEffect(() => {
    getKanban();
  }, []);

  const onDnd = result => {
    if (!prop("destination", result)) return;
    const jobSubmissionId = prop("draggableId", result);
    const src = getColumnData(path(["source", "droppableId"], result));
    const dest = getColumnData(path(["destination", "droppableId"], result));
    if (isFromSameBoard(src, dest) && src.status !== dest.status) {
      const srcStatus = prop("status", src);
      const destStatus = prop("status", dest);
      const jobOrderId = prop("jobOrderId", src);
      updateJobSubmission(jobOrderId, srcStatus, jobSubmissionId, destStatus);
    }
  };

  if (loading)
    return (
      <Container>
        <Title>Loading ...</Title>
      </Container>
    );

  return (
    <Container>
      <Title>Kanban Board</Title>
      <DragDropContext onDragEnd={onDnd}>
        {Object.keys(bms).map(bmId => (
          <Bm key={bmId} bm={propOr({}, bmId, bms)} />
        ))}
      </DragDropContext>
    </Container>
  );
};

Kanban.propTypes = {
  bms: object,
  getKanban: func,
  loading: bool,
  updateJobSubmission: func
};

export default connect(
  state => ({
    bms: pathOr({}, ["kanban", "bms"], state),
    loading: pathOr([], ["kanban", "loading"], state)
  }),
  { getKanban, updateJobSubmission }
)(Kanban);
