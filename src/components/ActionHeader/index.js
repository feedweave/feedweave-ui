import React from "react";
import { Link } from "@reach/router";

import { formatDate } from "../../util";

import UserIcon from "../UserIcon";
import { LikeCountButton } from "../CountButtons";

import newPostIcon from "./new-post-icon.png";
import optionsIcon from "./post-options.png";
import replyIcon from "./reply-icon.svg";

import styles from "./index.module.css";

function getUserName(user) {
  const { id: userId, arweaveId } = user;
  return arweaveId ? `@${arweaveId}` : userId.substr(0, 8) + "...";
}

function ActionHeaderTemplate({ main, controls }) {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerMain}>{main}</div>
      {controls ? (
        <div className={styles.headerControls}>{controls}</div>
      ) : null}
    </div>
  );
}

function UserDetails({ user }) {
  const { id: userId } = user;
  const userName = getUserName(user);
  return (
    <>
      <div className={styles.headerAvatar}>
        <Link to={`/user/${userId}`}>
          <UserIcon size="22px" user={user} />
        </Link>
      </div>
      <div className={styles.headerUser}>
        <Link to={`/user/${userId}`}>{userName}</Link>
      </div>
    </>
  );
}

export function NewPostIcon() {
  return (
    <img className={styles.newPostIcon} alt="new-post-icon" src={newPostIcon} />
  );
}

export function ReplyIcon() {
  return <img className={styles.replyIcon} alt="reply-icon" src={replyIcon} />;
}

function NewPostSignifier({ tx: { id } }) {
  return (
    <>
      <NewPostIcon />
      <div className={styles.headerAction}>
        <Link to={`/post/${id}`}>New Post</Link>
      </div>
    </>
  );
}

function CommentSignifier({ tx, parentUser, parentType }) {
  const parentTxId = tx.parentTxId || "";
  let text = truncateHash(parentTxId);

  if (parentUser) {
    const userName = getUserName(parentUser);
    text = `${userName}'s ${parentType}`;
  }

  return (
    <>
      <img className={styles.replyIcon} alt="reply-icon" src={replyIcon} />
      <div className={styles.headerAction}>
        <Link to={`/post/${parentTxId}`}>{text}</Link>
      </div>
    </>
  );
}

function ReplyAndLikeControls({ tx }) {
  const { comments, commentsCount } = tx;

  return (
    <div className={styles.headerSocial}>
      <div className={styles.headerCountReply}>
        <img className={styles.replyIcon} alt="reply-icon" src={replyIcon} />
        <div>{(comments && comments.length) || commentsCount}</div>
      </div>
      <div className={styles.headerCountLike}>
        <LikeCountButton tx={tx} />
      </div>
    </div>
  );
}

function LikeAndOptionsControls({ tx }) {
  return (
    <div className={styles.headerSocial}>
      <div className={styles.headerLike}>
        <LikeCountButton tx={tx} />
      </div>
      <div className={styles.headerOptions}>
        <img
          className={styles.optionsIcon}
          alt="options-icon"
          src={optionsIcon}
        />
      </div>
    </div>
  );
}

function truncateHash(hash) {
  return hash.substr(0, 9) + "...";
}

export function TruncatedHashLink({ txId }) {
  return (
    <a
      className={styles.hashLink}
      href={`https://explorer.arweave.co/transaction/${txId}`}
    >
      {truncateHash(txId)}
    </a>
  );
}

function TransactionMetadata({ tx }) {
  const { id: txId, timestamp } = tx;

  const formattedTimestamp = formatDate(timestamp);
  return (
    <>
      <div className={styles.headerTimestamp}>{formattedTimestamp}</div>
      <div className={styles.headerHash}>
        <TruncatedHashLink txId={txId} />
      </div>
    </>
  );
}

function FeedActionHeaderTemplate({ tx, user, typeComponent }) {
  const main = (
    <div className={styles.headerMainContainer}>
      <div className={styles.headerMainLeft}>
        <UserDetails user={user} />
        {typeComponent}
      </div>
      <div className={styles.headerMainRight}>
        <TransactionMetadata tx={tx} />
      </div>
    </div>
  );

  const controls = <ReplyAndLikeControls tx={tx} />;

  return <ActionHeaderTemplate main={main} controls={controls} />;
}

export function NewPostFeedAction({ tx, user }) {
  const typeComponent = <NewPostSignifier tx={tx} />;

  return (
    <FeedActionHeaderTemplate
      tx={tx}
      user={user}
      typeComponent={typeComponent}
    />
  );
}

export function CommentActionHeader({
  tx,
  user,
  parentUser,
  parentType,
  parentTx,
}) {
  const main = (
    <div className={styles.headerMainContainer}>
      <div className={styles.headerMainLeft}>
        <UserDetails user={user} />
        <CommentSignifier tx={tx} user={parentUser} parentType={parentType} />
      </div>
      <div className={styles.headerMainRight}>
        <TransactionMetadata tx={tx} />
      </div>
    </div>
  );
  const controls = <LikeAndOptionsControls tx={tx} />;
  return <ActionHeaderTemplate main={main} controls={controls} />;
}
