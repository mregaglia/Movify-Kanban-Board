import React, { useEffect } from "react";
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

const Kanban = ({ addModalData, isAddModalOpen, bms, duplicateModalData, isDuplicateModalOpen, getKanban, loading, onCloseModals }) => {

  useEffect(() => {
    if (!prop("length", bms)) getKanban();
  }, [bms, getKanban]);

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
        onClose={onCloseModals}
      />
      <AddModal
        data={addModalData}
        isOpen={isAddModalOpen}
        onClose={onCloseModals}
      />
    </div>
  );
};

Kanban.propTypes = {
  addModalData: object,
  isAddModalOpen: bool,
  bms: array,
  duplicateModalData: object,
  isDuplicateModalOpen: bool,
  getKanban: func,
  loading: bool,
  onCloseModals: func
};

export default connect(
  state => ({
    bms: pathOr([], ["kanban", "bmList"], state),
    loading: pathOr(true, ["kanban", "loading"], state)
  }),
  { getKanban }
)(Kanban);
