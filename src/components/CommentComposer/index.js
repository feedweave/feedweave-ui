import React, { useState } from "react";

// import TextEditor from "../TextEditor";
import { NewCommentHeader, RemirrorEditorControls } from "../TextComposer";
import Button from "../Button";
import { PostButtonWrapper } from "../PostButton";
import EditorWrapper, { TextEditor } from "../NewTextEditor";
import postStyles from "../PostBody/index.module.css";

import { APP_NAME, convertHTMLtoMarkdown } from "../../util";

import styles from "./index.module.css";

const tags = {
  "App-Name": "transaction-comment",
  "App-Version": "0.0.1",
  "Parent-App-Name": APP_NAME,
};

export default function CommentComposer({ parentTx, onSave, onCancel }) {
  const [comment, setComment] = useState("");

  const handleTextChange = (controller) => {
    const html = controller.getHTML();
    const markdown = convertHTMLtoMarkdown(html);
    setComment(markdown);
  };

  return (
    <div className={styles.container}>
      <NewCommentHeader text={comment} parentId={parentTx.id} />
      <div className={styles.editorModule}>
        <EditorWrapper onChange={handleTextChange}>
          <div className={postStyles.post}>
            <TextEditor className={styles.editor} />
          </div>
          <div className={styles.footerContainer}>
            <div className={styles.footerContentContainer}>
              <RemirrorEditorControls />
              <div className={styles.buttons}>
                <Button theme="secondary" onClick={onCancel}>
                  Cancel
                </Button>
                <div className={styles.spacerButton}></div>
                <PostButtonWrapper
                  data={comment}
                  tags={{ ...tags, "Transaction-ID": parentTx.id }}
                  onSave={onSave}
                >
                  <Button>Publish to Arweave</Button>
                </PostButtonWrapper>
              </div>
            </div>
          </div>
        </EditorWrapper>
      </div>
    </div>
  );
}
