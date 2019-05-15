import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { path, pathOr, prop } from "ramda";
import { array, bool, func } from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import theme from "../style/theme";
import { getColumnData, isFromSameBoard } from "../utils/kanban";
import { Title } from "../components";
import {
  createJobSubmission,
  getKanban,
  updateJobSubmission
} from "./kanban.actions";
import Bm from "./Bm";
import DuplicateModal from "./DuplicateModal";
import DepartmentFilter from "./departmentFilter/DepartmentFilter";

const getBmColor = index => theme.bmColors[index % theme.bmColors.length];

const Kanban = ({ bms, getKanban, loading, updateJobSubmission }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(undefined);

  useEffect(() => {
    if (!prop("length", bms)) getKanban();
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
      <div>
        <Title>Loading ...</Title>
      </div>
    );

  return (
    <div>
      <DepartmentFilter />
      <DragDropContext onDragEnd={onDnd}>
        {bms.map((bmId, index) => (
          <Bm key={bmId} bmId={bmId} color={getBmColor(index)} />
        ))}
      </DragDropContext>
      <DuplicateModal
        data={modalData}
        isOpen={isModalOpen}
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
    bms: pathOr([], ["departmentFilter", "filteredBms"], state),
    loading: pathOr(true, ["kanban", "loading"], state)
  }),
  { createJobSubmission, getKanban, updateJobSubmission }
)(Kanban);
