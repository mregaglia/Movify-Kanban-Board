import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { path, pathOr, prop } from "ramda";
import { array, bool, func } from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import theme from "../style/theme";
import { getColumnData, isFromSameBoard } from "../utils/kanban";
import { Title } from "../components";
import { getKanban, updateJobSubmission } from "./kanban.actions";
import Bm from "./Bm";
import DuplicateModal from "./DuplicateModal";
import AddModal from "./AddModal";
import Transition from "../transition/Transition";

const getBmColor = index => theme.bmColors[index % theme.bmColors.length];

const Kanban = ({ bms, getKanban, loading, updateJobSubmission }) => {
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const [duplicateModalData, setDuplicateModalData] = useState(undefined);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addModalData, setAddModalData] = useState(undefined);

  useEffect(() => {
    if (!prop("length", bms)) getKanban();
  }, [bms, getKanban]);

  const onDnd = result => {
    if (!prop("destination", result)) return;
    const jobSubmissionId = prop("draggableId", result);
    const src = getColumnData(path(["source", "droppableId"], result));
    const dest = getColumnData(path(["destination", "droppableId"], result));
    const srcStatus = prop("status", src);
    const destStatus = prop("status", dest);
    const jobOrderId = prop("jobOrderId", src);
    const destJobOrderId = prop("jobOrderId", dest);

    if (path(["destination", "droppableId"], result) === "transition") {
      return;
    } else if (path(["source", "droppableId"], result) === "transition") {
      setIsAddModalOpen(true);
      setAddModalData({
        jobOrderId: destJobOrderId,
        candidateId: jobSubmissionId,
        status: destStatus
      });
    } else if (isFromSameBoard(src, dest) && src.status !== dest.status) {
      updateJobSubmission(jobOrderId, srcStatus, jobSubmissionId, destStatus);
    } else if (!isFromSameBoard(src, dest)) {
      setIsDuplicateModalOpen(true);
      setDuplicateModalData({
        jobOrderId: destJobOrderId,
        jobSubmissionId,
        status: destStatus
      });
    }
  };

  const onCloseModal = () => {
    setIsDuplicateModalOpen(false);
    setIsAddModalOpen(false);
  };

  if (loading)
    return (
      <div>
        <Title>Loading ...</Title>
      </div>
    );

  return (
    <div>
      <DragDropContext onDragEnd={onDnd}>
        <Transition board="kanban" />
        {bms.map((bmId, index) => (
          <Bm key={bmId} bmId={bmId} color={getBmColor(index)} />
        ))}
      </DragDropContext>
      <DuplicateModal
        data={duplicateModalData}
        isOpen={isDuplicateModalOpen}
        onClose={onCloseModal}
      />
      <AddModal
        data={addModalData}
        isOpen={isAddModalOpen}
        onClose={onCloseModal}
      />
    </div>
  );
};

Kanban.propTypes = {
  bms: array,
  getKanban: func,
  loading: bool,
  updateJobSubmission: func
};

export default connect(
  state => ({
    bms: pathOr([], ["departmentFilter", "kanbanBms"], state),
    loading: pathOr(true, ["kanban", "loading"], state)
  }),
  { getKanban, updateJobSubmission }
)(Kanban);
