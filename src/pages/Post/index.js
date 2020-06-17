import React, { useState, useEffect } from "react";

import PostMetaTags from "../../components/PostMetaTags";

import { loadPost, loadComments, renderMarkdown } from "../../util";
import Comments from "../../components/Comments";
import SubmitComment from "../../components/SubmitComment";
import { PostActionHeader } from "../../components/ActionHeader";

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
        <PostActionHeader tx={post} user={user} />
      </div>
      <div className={styles.body}>{renderMarkdown(post.content)}</div>
      <SubmitComment txId={txId} onSave={reloadComments} />
      <Comments data={commentsData} />
    </div>
  );
}

export default Post;
