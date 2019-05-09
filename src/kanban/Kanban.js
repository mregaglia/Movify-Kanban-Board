import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { path, pathOr, prop, propOr } from "ramda";
import { bool, func, object } from "prop-types";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import theme from "../style/theme";
import { getColumnData, isFromSameBoard } from "../utils/kanban";
import { getKanban, updateJobSubmission } from "./kanban.actions";
import Bm from "./Bm";
import ConfirmationModal from "./board/ConfirmationModal";

const Container = styled.div({
  paddingLeft: 25,
  paddingRight: 25,
  paddingTop: 25,
  paddingBottom: 25
});

export const Row = styled.div({
  display: "flex",
  flexDirection: "row"
});

export const Column = styled.div({
  display: "flex",
  flexDirection: "column",
  flex: 1
});

export const Text = styled.div(({ theme }) => ({
  display: "inline-block",
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.regular,
  padding: 12,
  textOverflow: "ellipsis",
  overflow: "hidden"
}));

const Title = styled(Text)(({ theme }) => ({
  fontSize: theme.textDimensions.bigTitle,
  marginBottom: 20
}));

const getBmColor = index => theme.bmColors[index % theme.bmColors.length];

const Kanban = ({ bms, getKanban, loading, updateJobSubmission }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(undefined);

  useEffect(() => {
    getKanban();
  }, []);

  const onDnd = result => {
    if (!prop("destination", result)) return;
    const jobSubmissionId = prop("draggableId", result);
    const src = getColumnData(path(["source", "droppableId"], result));
    const dest = getColumnData(path(["destination", "droppableId"], result));
    const srcStatus = prop("status", src);
    const destStatus = prop("status", dest);
    const jobOrderId = prop("jobOrderId", src);
    const destJobOrderId = prop("jobOrderId", dest);
    if (isFromSameBoard(src, dest) && src.status !== dest.status) {
      updateJobSubmission(jobOrderId, srcStatus, jobSubmissionId, destStatus);
    } else if (!isFromSameBoard(src, dest)) {
      setIsModalOpen(true);
      setModalData({
        jobOrderId: destJobOrderId,
        jobSubmissionId,
        status: destStatus
      });
    }
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading)
    return (
      <Container>
        <Title>Loading ...</Title>
      </Container>
    );

  return (
    <Container>
      <ConfirmationModal
        data={modalData}
        isOpen={isModalOpen}
        onClose={onCloseModal}
      />
      <DragDropContext onDragEnd={onDnd}>
        {Object.keys(bms).map((bmId, index) => (
          <Bm key={bmId} bm={propOr({}, bmId, bms)} color={getBmColor(index)} />
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
