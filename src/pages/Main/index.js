import React from "react";

import Sidebar from "../../components/Sidebar";

import styles from "./index.module.css";

export default function Main({ children }) {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.childrenContainer}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
