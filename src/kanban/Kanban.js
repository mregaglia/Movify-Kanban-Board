import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { pathOr, prop } from "ramda";
import { array, bool, func, object } from "prop-types";
import theme from "../style/theme";
import { Title } from "../components";
import { getKanban } from "./kanban.actions";
import Bm from "./Bm";
import DuplicateModal from "./DuplicateModal";
import AddModal from "./AddModal";

const getBmColor = index => theme.bmColors[index % theme.bmColors.length];

const Kanban = ({ addModalData, addModalOpen, bms, duplicateModalData, duplicateModalOpen, getKanban, loading }) => {
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    if (!prop("length", bms)) getKanban();
  }, [bms, getKanban]);

  useEffect(() => {
    setIsAddModalOpen(addModalOpen);
  }, [addModalOpen]);

  useEffect(() => {
    setIsDuplicateModalOpen(duplicateModalOpen);
  }, [duplicateModalOpen]);

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
      {bms.map((bmId, index) => (
        <Bm key={bmId} bmId={bmId} color={getBmColor(index)} />
      ))}
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
  addModalData: object,
  addModalOpen: bool,
  bms: array,
  duplicateModalData: object,
  duplicateModalOpen: bool,
  getKanban: func,
  loading: bool
};

export default connect(
  state => ({
    bms: pathOr([], ["departmentFilter", "kanbanBms"], state),
    loading: pathOr(true, ["kanban", "loading"], state)
  }),
  { getKanban }
)(Kanban);
