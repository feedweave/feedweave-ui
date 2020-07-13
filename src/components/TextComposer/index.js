import React from "react";

import { NewPostIcon, ReplyIcon, TruncatedHashLink } from "..//ActionHeader";

import boldIcon from "./bold-icon.svg";
import underlineIcon from "./underline-icon.svg";
import italicIcon from "./italic-icon.svg";
import strikethroughIcon from "./strikethrough-icon.svg";
import h1Icon from "./h1-icon.svg";
import h2Icon from "./h2-icon.svg";
import olIcon from "./ol-icon.svg";
import ulIcon from "./ul-icon.svg";
import codeIcon from "./code-icon.svg";
import quoteIcon from "./quote-icon.svg";

import styles from "./index.module.css";

export function NewPostHeader() {
  return (
    <div className={styles.newPostHeaderContainer}>
      <div className={styles.newPostHeaderLeft}>
        <NewPostIcon />
        <div className={styles.newPostText}>New Post</div>
      </div>
      <div className={styles.newPostHeaderRight}>
        <div className={styles.dataGroup}>
          <div className={styles.characterCount}>1,339 characters</div>
          <div className={styles.wordCount}>23 words</div>
        </div>
        <div className={styles.dataGroup}>
          <div className={styles.byteCount}>0kb</div>
          <div className={styles.arCount}>0.000000 AR</div>
        </div>
        <div className={styles.dataGroup}>
          <div className={styles.date}>May 8, 2020</div>
        </div>
      </div>
    </div>
  );
}

export function NewCommentHeader() {
  const txId = "TfyZK6X-Hi0Heq-heZXji4IL7iaJCC_1fdbw6oqrEJ0";
  return (
    <div className={styles.newPostHeaderContainer}>
      <div className={styles.newPostHeaderLeft}>
        <ReplyIcon />
        <div className={styles.newPostText}>
          Reply to <TruncatedHashLink txId={txId} />
        </div>
      </div>
      <div className={styles.newPostHeaderRight}>
        <div className={styles.dataGroup}>
          <div className={styles.characterCount}>1,339 characters</div>
          <div className={styles.wordCount}>23 words</div>
        </div>
        <div className={styles.dataGroup}>
          <div className={styles.byteCount}>0kb</div>
          <div className={styles.arCount}>0.000000 AR</div>
        </div>
      </div>
    </div>
  );
}

export function EditorControls() {
  return (
    <div className={styles.editorControlsContainer}>
      <img src={boldIcon} alt="bold-icon" />
      <img
        className={styles.underlineIcon}
        src={underlineIcon}
        alt="underline-icon"
      />
      <img className={styles.italicIcon} src={italicIcon} alt="italic-icon" />
      <img
        className={styles.strikethroughIcon}
        src={strikethroughIcon}
        alt="strikethrough-icon"
      />
      <img src={h1Icon} alt="h1-icon" />
      <img src={h2Icon} alt="h2-icon" />
      <img src={olIcon} alt="ol-icon" />
      <img className={styles.ulIcon} src={ulIcon} alt="ul-icon" />
      <img className={styles.codeIcon} src={codeIcon} alt="code-icon" />
      <img src={quoteIcon} alt="quote-icon" />
    </div>
  );
}
