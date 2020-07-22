import React from "react";
import replyButtonIcon from "./reply-button-icon.svg";

import styles from "./index.module.css";

export default function ReplyButton({ onClick = () => {} }) {
  return (
    <div className={styles.replyButton} onClick={onClick}>
      <img
        className={styles.replyButtonIcon}
        alt="reply-icon"
        src={replyButtonIcon}
      />
      <div>Reply</div>
    </div>
  );
}
