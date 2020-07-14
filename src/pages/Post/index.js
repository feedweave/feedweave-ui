import React, { useState, useEffect } from "react";

import PostMetaTags from "../../components/PostMetaTags";

import { loadPost, loadComments } from "../../util";
import Comments from "../../components/Comments";
import CommentComposer from "../../components/CommentComposer";
import PostBody from "../../components/PostBody";
import { PostDetailHeader } from "../../components/ActionHeader";
import { ReplyButton } from "../../components/PostFeed";

import styles from "./index.module.css";

function Post({ txId }) {
  const [postData, setPostData] = useState({});
  const [commentsData, setCommentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { post, user } = postData;

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const post = await loadPost(txId);
      const comments = await loadComments(txId);
      setPostData(post);
      setCommentsData(comments);
      setIsLoading(false);
    }

    fetchData();
  }, [txId]);

  const reloadComments = async () => {
    const comments = await loadComments(txId);
    setIsLoading(true);
    setCommentsData(comments);
    setIsLoading(false);
  };

  return isLoading ? (
    "Loading..."
  ) : (
    <div>
      <PostMetaTags post={post} />
      <div className={styles.header}>
        <div className={styles.headerTop}></div>
        <PostDetailHeader tx={post} user={user} />
      </div>
      <div className={styles.body}>
        <PostBody content={post.content} />
      </div>
      <CommentComposer parentTx={post} onSave={reloadComments} />
      <Comments data={commentsData} parentUser={user} />
    </div>
  );
}

export default Post;
