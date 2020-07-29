import React from "react";

import styles from "./index.module.css";

function LoadingSpinner() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>Loading...</div>
    </div>
  );
}

export default LoadingSpinner;
