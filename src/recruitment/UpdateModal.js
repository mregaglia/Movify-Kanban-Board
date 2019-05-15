import React from "react";
import { connect } from "react-redux";
import { pathOr, prop, propOr } from "ramda";
import { bool, func, object } from "prop-types";
import ConfirmationModal from "../components/ConfirmationModal";

const UpdateModal = ({ isOpen, jobOrder, jobSubmission, onClose }) => {
  const onConfirm = () => {
    // TODO : update job submission
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
      text={`Do you want to move this candidate to the shortlist ${propOr(
        "",
        "title",
        jobOrder
      )} ?`}
    />
  );
};

UpdateModal.propTypes = {
  isOpen: bool,
  jobOrder: object,
  jobSubmission: object,
  data: object,
  onClose: func
};

UpdateModal.defaultProps = {
  isOpen: false,
  onClose: () => null
};

export default connect(
  (state, { data }) => ({
    jobOrder: pathOr(
      {},
      ["recruitment", "jobOrders", prop(["jobOrderId"], data)],
      state
    ),
    jobSubmission: pathOr(
      {},
      ["recruitment", "jobSubmissions", prop("jobSubmissionId", data)],
      state
    )
  }),
  {}
)(UpdateModal);
