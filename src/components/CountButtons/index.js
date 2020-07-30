import React, { useContext, useState, useRef, useEffect } from "react";

import { UserContext, APP_NAME } from "../../util";
import { PostButtonWrapper } from "../PostButton";
import HeaderOptions from "../HeaderOptions";

import { CommentIcon, LikeIcon, ActiveLikeIcon, OptionsIcon } from "../Icons";

import styles from "./index.module.css";

function generateLikeTags(tx, user) {
  if (!user) {
    return {};
  }
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

export function OptionsButton({ tx }) {
  const [showOptions, setShowOptions] = useState(false);

  const handleClick = () => {
    setShowOptions(true);
  };

  const wrapperRef = useRef(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div>
      <div className={styles.buttonContainer}>
        <OptionsIcon onClick={handleClick} />
        {showOptions ? (
          <div ref={wrapperRef} className={styles.optionsContainer}>
            <HeaderOptions />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function CommentCountButton({ tx }) {
  const { comments, commentsCount: txCommentCount } = tx;
  const commentCount = (comments && comments.length) || txCommentCount || 0;
  return (
    <div className={styles.buttonContainer}>
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
      <div className={styles.buttonContainer}>
        {didUserLike ? <ActiveLikeIcon /> : <LikeIcon />}

        <div className={styles.counter}>{likesCount}</div>
      </div>
    </PostButtonWrapper>
  );
}
