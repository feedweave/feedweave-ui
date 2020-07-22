import React from "react";

import PostBody from "../PostBody";
import ReplyButtonWithComposer from "../ReplyButtonWithComposer";
import { CommentActionHeader } from "../ActionHeader";

import styles from "./index.module.css";

function Comment({ comment, users, parentUser, onSave, parentTx, parentType }) {
  const user = users.find((u) => u.id === comment.ownerAddress);
  const { comments: childrenComments, users: commentUsers } = comment;

  return (
    <div className={styles.actionContainer}>
      <CommentActionHeader
        tx={comment}
        user={user}
        parentUser={parentUser}
        parentTx={parentTx}
        parentType={parentType}
      />
      <div className={styles.bodyContainer}>
        <PostBody content={comment.content} />
      </div>
      <div>
        <ReplyButtonWithComposer
          indentComposer={true}
          parentTx={comment}
          onSave={onSave}
        />
        {childrenComments.length > 0 ? (
          <div className={styles.childrenComments}>
            {childrenComments.map((c) => (
              <Comment
                key={c.id}
                comment={c}
                users={commentUsers}
                parentUser={user}
                onSave={onSave}
                parentType="comment"
                parentTx={comment}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function Comments({
  data: { comments, users },
  parentTx,
  parentUser,
  onSave,
}) {
  return (
    <div className={styles.container}>
      {comments.length > 0 ? (
        comments.map((c) => (
          <Comment
            key={c.id}
            parentTx={parentTx}
            comment={c}
            users={users}
            parentUser={parentUser}
            onSave={onSave}
            parentType="post"
          />
        ))
      ) : (
        <div className={styles.noComments}>
          <div className={styles.noCommentsBold}>
            There are no comments yet.
          </div>
          <div>Be the first to share your thoughts.</div>
        </div>
      )}
    </div>
  );
}
