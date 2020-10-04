import React, { useState } from "react";
import classnames from "classnames";

import CommentComposer from "../CommentComposer";
import ReplyButton from "../ReplyButton";

import styles from "./index.module.css";

export default function ReplyButtonWithComposer({
  parentTx,
  indentComposer = false,
  onSave,
  initialShowComposer = false,
}) {
  const [showComposer, setShowComposer] = useState(initialShowComposer);

  const onClick = () => {
    setShowComposer(true);
  };

  const onCancel = () => {
    setShowComposer(false);
  };

  return showComposer ? (
    <div
      className={classnames(styles.composerContainer, {
        [styles.indentContainer]: indentComposer,
      })}
    >
      <CommentComposer
        parentTx={parentTx}
        onSave={onSave}
        onCancel={onCancel}
      />
    </div>
  ) : (
    <div className={styles.replyButtonWrapper}>
      <ReplyButton onClick={onClick} />
    </div>
  );
}
