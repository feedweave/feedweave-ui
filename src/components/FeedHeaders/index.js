import React from "react";
import { Link } from "@reach/router";
import classnames from "classnames";

import { formatDate, truncateHash, getUserName } from "../../util";

import UserIcon from "../UserIcon";
import { LikeCountButton, CommentCountButton } from "../CountButtons";

import { PostIcon, CommentIcon, LikeIcon, FollowIcon } from "../Icons";

import styles from "./index.module.css";

function ActionDescription({ tx }) {
  const { parentTxId, parentUser } = tx;
  const userName = parentUser ? getUserName(parentUser) : "...";

  return (
    <Link className={styles.boldLink} to={`/post/${parentTxId}`}>
      {`${userName}'s post`}
    </Link>
  );
}

function TruncatedHashLink({ txId }) {
  return (
    <a
      className={styles.link}
      href={`https://explorer.arweave.co/transaction/${txId}`}
    >
      {truncateHash(txId)}
    </a>
  );
}

function VerticalBreak() {
  return <div className={styles.verticalBreak}></div>;
}

function ReplyAndLike({ tx }) {
  return (
    <div className={styles.innerContainer}>
      <CommentCountButton tx={tx} />
      <LikeCountButton tx={tx} />
    </div>
  );
}

function DateAndHash({ tx }) {
  const { id: txId, timestamp } = tx;

  const formattedTimestamp = formatDate(timestamp);
  return (
    <>
      <div className={styles.time}>{formattedTimestamp}</div>
      <div className={styles.hash}>
        <TruncatedHashLink txId={txId} />
      </div>
    </>
  );
}

function Avatar({ user }) {
  const { id: userId } = user;
  return (
    <div>
      <Link to={`/user/${userId}`}>
        <UserIcon size="22px" user={user} />
      </Link>
    </div>
  );
}

function Username({ user, theme = "black" }) {
  const { id: userId } = user;
  const userName = getUserName(user);
  return (
    <div
      className={classnames(styles.username, {
        [styles.grayUsername]: theme === "gray",
      })}
    >
      <Link to={`/user/${userId}`}>{userName}</Link>
    </div>
  );
}

function Container({ children }) {
  return <div className={styles.headerContainer}>{children}</div>;
}

export function PostHeader({ tx, user }) {
  return (
    <Container>
      <div className={styles.innerContainer}>
        <Avatar user={user} />
        <Username user={user} />
        <PostIcon />
        <Link className={styles.boldLink} to={`/post/${tx.id}`}>
          New Post
        </Link>
      </div>
      <div className={styles.innerContainer}>
        <DateAndHash tx={tx} />
        <VerticalBreak />
        <ReplyAndLike tx={tx} />
      </div>
    </Container>
  );
}

export function LikeHeader({ tx, user }) {
  return (
    <Container>
      <div className={styles.innerContainer}>
        <Avatar user={user} />
        <Username user={user} />
        <LikeIcon />
        <ActionDescription tx={tx} />
      </div>
      <div className={styles.innerContainer}>
        <DateAndHash tx={tx} />
      </div>
    </Container>
  );
}
export function CommentHeader({ tx, user }) {
  return (
    <Container>
      <div className={styles.innerContainer}>
        <Avatar user={user} />
        <Username user={user} />
        <CommentIcon />
        <ActionDescription tx={tx} />
      </div>
      <div className={styles.innerContainer}>
        <DateAndHash tx={tx} />
        <VerticalBreak />
        <ReplyAndLike tx={tx} />
      </div>
    </Container>
  );
}
export function FollowHeader({ tx, user }) {
  return (
    <Container>
      <div className={styles.innerContainer}>
        <Avatar user={user} />
        <Username user={user} />
        <FollowIcon />
        <Username user={tx.followedUser} theme="gray" />
      </div>
      <div className={styles.innerContainer}>
        <DateAndHash tx={tx} />
      </div>
    </Container>
  );
}
