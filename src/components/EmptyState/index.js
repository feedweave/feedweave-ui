import React from "react";

import styles from "./index.module.css";

function EmptyState({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default EmptyState;
