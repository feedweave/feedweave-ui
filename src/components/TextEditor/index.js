import React from "react";
import Editor from "rich-markdown-editor";

import styles from "./index.module.css";

class TextEditor extends React.Component {
  render() {
    return (
      <Editor
        className={styles.editor}
        onChange={this.props.handleTextChange}
        placeholder="# Write some markdown here!"
      />
    );
  }
}

export default TextEditor;
