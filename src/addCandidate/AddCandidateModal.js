import React from "react";
import { prop, propOr } from "ramda";
import { array, bool, func, object } from "prop-types";
import styled from "styled-components";
import { Modal, Title } from "../components/modal";
import AddCandidateForm from "./AddCandidate.form";

const Text = styled.div(({ theme }) => ({
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.regular,
  textAlign: "justify",
  marginTop: 8,
  marginBottom: 24
}));

const AddCandidateModal = ({ isOpen, jobOrder, onAdd, onClose, statuses }) => {
  const onSubmit = values => {
    onAdd(values);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <Title>{`Add candidate to ${propOr("", "title", jobOrder)}`}</Title>
        <Text>Select a candidate and a shortlist status.</Text>
        <AddCandidateForm
          statuses={statuses}
          onClose={onClose}
          onSubmit={onSubmit}
          initialValues={{
            status: prop(0, statuses)
          }}
        />
      </div>
    </Modal>
  );
};

AddCandidateModal.propTypes = {
  isOpen: bool,
  jobOrder: object,
  onAdd: func,
  onClose: func,
  statuses: array
};

AddCandidateModal.defaultProps = {
  isOpen: false,
  onAdd: () => null,
  onClose: () => null,
  statuses: []
};

export default AddCandidateModal;
