import React from "react";

import styles from "./index.module.css";

export default function Button({ children, onClick }) {
  return (
    <div onClick={onClick} className={styles.container}>
      {children}
    </div>
  );
}
