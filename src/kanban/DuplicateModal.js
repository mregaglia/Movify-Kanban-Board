import React from "react";
import { connect } from "react-redux";
import { pathOr, prop, propOr } from "ramda";
import { bool, func, object } from "prop-types";
import ConfirmationModal from "../components/ConfirmationModal";
import { createJobSubmission } from "./kanban.actions";

const DuplicateModal = ({
  createJobSubmission,
  data,
  isOpen,
  jobOrder,
  jobSubmission,
  onClose
}) => {
  const onConfirm = () => {
    createJobSubmission(jobOrder, jobSubmission, prop(["status"], data));
    onClose();
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={`Candidate ${pathOr(
        "",
        ["candidate", "firstName"],
        jobSubmission
      )} ${pathOr("", ["candidate", "lastName"], jobSubmission)}`}
      text={`Do you want to duplicate this candidate for the vacancy ${propOr(
        "",
        "title",
        jobOrder
      )} from ${pathOr("", ["clientCorporation", "name"], jobOrder)} ?`}
    />
  );
};

DuplicateModal.propTypes = {
  createJobSubmission: func,
  isOpen: bool,
  jobOrder: object,
  jobSubmission: object,
  data: object,
  onClose: func
};

DuplicateModal.defaultProps = {
  isOpen: false,
  onClose: () => null
};

export default connect(
  (state, { data }) => ({
    jobOrder: pathOr(
      {},
      ["kanban", "jobOrders", prop(["jobOrderId"], data)],
      state
    ),
    jobSubmission: pathOr(
      {},
      ["kanban", "jobSubmissions", prop("jobSubmissionId", data)],
      state
    )
  }),
  { createJobSubmission }
)(DuplicateModal);
