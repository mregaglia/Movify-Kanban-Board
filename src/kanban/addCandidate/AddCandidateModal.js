import React from "react";
import { connect } from "react-redux";
import { propOr } from "ramda";
import { bool, func, object } from "prop-types";
import styled from "styled-components";
import { createJobSubmission } from "../kanban.actions";
import { Modal, Title } from "../../components/modal";
import AddCandidateForm from "./AddCandidate.form";

const Text = styled.div(({ theme }) => ({
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.regular,
  textAlign: "justify",
  marginTop: 8,
  marginBottom: 24
}));

const AddCandidateModal = ({
  createJobSubmission,
  isOpen,
  jobOrder,
  onClose
}) => {
  const onSubmit = values => {
    // TODO: createJobSubmission
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <Title>{`Add candidate to ${propOr("", "title", jobOrder)}`}</Title>
        <Text>Select a candidate and a shortlist status.</Text>
        <AddCandidateForm onClose={onClose} onSubmit={onSubmit} />
      </div>
    </Modal>
  );
};

AddCandidateModal.propTypes = {
  createJobSubmission: func,
  isOpen: bool,
  jobOrder: object,
  onClose: func
};

AddCandidateModal.defaultProps = {
  isOpen: false,
  onClose: () => null
};

export default connect(
  null,
  { createJobSubmission }
)(AddCandidateModal);
