import React, { useState } from "react";

import TextEditor from "../TextEditor";
import { NewCommentHeader, EditorControls } from "../TextComposer";
import PostButton from "../PostButton";

import styles from "./index.module.css";

const PostCommentButton = PostButton;

const tags = {
  "App-Name": "transaction-comment",
  "App-Version": "0.0.1",
  "Parent-App-Name": "FEEDweave",
  "Transaction-ID": "FuZ3PwN1HGv_Fm6du-367sCHFlPYbSu4DDHBIBZtAok",
};

export default function CommentComposer({ parentTx }) {
  const [comment, setComment] = useState("");

  const handleTextChange = (value) => {
    const text = unescape(value());
    setComment(text);
  };

  const onSave = () => {};

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
            <PostCommentButton
              data={comment}
              onSave={onSave}
              buttonText="Publish to Arweave"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
