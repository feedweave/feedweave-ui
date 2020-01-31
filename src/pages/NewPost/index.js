import React from "react";
import { Button } from "reactstrap";
import TextEditor from "../../components/TextEditor";
import { navigate } from "@reach/router";

import unified from "unified";
import parse from "remark-parse";
import remark2react from "remark-react";

import { UserContext, APP_NAME, APP_VERSION } from "../../util";
import SaveTransactionWithConfirmationButton from "../../components/SaveTransactionWithConfirmationButton";
import styles from "./index.module.css";

const tags = {
  "App-Name": APP_NAME,
  "App-Version": APP_VERSION
};

const unescape = text => {
  return text.replace(/\\([\\`*{}[\]()#+\-.!_>])/g, "$1");
};

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { post: "", showPreview: false };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.togglePreview = this.togglePreview.bind(this);
  }

  static contextType = UserContext;

  handleTextChange = value => {
    const text = unescape(value());
    console.log(text);
    this.setState({ post: text });
  };

  async onSave(tx) {
    navigate(`/post/${tx.id}`);
  }

  togglePreview() {
    this.setState({ showPreview: !this.state.showPreview });
  }

  renderEditor() {
    const { post } = this.state;
    return (
      <div className={styles.editorContainer}>
        <TextEditor
          defaultValue={post}
          handleTextChange={this.handleTextChange}
        />
        <div className={styles.buttonContainer}>
          <Button
            color="primary"
            disabled={post === ""}
            onClick={this.togglePreview}
          >
            Preview
          </Button>
        </div>
      </div>
    );
  }

  renderPreview() {
    const { post } = this.state;
    const { user } = this.context;
    return (
      <div className={styles.previewContainer}>
        <div className={styles.previewPost}>
          {
            unified()
              .use(parse)
              .use(remark2react)
              .processSync(post).contents
          }
        </div>
        <div className={styles.buttonContainer}>
          <Button
            className={styles.continueEditingButton}
            onClick={this.togglePreview}
          >
            Edit
          </Button>
          <SaveTransactionWithConfirmationButton
            data={post}
            tags={tags}
            user={user}
            onSave={this.onSave}
            buttonText="Publish"
            color="primary"
          />
        </div>
        <div className={styles.previewWarning}>
          WARNING: FEEDweave uses a blockchain as a datastore, so all data is
          immutable. Deleting or editing posts is not yet supported. Make sure
          your post is formatted correctly before publishing.
        </div>
      </div>
    );
  }

  render() {
    const { showPreview } = this.state;
    return (
      <div className={styles.container}>
        {showPreview ? this.renderPreview() : this.renderEditor()}
      </div>
    );
  }
}

export default NewPost;
