import React from "react";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  zIndex: 1000,
  borderRadius: 10,
  
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  zIndex: 1000,
};
const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div style={OVERLAY_STYLES} onClick={() => onClose()} />
      <div style={MODAL_STYLES}>{children}</div>
    </>
  );
};

export default Modal;
