import React from "react";

import Sidebar from "../../components/Sidebar";

import styles from "./index.module.css";

export default function Main({ children }) {
  return (
    <>
      <Sidebar />
      <div className={styles.container}>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
}
