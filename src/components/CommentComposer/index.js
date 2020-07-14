import React, { useState } from "react";

import TextEditor from "../TextEditor";
import { NewCommentHeader, EditorControls } from "../TextComposer";
import PostButton from "../PostButton";

import { APP_NAME } from "../../util";

import styles from "./index.module.css";

const tags = {
  "App-Name": "transaction-comment",
  "App-Version": "0.0.1",
  "Parent-App-Name": APP_NAME,
};

export default function CommentComposer({ parentTx, onSave }) {
  const [comment, setComment] = useState("");

  const handleTextChange = (value) => {
    const text = unescape(value());
    setComment(text);
  };

  return (
    <div className={styles.container}>
      <NewCommentHeader />
      <div className={styles.editorModule}>
        <TextEditor
          defaultValue={comment}
          handleTextChange={handleTextChange}
        />
        <div className={styles.footerContainer}>
          <div className={styles.footerContentContainer}>
            <EditorControls />
            <PostButton
              data={comment}
              tags={{ ...tags, "Transaction-ID": parentTx.id }}
              onSave={onSave}
              buttonText="Publish to Arweave"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
