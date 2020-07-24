import React from "react";
import { navigate } from "@reach/router";

import styles from "./index.module.css";

import PostSnippet from "../PostSnippet";
import ReplyButton from "../ReplyButton";
import {
  PostHeader,
  LikeHeader,
  CommentHeader,
  FollowHeader,
} from "../FeedHeaders";

function HeaderWithBody({ Header, tx, user }) {
  const handleSnippetClick = (e) => {
    if (e.target.tagName.toLowerCase() !== "a") {
      navigate(`/post/${tx.id}`);
    }
  };

  return (
    <div>
      <Header tx={tx} user={user} />
      <div className={styles.bodyContainer}>
        <div className={styles.snippetContainer} onClick={handleSnippetClick}>
          <PostSnippet post={tx.content} />
        </div>
        <ReplyButton />
      </div>
    </div>
  );
}

function FeedItem({ tx, user }) {
  const { appName } = tx;

  switch (appName) {
    case "transaction-comment":
      return <HeaderWithBody Header={CommentHeader} tx={tx} user={user} />;
    case "transaction-like":
      return <LikeHeader tx={tx} user={user} />;
    case "social-graph":
      return <FollowHeader tx={tx} user={user} />;
    default:
      return <HeaderWithBody Header={PostHeader} tx={tx} user={user} />;
  }
}

function ActivityFeed({ feed }) {
  const { users, transactions } = feed;

  return (
    <div className={styles.container}>
      {transactions.map((tx) => {
        const user = users.find((u) => u.id === tx.ownerAddress);
        return <FeedItem key={tx.id} tx={tx} user={user} />;
      })}
    </div>
  );
}

export default ActivityFeed;
