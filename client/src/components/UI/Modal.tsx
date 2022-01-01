import { Fragment, ReactNode } from "react";
import ReactDOM from "react-dom";

import classes from "./styles/Modal.module.css";

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
};

const Backdrop = ({ onClose }: any) => {
  return <div className={classes.backdrop} onClick={onClose} />;
};

const ModalOverlay = ({ children }: any) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const potalElement: HTMLElement = document.getElementById("overlays")!;

const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, potalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        potalElement
      )}
    </Fragment>
  );
};

export default Modal;
