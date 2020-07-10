import React, { useState } from "react";

import { createPortal } from "react-dom";

import styles from "./index.module.css";

import confirmStyles from "../Onboarding/index.module.css";

function ConfirmTx() {
  return (
    <div className={confirmStyles.confirmTxContainer}>
      <div className={confirmStyles.heading}>Submit Proof of Identity</div>
      <div className={confirmStyles.txData}>
        <div className={confirmStyles.dataRow}>
          <div className={confirmStyles.dataKey}>ID:</div>
          <div className={confirmStyles.dataValue}>
            ee_QpxI1IhwYZN4SAw2HuUuPCRE9XwPpM7PCcZU3fhM
          </div>
        </div>
        <div className={confirmStyles.dataRow}>
          <div className={confirmStyles.dataKey}>Data:</div>
          <div className={confirmStyles.dataValue}>152 Bytes</div>
        </div>
        <div className={confirmStyles.dataRow}>
          <div className={confirmStyles.dataKey}>Wallet:</div>
          <div className={confirmStyles.dataValue}>
            BhWx_AdInMBYr7Ouq5mQhPii_Eslq8Qb7_4uBAGOX0U
          </div>
        </div>
        <div className={confirmStyles.dataRow}>
          <div className={confirmStyles.dataKey}>Price:</div>
          <div className={confirmStyles.dataValue}>0.000006330106 AR</div>
        </div>
        <div className={confirmStyles.dataRow}>
          <div className={confirmStyles.dataKey}>Balance:</div>
          <div className={confirmStyles.dataValue}>0.998887991367 AR</div>
        </div>
      </div>
    </div>
  );
}

export function ModalBody({ top, middle, bottom }) {
  return (
    <div className={styles.container}>
      <div className={styles.top}>{top}</div>
      {middle ? <div className={styles.middle}>{middle}</div> : null}
      <div className={styles.bottom}>{bottom}</div>
    </div>
  );
}

export default function Modal({
  children,
  activator,
  initialShow = false,
  onClose = () => {},
}) {
  const [show, setShow] = useState(initialShow);
  const content = show && (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button
          className={styles.modalClose}
          type="button"
          onClick={() => {
            onClose();
            setShow(false);
          }}
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
