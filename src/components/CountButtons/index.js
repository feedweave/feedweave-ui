import React, { useContext, useState } from "react";

import { UserContext, APP_NAME } from "../../util";
import { PostButtonWrapper } from "../PostButton";

import { CommentIcon, LikeIcon, ActiveLikeIcon } from "../Icons";
import likeIcon from "./like-icon.png";
import activeLikeIcon from "./active-like-icon.png";

import styles from "./index.module.css";

function generateLikeTags(tx, user) {
  const likes = tx.likes || [];
  const hasUserLiked = !!likes.find(
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

export function CommentCountButton({ tx }) {
  const { comments, commentsCount: txCommentCount } = tx;
  const commentCount = (comments && comments.length) || txCommentCount || 0;
  return (
    <div className={styles.countButtonContainer}>
      <CommentIcon />
      <div className={styles.counter}>{commentCount}</div>
    </div>
  );
}

export function LikeCountButton({ tx, onSave = () => {} }) {
  const likes = tx.likes || [];
  const { user } = useContext(UserContext);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [didUserLike, setDidUserLike] = useState(
    user && !!likes.find(({ ownerAddress }) => ownerAddress === user.address)
  );

  const tags = generateLikeTags(tx, user);

  const internalOnSave = () => {
    if (tags["Action"] === "like") {
      setLikesCount(likesCount + 1);
      setDidUserLike(true);
    } else {
      setLikesCount(likesCount - 1);
      setDidUserLike(false);
    }
    onSave();
  };

  return (
    <PostButtonWrapper data="like" tags={tags} onSave={internalOnSave}>
      <div className={styles.countButtonContainer}>
        {didUserLike ? <ActiveLikeIcon /> : <LikeIcon />}

        <div className={styles.counter}>{likesCount}</div>
      </div>
    </PostButtonWrapper>
  );
}
