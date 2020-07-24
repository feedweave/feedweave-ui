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
    <div
      className={classnames(styles.container, {
        [styles.switchOn]: isPostsOnly,
      })}
      onClick={internalOnClick}
    >
      <div className={styles.toggleBackground}>
        <div className={styles.toggleSwitch}></div>
      </div>
      <div className={styles.postsText}>Posts Only</div>
    </div>
  );
}
