import React from "react";

import postIcon from "./post.svg";
import commentIcon from "./comment.svg";
import likeIcon from "./like.svg";
import activeLikeIcon from "./like-active.svg";
import followIcon from "./follow.svg";
import optionsIcon from "./options.svg";

export function PostIcon() {
  return <img alt="post-icon" src={postIcon} />;
}

export function CommentIcon() {
  return <img alt="comment-icon" src={commentIcon} />;
}

export function LikeIcon() {
  return <img alt="like-icon" src={likeIcon} />;
}

export function ActiveLikeIcon() {
  return <img alt="active-like-icon" src={activeLikeIcon} />;
}

export function FollowIcon() {
  return <img alt="post-icon" src={followIcon} />;
}

export function OptionsIcon({ ref, onClick = () => {} }) {
  return (
    <img ref={ref} alt="options-icon" src={optionsIcon} onClick={onClick} />
  );
}
