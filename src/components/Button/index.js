import React from "react";

import styles from "./index.module.css";
import classnames from "classnames";

export default function Button({ children, theme = "green", onClick }) {
  return (
    <div
      onClick={onClick}
      className={classnames(styles.container, {
        [styles.green]: theme === "green",
        [styles.gray]: theme === "gray",
      })}
    >
      {children}
    </div>
  );
}
