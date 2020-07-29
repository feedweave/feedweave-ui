import React from "react";

import styles from "./index.module.css";
import classnames from "classnames";

export default function Button({
  children,
  theme = "green",
  onClick = () => {},
  isLoading,
}) {
  const handleClick = (e) => {
    if (!isLoading) {
      onClick(e);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={classnames(styles.container, {
        [styles.green]: theme === "green",
        [styles.greenFilled]: theme === "greenFilled",
        [styles.grayFilled]: theme === "grayFilled",
        [styles.gray]: theme === "gray",
        [styles.secondary]: theme === "secondary",
        [styles.loading]: isLoading,
      })}
    >
      {isLoading ? "Loading..." : children}
    </div>
  );
}
