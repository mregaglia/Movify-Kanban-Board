import React from "react";
import { connect } from "react-redux";
import { pathOr, prop, propOr } from "ramda";
import { bool, func, object } from "prop-types";
import styled from "styled-components";
import { Action, Modal, Row, Title } from "../../components/modal";
import { createJobSubmission } from "../kanban.actions";

const Text = styled.div(({ theme }) => ({
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.regular,
  textAlign: "justify",
  marginTop: 8,
  marginBottom: 24
}));

const ConfirmationModal = ({
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <Title>{`Candidate ${pathOr(
          "",
          ["candidate", "firstName"],
          jobSubmission
        )} ${pathOr("", ["candidate", "lastName"], jobSubmission)}`}</Title>
        <Text>{`Do you want to duplicate this candidate for the vacancy ${propOr(
          "",
          "title",
          jobOrder
        )} from ${pathOr(
          "",
          ["clientCorporation", "name"],
          jobOrder
        )} ?`}</Text>
        <Row>
          <Action onClick={onClose}>Cancel</Action>
          <Action positive onClick={onConfirm}>
            Confirm
          </Action>
        </Row>
      </div>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  createJobSubmission: func,
  isOpen: bool,
  jobOrder: object,
  jobSubmission: object,
  data: object,
  onClose: func
};

ConfirmationModal.defaultProps = {
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
)(ConfirmationModal);
