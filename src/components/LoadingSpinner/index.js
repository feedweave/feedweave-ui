import React from "react";

import styles from "./index.module.css";

function NewSpinner() {
  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        <div className={styles.loadingInner}></div>
      </div>
    </div>
  );
}

export default NewSpinner;
