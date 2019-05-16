import React from "react";
import { connect } from "react-redux";
import { path, pathOr, prop, propOr } from "ramda";
import { bool, func, object } from "prop-types";
import ConfirmationModal from "../components/ConfirmationModal";
import { updateJobSubmission } from "./recruitment.actions";

const UpdateModal = ({
  data,
  isOpen,
  jobOrder,
  jobSubmission,
  onClose,
  updateJobSubmission
}) => {
  const onConfirm = () => {
    updateJobSubmission(
      path(["jobOrder", "id"], jobSubmission),
      prop("status", jobSubmission),
      prop("id", jobOrder),
      prop("id", jobSubmission),
      prop(["status"], data)
    );
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
  data: object,
  isOpen: bool,
  jobOrder: object,
  jobSubmission: object,
  onClose: func,
  updateJobSubmission: func
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
  { updateJobSubmission }
)(UpdateModal);
