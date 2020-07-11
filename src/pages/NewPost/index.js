import React, { useState } from "react";
import { navigate } from "@reach/router";

import TextEditor from "../../components/TextEditor";
import PostButton from "../../components/PostButton";

import { NewPostIcon } from "../../components/ActionHeader";
import styles from "./index.module.css";

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

const unescape = (text) => {
  return text.replace(/\\([\\`*{}[\]()#+\-.!_>])/g, "$1");
};

function NewPostHeader() {
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

function EditorControls() {
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

function NewPost() {
  const [post, setPost] = useState("");

  const handleTextChange = (value) => {
    const text = unescape(value());
    setPost(text);
  };

  const onSave = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <NewPostHeader />
      <TextEditor defaultValue={post} handleTextChange={handleTextChange} />
      <div className={styles.footerContainer}>
        <div className={styles.footerContentContainer}>
          <EditorControls />
          <PostButton
            data={post}
            onSave={onSave}
            buttonText="Publish to Arweave"
          />
        </div>
      </div>
    </div>
  );
}

export default NewPost;
