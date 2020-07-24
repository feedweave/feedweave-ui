import React, { useState, useEffect } from "react";

import PostMetaTags from "../../components/PostMetaTags";

import { loadPost, loadComments } from "../../util";
import Comments from "../../components/Comments";
import PostBody from "../../components/PostBody";
import { PostPageHeader } from "../../components/TransactionHeaders";

import styles from "./index.module.css";
import ReplyButtonWithComposer from "../../components/ReplyButtonWithComposer";

function Post({ txId }) {
  const [postData, setPostData] = useState({});
  const [commentsData, setCommentsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { post, user } = postData;

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const postData = await loadPost(txId);
      setPostData(postData);
      setCommentsData({
        comments: postData.post.comments,
        users: postData.post.users,
      });
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
        <PostPageHeader tx={post} user={user} />
      </div>
      <div className={styles.body}>
        <PostBody content={post.content} />
      </div>
      <ReplyButtonWithComposer parentTx={post} onSave={reloadComments} />
      <Comments
        parentTx={post}
        data={commentsData}
        parentUser={user}
        onSave={reloadComments}
      />
    </div>
  );
}

export default Post;
