import React, { useContext } from "react";
import { Link } from "@reach/router";

import { PostButtonWrapper } from "../PostButton";

import { formatDate, APP_NAME, UserContext } from "../../util";

import UserIcon from "../UserIcon";

import newPostIcon from "./new-post-icon.png";
import likeIcon from "./like-icon.png";
import activeLikeIcon from "./active-like-icon.png";
import optionsIcon from "./post-options.png";
import replyIcon from "./reply-icon.svg";

import styles from "./index.module.css";
import { useState } from "react";

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

function CommentSignifier({ parentTx: { id }, user, parentType }) {
  const userName = getUserName(user);
  return (
    <>
      <img className={styles.replyIcon} alt="reply-icon" src={replyIcon} />
      <div className={styles.headerAction}>
        <Link to={`/post/${id}`}>{`${userName}'s ${parentType}`}</Link>
      </div>
    </>
  );
}

function ReplyAndLikeControls({ tx: { likes, comments } }) {
  return (
    <div className={styles.headerSocial}>
      <div className={styles.headerCountReply}>
        <img className={styles.replyIcon} alt="reply-icon" src={replyIcon} />
        <div>{comments}</div>
      </div>
      <div className={styles.headerCountLike}>
        <img className={styles.likeIcon} alt="like-icon" src={likeIcon} />
        <div>{likes}</div>
      </div>
    </div>
  );
}

function generateLikeTags(tx, user) {
  const hasUserLiked = !!tx.likes.find(
    (like) => like.ownerAddress === user.address
  );

  const action = hasUserLiked ? "unlike" : "like";

  return {
    "App-Name": "transaction-like",
    "App-Version": "0.0.1",
    Action: action,
    "Parent-App-Name": APP_NAME,
    "Transaction-ID": tx.id,
  };
}

function LikeAndOptionsControls({ tx }) {
  const { likes } = tx;
  const { user } = useContext(UserContext);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [didUserLike, setDidUserLike] = useState(
    user && !!likes.find(({ ownerAddress }) => ownerAddress === user.address)
  );

  const tags = generateLikeTags(tx, user);

  const onSave = () => {
    if (tags["Action"] === "like") {
      setLikesCount(likesCount + 1);
      setDidUserLike(true);
    } else {
      setLikesCount(likesCount - 1);
      setDidUserLike(false);
    }
  };
  return (
    <div className={styles.headerSocial}>
      <PostButtonWrapper data="like" tags={tags} onSave={onSave}>
        <div className={styles.headerLike}>
          {didUserLike ? (
            <img
              className={styles.likeIcon}
              alt="active-like-icon"
              src={activeLikeIcon}
            />
          ) : (
            <img className={styles.likeIcon} alt="like-icon" src={likeIcon} />
          )}

          <div>{likesCount}</div>
        </div>
      </PostButtonWrapper>
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
export function TruncatedHashLink({ txId }) {
  return (
    <a
      className={styles.hashLink}
      href={`https://explorer.arweave.co/transaction/${txId}`}
    >
      {txId.substr(0, 9) + "..."}
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

export function CommentFeedAction({ tx, user, parentUser }) {
  const typeComponent = <CommentSignifier tx={tx} user={parentUser} />;

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

  const controls = <LikeAndOptionsControls tx={tx} />;

  return <ActionHeaderTemplate main={main} controls={controls} />;
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
        <CommentSignifier
          parentTx={parentTx}
          user={parentUser}
          parentType={parentType}
        />
      </div>
      <div className={styles.headerMainRight}>
        <TransactionMetadata tx={tx} />
      </div>
    </div>
  );
  const controls = <LikeAndOptionsControls tx={tx} />;
  return <ActionHeaderTemplate main={main} controls={controls} />;
}
