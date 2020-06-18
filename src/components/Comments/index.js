import React from "react";

import { CommentAction } from "../PostFeed";
import styles from "./index.module.css";

function Comment({ comment, users, parentUser }) {
  const user = users.find((u) => u.id === comment.ownerAddress);

  return <CommentAction tx={comment} user={user} parentUser={parentUser} />;
}

export default function Comments({ data: { comments, users }, parentUser }) {
  return (
    <div className={styles.container}>
      {comments.length > 0 ? (
        comments.map((c) => (
          <Comment
            key={c.id}
            comment={c}
            users={users}
            parentUser={parentUser}
          />
        ))
      ) : (
        <div>There are no comments yet.</div>
      )}
    </div>
  );
}
