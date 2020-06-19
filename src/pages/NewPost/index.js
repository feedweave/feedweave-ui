import React from "react";
import TextEditor from "../../components/TextEditor";
// import { Button } from "reactstrap";
// import { navigate } from "@reach/router";

// import unified from "unified";
// import parse from "remark-parse";
// import remark2react from "remark-react";

// import { UserContext, APP_NAME, APP_VERSION } from "../../util";
// import SaveTransactionWithConfirmationButton from "../../components/SaveTransactionWithConfirmationButton";
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

// const tags = {
//   "App-Name": APP_NAME,
//   "App-Version": APP_VERSION,
// };

// const unescape = (text) => {
//   return text.replace(/\\([\\`*{}[\]()#+\-.!_>])/g, "$1");
// };

// class NewPost extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { post: "", showPreview: false };
//     this.handleTextChange = this.handleTextChange.bind(this);
//     this.onSave = this.onSave.bind(this);
//     this.togglePreview = this.togglePreview.bind(this);
//   }

//   static contextType = UserContext;

//   handleTextChange = (value) => {
//     const text = unescape(value());
//     this.setState({ post: text });
//   };

//   async onSave(tx) {
//     navigate(`/post/${tx.id}`);
//   }

//   togglePreview() {
//     this.setState({ showPreview: !this.state.showPreview });
//   }

//   renderEditor() {
//     const { post } = this.state;
//     return (
//       <div className={styles.editorContainer}>
//         <TextEditor
//           defaultValue={post}
//           handleTextChange={this.handleTextChange}
//         />
//         <div className={styles.buttonContainer}>
//           <Button
//             color="primary"
//             disabled={post === ""}
//             onClick={this.togglePreview}
//           >
//             Preview
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   renderPreview() {
//     const { post } = this.state;
//     const { user } = this.context;
//     return (
//       <div className={styles.previewContainer}>
//         <div className={styles.previewPost}>
//           {unified().use(parse).use(remark2react).processSync(post).contents}
//         </div>
//         <div className={styles.buttonContainer}>
//           <Button
//             className={styles.continueEditingButton}
//             onClick={this.togglePreview}
//           >
//             Edit
//           </Button>
//           <SaveTransactionWithConfirmationButton
//             data={post}
//             tags={tags}
//             user={user}
//             onSave={this.onSave}
//             buttonText="Publish"
//             color="primary"
//           />
//         </div>
//         <div className={styles.previewWarning}>
//           WARNING: FEEDweave uses a blockchain as a datastore, so all data is
//           immutable. Deleting or editing posts is not yet supported. Make sure
//           your post is formatted correctly before publishing.
//         </div>
//       </div>
//     );
//   }

//   render() {
//     const { showPreview } = this.state;
//     return (
//       <div className={styles.container}>
//         {showPreview ? this.renderPreview() : this.renderEditor()}
//       </div>
//     );
//   }
// }

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

function NewPostFooter() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerContentContainer}>
        <EditorControls />
        <PublishButton />
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

function PublishButton() {
  return <div className={styles.publishButton}>Publish to Arweave</div>;
}

function NewPost() {
  return (
    <div className={styles.container}>
      <NewPostHeader />
      <TextEditor />
      <NewPostFooter />
    </div>
  );
}

export default NewPost;
