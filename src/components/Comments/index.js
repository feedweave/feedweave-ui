import React from "react";
import { Link } from "@reach/router";

import { formatDate } from "../../util";

const displayName = ({ id, arweaveId }) => {
  const userName = arweaveId ? `@${arweaveId}` : id.substr(0, 8) + "...";
  return <Link to={`/user/${id}`}>{userName}</Link>;
};

const Comment = ({ comment: { content, timestamp, ownerAddress }, users }) => {
  const user = users.find(u => u.id === ownerAddress);
  return (
    <div>
      <div>{displayName(user)}</div>
      <div>{formatDate(timestamp)}</div>
      <div>{content}</div>
    </div>
  );
};

class Comments extends React.Component {
  render() {
    const {
      data: { comments, users }
    } = this.props;

    return (
      <div>
        {comments.map(c => (
          <Comment comment={c} users={users} />
        ))}
      </div>
    );
  }
}

export default Comments;
