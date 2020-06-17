import React from "react";
import { Link } from "@reach/router";

import { formatDate } from "../../util";

import UserIcon from "../UserIcon";

import newPostIcon from "./new-post-icon.png";
import likeIcon from "./like-icon.png";
import optionsIcon from "./post-options.png";
import replyIcon from "./reply-icon.svg";

import styles from "./index.module.css";

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
  const { id: userId, arweaveId } = user;
  const userName = arweaveId ? `@${arweaveId}` : userId.substr(0, 8) + "...";
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

function NewPostSignifier({ tx: { id } }) {
  return (
    <>
      <img
        className={styles.headerActionIcon}
        alt="new-post-icon"
        src={newPostIcon}
      />
      <div className={styles.headerAction}>
        <Link to={`/post/${id}`}>New Post</Link>
      </div>
    </>
  );
}

function ReplyAndLikeControls() {
  const likeCount = 5;
  const replyCount = 2;
  return (
    <div className={styles.headerSocial}>
      <div className={styles.headerCountReply}>
        <img className={styles.replyIcon} alt="reply-icon" src={replyIcon} />
        <div>{replyCount}</div>
      </div>
      <div className={styles.headerCountLike}>
        <img className={styles.likeIcon} alt="like-icon" src={likeIcon} />
        <div>{likeCount}</div>
      </div>
    </div>
  );
}
function LikeAndOptionsControls() {
  return (
    <div className={styles.headerSocial}>
      <div className={styles.headerLike}>
        <img className={styles.likeIcon} alt="like-icon" src={likeIcon} />
        <div>Like</div>
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

function TransactionMetadata({ tx }) {
  const { id: txId, timestamp } = tx;

  const formattedTimestamp = formatDate(timestamp);
  return (
    <>
      <div className={styles.headerTimestamp}>{formattedTimestamp}</div>
      <div className={styles.headerHash}>
        <a href={`https://explorer.arweave.co/transaction/${txId}`}>
          {txId.substr(0, 9) + "..."}
        </a>
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

  const controls = <ReplyAndLikeControls />;

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

export function PostDetailHeader({ tx, user }) {
  const main = (
    <div className={styles.headerMainContainer}>
      <div className={styles.headerMainLeft}>
        <UserDetails user={user} />
        <div>Original Post</div>
      </div>
      <div className={styles.headerMainRight}>
        <TransactionMetadata tx={tx} />
      </div>
    </div>
  );

  const controls = <LikeAndOptionsControls />;

  return <ActionHeaderTemplate main={main} controls={controls} />;
}
