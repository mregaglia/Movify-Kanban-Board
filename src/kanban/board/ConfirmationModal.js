import React from "react";
import { connect } from "react-redux";
import { pathOr, prop, propOr } from "ramda";
import { bool, func, object } from "prop-types";
import Modal from "react-modal";
import styled from "styled-components";
import theme from "../../style/theme";
import { createJobSubmission } from "../kanban.actions";

const Title = styled.div(({ theme }) => ({
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.large,
  textAlign: "justify",
  marginTop: 4,
  marginBottom: 16
}));

const Text = styled.div(({ theme }) => ({
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.regular,
  textAlign: "justify",
  marginTop: 8,
  marginBottom: 24
}));

const Row = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end"
});

const Button = styled.div(({ positive, theme }) => ({
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.medium,
  color: positive ? theme.colors.red : theme.colors.mediumGrey,
  cursor: "pointer",
  padding: 4,
  marginLeft: 16
}));

const customStyles = {
  overlay: {
    backgroundColor: theme.colors.backgroundShadow
  },
  content: {
    borderColor: "#0000002b",
    borderRadius: theme.dimensions.borderRadius,
    boxShadow: "2px 2px 2px #0000002b",
    maxWidth: "60%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

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
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
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
          <Button onClick={onClose}>Cancel</Button>
          <Button positive onClick={onConfirm}>
            Confirm
          </Button>
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
