import React from "react";
import Editor from "rich-markdown-editor";

import styles from "./index.module.css";

class TextEditor extends React.Component {
  render() {
    const { defaultValue, handleTextChange } = this.props;
    return (
      <Editor
        defaultValue={defaultValue}
        className={styles.editor}
        onChange={handleTextChange}
        placeholder="# Write some markdown here!"
      />
    );
  }
}

export default TextEditor;
