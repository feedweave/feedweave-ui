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

function countWords(s) {
  s = s.replace(/(^\s*)|(\s*$)/gi, ""); //exclude  start and end white-space
  s = s.replace(/[ ]{2,}/gi, " "); //2 or more space to 1
  s = s.replace(/\n /, "\n"); // exclude newline with a start spacing
  return s.split(" ").filter(function (str) {
    return str !== "";
  }).length;
}

function TextCounters({ text, bytePrice }) {
  const characterCount = text.length;
  const wordCount = countWords(text);
  const byteCount = new TextEncoder().encode(text).length;
  const arCount = Number(byteCount * bytePrice).toFixed(6);
  return (
    <div className={styles.textCounters}>
      <div className={styles.dataGroup}>
        <div className={styles.characterCount}>{characterCount} characters</div>
        <div className={styles.wordCount}>{wordCount} words</div>
      </div>
      <div className={styles.dataGroup}>
        <div className={styles.byteCount}>
          ~{Number(byteCount / 1000).toFixed(2)} KB
        </div>
        <div className={styles.arCount}>~{arCount} AR</div>
      </div>
    </div>
  );
}

export function NewPostHeader({ text, bytePrice }) {
  return (
    <div className={styles.newPostHeaderContainer}>
      <div className={styles.newPostHeaderLeft}>
        <NewPostIcon />
        <div className={styles.newPostText}>New Post</div>
      </div>
      <div className={styles.newPostHeaderRight}>
        <TextCounters text={text} bytePrice={bytePrice} />
        <div className={styles.dataGroup}>
          <div className={styles.date}>May 8, 2020</div>
        </div>
      </div>
    </div>
  );
}

export function NewCommentHeader({ parentId, text, bytePrice = 0 }) {
  return (
    <div className={styles.newPostHeaderContainer}>
      <div className={styles.newPostHeaderLeft}>
        <ReplyIcon />
        <div className={styles.newPostText}>
          Reply to <TruncatedHashLink txId={parentId} />
        </div>
      </div>
      <div className={styles.newPostHeaderRight}>
        <TextCounters text={text} bytePrice={bytePrice} />
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
