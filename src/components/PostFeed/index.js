import React from "react";
import { navigate } from "@reach/router";

import styles from "./index.module.css";

import PostSnippet from "../PostSnippet";
import ReplyButton from "../ReplyButton";
import { NewPostFeedAction } from "../ActionHeader";

function ActionWithBodyAndReply({ action, body, reply }) {
  return (
    <div className={styles.actionContainer}>
      {action}
      <div className={styles.bodyContainer}>
        {body}
        {reply}
      </div>
    </div>
  );
}

function PostAction({ tx, user }) {
  const handleSnippetClick = (e) => {
    if (e.target.tagName.toLowerCase() !== "a") {
      navigate(`/post/${tx.id}`);
    }
  };

  const action = <NewPostFeedAction tx={tx} user={user} />;
  const body = (
    <div className={styles.snippetContainer} onClick={handleSnippetClick}>
      <PostSnippet post={tx.content} />
    </div>
  );
  const reply = <ReplyButton />;

  return <ActionWithBodyAndReply action={action} body={body} reply={reply} />;
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
