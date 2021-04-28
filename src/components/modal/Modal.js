import React from "react"
import ReactModal from "react-modal"
import { bool, func, node, oneOfType, arrayOf, string } from "prop-types"
import theme from "../../style/theme"

const customStyles = {
  overlay: {
    backgroundColor: theme.colors.backgroundShadow,
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
    transform: "translate(-50%, -50%)",
    overflow: "visible",
  },
}

export const Modal = ({ children, isOpen, onClose }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
    >
      {children}
    </ReactModal>
  )
}

Modal.propTypes = {
  children: oneOfType([arrayOf(node), node]),
  isOpen: bool,
  onClose: func,
  className: string,
}

export default Modal
