import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { path, pathOr, prop } from "ramda";
import { array, bool, func } from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import theme from "../style/theme";
import { getColumnData, isFromSameBoard } from "../utils/kanban";
import { getRecruitment, updateJobSubmissionStatus } from "./recruitment.actions";
import { Title } from "../components";
import ClientCorporation from "./ClientCorporation";
import HrLegend from "./HrLegend";
import UpdateModal from "./UpdateModal";

const getPipeColor = index => theme.pipeColors[index % theme.pipeColors.length];

const Recruitment = ({
  clientList,
  getRecruitment,
  loading,
  updateJobSubmissionStatus
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(undefined);

  useEffect(() => {
    if (!prop("length", clientList)) getRecruitment();
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
      updateJobSubmissionStatus(jobOrderId, srcStatus, jobSubmissionId, destStatus);
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
      <HrLegend />
      <DragDropContext onDragEnd={onDnd}>
        {clientList.map((client, index) => (
          <ClientCorporation
            key={client}
            clientId={client}
            color={getPipeColor(index)}
          />
        ))}
      </DragDropContext>
      <UpdateModal
        data={modalData}
        isOpen={isModalOpen}
        onClose={onCloseModal}
      />
    </div>
  );
};

Recruitment.propTypes = {
  clientList: array,
  getRecruitment: func,
  loading: bool,
  updateJobSubmissionStatus: func
};

export default connect(
  state => ({
    clientList: pathOr([], ["recruitment", "clientList"], state),
    loading: pathOr(true, ["recruitment", "loading"], state)
  }),
  { getRecruitment, updateJobSubmissionStatus }
)(Recruitment);
