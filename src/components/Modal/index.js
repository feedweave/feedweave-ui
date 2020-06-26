import React, { useState } from "react";

import { createPortal } from "react-dom";

import styles from "./index.module.css";

export default function Modal({ children, activator, initialShow = false }) {
  const [show, setShow] = useState(initialShow);
  const content = show && (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button
          className={styles.modalClose}
          type="button"
          onClick={() => setShow(false)}
        >
          X
        </button>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
  return (
    <>
      {activator ? activator({ setShow }) : null}{" "}
      {createPortal(content, document.body)}
    </>
  );
}
