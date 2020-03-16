import React from "react";
import { Link } from "@reach/router";
import classnames from "classnames";

import { formatDate, renderMarkdown } from "../../util";

import styles from "./index.module.css";
import placeholderIcon from "../UserIcon/placeholder-icon.png";

import PostSnippet from "../PostSnippet";

export class PostFeedItem extends React.Component {
  render() {
    const {
      post: { id, content, timestamp, blockHash },
      user: { id: userId, arweaveId, twitterId },
      fullSize
    } = this.props;

    const userName = arweaveId ? `@${arweaveId}` : userId.substr(0, 8) + "...";

    // const iconUrl = twitterId
    //   ? `https://avatars.io/twitter/${twitterId}`
    //   : placeholderIcon;

    const iconUrl = placeholderIcon;

    const body = (
      <div className={styles.itemWrapper}>
        <div className={styles.twitterAvatar}>
          <Link to={`/user/${userId}`}>
            <img alt="twitter-avatar" src={iconUrl} />
          </Link>
        </div>
        <div className={styles.itemBody}>
          <div className={styles.itemMetadata}>
            <div className={styles.metadataText}>
              <div className={styles.itemHeader}>
                <Link to={`/user/${userId}`}>{userName}</Link>
                <span className={styles.itemTime}>{formatDate(timestamp)}</span>
              </div>
              <div className={styles.itemDateAndStatus}>
                {!blockHash ? (
                  <div className={styles.itemPending}>Mining...</div>
                ) : null}
              </div>
            </div>
          </div>
          <div className={styles.itemContent}>
            {fullSize ? (
              renderMarkdown(content)
            ) : (
              <PostSnippet post={content} />
            )}
          </div>
          {fullSize ? (
            <div>
              <a href={`https://explorer.arweave.co/transaction/${id}`}>
                Raw tx
              </a>
            </div>
          ) : null}
        </div>
      </div>
    );

    return (
      <div
        className={classnames(styles.itemContainer, {
          [styles.fullSizeContainer]: fullSize,
          [styles.feedContainer]: !fullSize
        })}
      >
        {fullSize ? body : <Link to={`/post/${id}`}>{body}</Link>}
      </div>
    );
  }
}

const PostFeed = ({ feed }) => {
  const { users, transactions } = feed;

  return (
    <div>
      {transactions.map(post => {
        const user = users.find(u => u.id === post.ownerAddress);
        return <PostFeedItem key={post.id} post={post} user={user} />;
      })}
    </div>
  );
};

export default PostFeed;
