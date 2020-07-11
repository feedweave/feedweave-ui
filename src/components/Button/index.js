import React from "react";

import styles from "./index.module.css";
import classnames from "classnames";

export default function Button({
  children,
  theme = "green",
  onClick = () => {},
  isLoading,
}) {
  const handleClick = () => {
    if (!isLoading) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={classnames(styles.container, {
        [styles.green]: theme === "green",
        [styles.gray]: theme === "gray",
        [styles.loading]: isLoading,
      })}
    >
      {isLoading ? "Loading..." : children}
    </div>
  );
}
