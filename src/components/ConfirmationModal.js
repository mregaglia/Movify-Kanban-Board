import React from "react";
import { bool, func, string } from "prop-types";
import styled from "styled-components";
import { Action, Modal, Row, Title } from "../components/modal";

const Text = styled.div(({ theme }) => ({
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.regular,
  textAlign: "justify",
  marginTop: 8,
  marginBottom: 24
}));

const ConfirmationModal = ({ isOpen, onConfirm, onClose, title, text }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div>
      <Title>{title}</Title>
      <Text>{text}</Text>
      <Row>
        <Action onClick={onClose}>Cancel</Action>
        <Action positive onClick={onConfirm}>
          Confirm
        </Action>
      </Row>
    </div>
  </Modal>
);

ConfirmationModal.propTypes = {
  isOpen: bool,
  onConfirm: func,
  onClose: func,
  title: string,
  text: string
};

ConfirmationModal.defaultProps = {
  isOpen: false,
  onClose: () => null
};

export default ConfirmationModal;
