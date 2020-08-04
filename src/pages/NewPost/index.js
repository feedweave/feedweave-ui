import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";

import {
  APP_NAME,
  APP_VERSION,
  fetchBytePrice,
  convertHTMLtoMarkdown,
} from "../../util";

import EditorWrapper, { TextEditor } from "../../components/NewTextEditor";
import Button from "../../components/Button";
import { PostButtonWrapper } from "../../components/PostButton";

import styles from "./index.module.css";
import postStyles from "../../components/PostBody/index.module.css";

import {
  NewPostHeader,
  RemirrorEditorControls,
} from "../../components/TextComposer";

const tags = {
  "App-Name": APP_NAME,
  "App-Version": APP_VERSION,
};

function NewPost() {
  const [post, setPost] = useState("");
  const [bytePrice, setBytePrice] = useState(1676997);

  const handleTextChange = (controller) => {
    const html = controller.getHTML();
    const markdown = convertHTMLtoMarkdown(html);
    setPost(markdown);
  };

  const onSave = () => {
    navigate("/");
  };

  useEffect(() => {
    async function fetchData() {
      const bytePrice = await fetchBytePrice();
      setBytePrice(bytePrice);
    }

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <NewPostHeader text={post} bytePrice={bytePrice} />
      <EditorWrapper onChange={handleTextChange}>
        <div className={postStyles.post}>
          <TextEditor className={styles.editor} />
        </div>
        <div className={styles.footerContainer}>
          <div className={styles.footerContentContainer}>
            <RemirrorEditorControls />
            <PostButtonWrapper data={post} tags={tags} onSave={onSave}>
              <Button>Publish to Arweave</Button>
            </PostButtonWrapper>
          </div>
        </div>
      </EditorWrapper>
    </div>
  );
}

export default NewPost;
