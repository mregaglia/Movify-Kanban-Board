import React from "react";
import ReactModal from "react-modal";
import { bool, func, object } from "prop-types";
import theme from "../../style/theme";

const customStyles = {
  overlay: {
    backgroundColor: theme.colors.backgroundShadow
  },
  content: {
    borderColor: "#0000002b",
    borderRadius: theme.dimensions.borderRadius,
    boxShadow: "2px 2px 2px #0000002b",
    minWidth: "30%",
    maxWidth: "60%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

export const Modal = ({ children, isOpen, onClose }) => (
  <ReactModal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
    {children}
  </ReactModal>
);

Modal.propTypes = {
  children: object,
  isOpen: bool,
  onClose: func
};

export default Modal;
