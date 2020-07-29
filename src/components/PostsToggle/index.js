import React, { useState } from "react";

import classnames from "classnames";

import styles from "./index.module.css";

export default function PostsToggle({ onClick }) {
  const [isPostsOnly, setIsPostsOnly] = useState(true);

  const internalOnClick = () => {
    setIsPostsOnly(!isPostsOnly);
    onClick();
  };

  return (
    <div className={styles.container} onClick={internalOnClick}>
      <div
        className={classnames(styles.toggleSwitch, {
          [styles.switchOn]: isPostsOnly,
        })}
      >
        Posts
      </div>

      <div
        className={classnames(styles.toggleSwitch, {
          [styles.switchOn]: !isPostsOnly,
        })}
      >
        Activity
      </div>
    </div>
  );
}
