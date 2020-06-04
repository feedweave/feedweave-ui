import React from "react";
import { Link } from "@reach/router";
import { Comment, Header } from "semantic-ui-react";

import placeholderIcon from "../UserIcon/placeholder-icon.png";

import { formatDate, renderMarkdown } from "../../util";

const displayName = ({ id, arweaveId }) => {
  const userName = arweaveId ? `@${arweaveId}` : id.substr(0, 8) + "...";
  return <Link to={`/user/${id}`}>{userName}</Link>;
};

const CustomComment = ({
  comment: { content, timestamp, ownerAddress },
  users,
}) => {
  const user = users.find((u) => u.id === ownerAddress);

  const { twitterId } = user;

  const iconUrl = twitterId
    ? `https://unavatar.now.sh/twitter/${twitterId}`
    : placeholderIcon;
  return (
    <Comment>
      <Comment.Avatar src={iconUrl} />
      <Comment.Content>
        <Comment.Author as="span">{displayName(user)}</Comment.Author>
        <Comment.Metadata>
          <div>{formatDate(timestamp)}</div>
        </Comment.Metadata>
        <Comment.Text>{renderMarkdown(content)}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

class Comments extends React.Component {
  render() {
    const {
      data: { comments, users },
    } = this.props;

    return (
      <Comment.Group>
        <Header as="h3" dividing>
          Comments
        </Header>
        {comments.length > 0 ? (
          comments.map((c) => (
            <CustomComment key={c.id} comment={c} users={users} />
          ))
        ) : (
          <div>There are no comments yet.</div>
        )}
      </Comment.Group>
    );
  }
}

export default Comments;
