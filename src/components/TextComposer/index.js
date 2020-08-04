import React from "react";
import { useRemirror } from "remirror/react";

import { NewPostIcon, ReplyIcon, TruncatedHashLink } from "../ActionHeader";

import boldIcon from "./bold.svg";
import underlineIcon from "./underline.svg";
import italicIcon from "./italic.svg";
import strikethroughIcon from "./strikethrough.svg";
import h1Icon from "./h1.svg";
import h2Icon from "./h2.svg";
import olIcon from "./ol.svg";
import ulIcon from "./ul.svg";
import codeIcon from "./code.svg";
import quoteIcon from "./quote.svg";

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

export function RemirrorEditorControls() {
  const { commands, active } = useRemirror({ autoUpdate: true });
  return <EditorControls active={active} commands={commands} />;
}

function EditorControls({ commands, active }) {
  return (
    <div className={styles.editorControlsContainer}>
      <img
        onClick={() => commands && commands.toggleBold()}
        className={active && active.bold() ? styles.activeControl : null}
        src={boldIcon}
        alt="bold"
      />
      <img
        onClick={() => commands && commands.toggleUnderline()}
        className={active && active.underline() ? styles.activeControl : null}
        src={underlineIcon}
        alt="underline"
      />
      <img
        onClick={() => commands && commands.toggleItalic()}
        className={active && active.italic() ? styles.activeControl : null}
        src={italicIcon}
        alt="italic"
      />
      <img
        onClick={() => commands && commands.toggleStrike()}
        className={active && active.strike() ? styles.activeControl : null}
        src={strikethroughIcon}
        alt="strikethrough"
      />
      <img
        onClick={() => commands && commands.toggleHeading({ level: 1 })}
        className={
          active && active.heading({ level: 1 }) ? styles.activeControl : null
        }
        src={h1Icon}
        alt="h1"
      />
      <img
        onClick={() => commands && commands.toggleHeading({ level: 2 })}
        className={
          active && active.heading({ level: 2 }) ? styles.activeControl : null
        }
        src={h2Icon}
        alt="h2"
      />
      <img
        onClick={() => commands && commands.toggleOrderedList()}
        className={active && active.orderedList() ? styles.activeControl : null}
        src={olIcon}
        alt="ol"
      />
      <img
        onClick={() => commands && commands.toggleBulletList()}
        className={active && active.bulletList() ? styles.activeControl : null}
        src={ulIcon}
        alt="ul"
      />
      <img
        className={active && active.code() ? styles.activeControl : null}
        onClick={() => commands && commands.toggleCode()}
        src={codeIcon}
        alt="code"
      />
      <img
        className={active && active.blockquote() ? styles.activeControl : null}
        onClick={() => commands && commands.toggleBlockquote()}
        src={quoteIcon}
        alt="quote"
      />
    </div>
  );
}
