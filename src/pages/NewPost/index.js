import React, { useState } from "react";
import { navigate } from "@reach/router";

import { APP_NAME, APP_VERSION } from "../../util";

import TextEditor from "../../components/TextEditor";
import Button from "../../components/Button";
import { PostButtonWrapper } from "../../components/PostButton";

import styles from "./index.module.css";

import { NewPostHeader, EditorControls } from "../../components/TextComposer";

const unescape = (text) => {
  return text.replace(/\\([\\`*{}[\]()#+\-.!_>])/g, "$1");
};

const tags = {
  "App-Name": APP_NAME,
  "App-Version": APP_VERSION,
};

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
          <PostButtonWrapper data={post} tags={tags} onSave={onSave}>
            <Button>Publish to Arweave</Button>
          </PostButtonWrapper>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
