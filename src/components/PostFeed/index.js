import React from "react";
import { navigate } from "@reach/router";

import styles from "./index.module.css";
import replyButtonIcon from "./reply-button-icon.svg";

import PostSnippet from "../PostSnippet";
import { NewPostFeedAction, CommentFeedAction } from "../ActionHeader";

export function ReplyButton() {
  return (
    <div className={styles.replyButton}>
      <img
        className={styles.replyButtonIcon}
        alt="reply-icon"
        src={replyButtonIcon}
      />
      <div>Reply</div>
    </div>
  );
}

function PostAction({ tx, user }) {
  const handleSnippetClick = (e) => {
    if (e.target.tagName.toLowerCase() !== "a") {
      navigate(`/post/${tx.id}`);
    }
  };
  return (
    <div className={styles.actionContainer}>
      <NewPostFeedAction tx={tx} user={user} />
      <div className={styles.bodyContainer}>
        <div className={styles.snippetContainer} onClick={handleSnippetClick}>
          <PostSnippet post={tx.content} />
        </div>
        <ReplyButton />
      </div>
    </div>
  );
}

export function CommentAction({ tx, user, parentUser }) {
  return (
    <div className={styles.actionContainer}>
      <CommentFeedAction tx={tx} user={user} parentUser={parentUser} />
      <div className={styles.bodyContainer}>
        <div className={styles.snippetContainer}>
          <PostSnippet post={tx.content} />
        </div>
        <ReplyButton />
      </div>
    </div>
  );
}

const Feed = ({ feed }) => {
  const { users, transactions } = feed;

  return (
    <div>
      {transactions.map((tx) => {
        const user = users.find((u) => u.id === tx.ownerAddress);
        return <PostAction key={tx.id} tx={tx} user={user} />;
      })}
    </div>
  );
};

export default Feed;
