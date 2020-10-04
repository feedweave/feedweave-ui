import React, { useState } from "react";

import classnames from "classnames";

import styles from "./index.module.css";

export default function PostsToggle({ onToggle }) {
  const [isPostsOnly, setIsPostsOnly] = useState(true);

  const clickPosts = () => {
    setIsPostsOnly(true);
    onToggle("posts");
  };

  const clickActivity = () => {
    setIsPostsOnly(false);
    onToggle("activity");
  };

  return (
    <div className={styles.container}>
      <div
        onClick={clickPosts}
        className={classnames(styles.toggleSwitch, {
          [styles.switchOn]: isPostsOnly,
        })}
      >
        Posts
      </div>

      <div
        onClick={clickActivity}
        className={classnames(styles.toggleSwitch, {
          [styles.switchOn]: !isPostsOnly,
        })}
      >
        Activity
      </div>
    </div>
  );
}
