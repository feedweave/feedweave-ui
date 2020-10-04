import React from "react";

import { createPortal } from "react-dom";

import styles from "./index.module.css";

export function ModalBody({ top, middle, bottom }) {
  return (
    <div className={styles.container}>
      <div className={styles.top}>{top}</div>
      {middle ? <div className={styles.middle}>{middle}</div> : null}
      <div className={styles.bottom}>{bottom}</div>
    </div>
  );
}

export default function Modal({ children, onClose = () => {} }) {
  const content = (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
  return createPortal(content, document.body);
}
