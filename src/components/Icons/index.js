import React from "react";

import postIcon from "./post.svg";
import commentIcon from "./comment.svg";
import likeIcon from "./like.svg";
import activeLikeIcon from "./like-active.svg";
import followIcon from "./follow.svg";

import styles from "./index.module.css";

export function PostIcon() {
  return <img className={styles.postIcon} alt="post-icon" src={postIcon} />;
}

export function CommentIcon() {
  return (
    <img className={styles.commentIcon} alt="comment-icon" src={commentIcon} />
  );
}

export function LikeIcon() {
  return <img className={styles.likeIcon} alt="like-icon" src={likeIcon} />;
}

export function ActiveLikeIcon() {
  return (
    <img
      className={styles.likeIcon}
      alt="active-like-icon"
      src={activeLikeIcon}
    />
  );
}

export function FollowIcon() {
  return <img className={styles.followIcon} alt="post-icon" src={followIcon} />;
}
