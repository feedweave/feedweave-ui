import React from "react";
import { Link } from "@reach/router";
import classnames from "classnames";

import { formatDate, renderMarkdown } from "../../util";

import styles from "./index.module.css";
import newPostIcon from "./new-post-icon.png";
import likeIcon from "./like-icon.png";
import replyIcon from "./reply-icon.svg";
import replyButtonIcon from "./reply-button-icon.svg";
import placeholderIcon from "../UserIcon/placeholder-icon.png";

import PostSnippet from "../PostSnippet";

function ActionHeader({
  tx: { id, timestamp },
  user: { id: userId, arweaveId, twitterId },
}) {
  const userName = arweaveId ? `@${arweaveId}` : userId.substr(0, 8) + "...";

  const avatarUrl = twitterId
    ? `https://unavatar.now.sh/twitter/${twitterId}`
    : placeholderIcon;

  const formattedTimestamp = formatDate(timestamp);

  const likeCount = 5;
  const replyCount = 2;

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerLeft}>
        <div className={styles.headerAvatar}>
          <img alt="twitter-avatar" src={avatarUrl} />
        </div>
        <div className={styles.headerUser}>{userName}</div>
        <img
          className={styles.headerActionIcon}
          alt="new-post-icon"
          src={newPostIcon}
        />
        <div className={styles.headerAction}>New Post</div>
      </div>
      <div className={styles.headerRight}>
        <div className={styles.headerInner}>
          <div className={styles.headerTimestamp}>{formattedTimestamp}</div>
          <div className={styles.headerHash}>{id.substr(0, 9) + "..."}</div>
        </div>
        <div className={styles.headerSocial}>
          <div className={styles.headerCountReply}>
            <img
              className={styles.replyIcon}
              alt="reply-icon"
              src={replyIcon}
            />
            <div>{replyCount}</div>
          </div>
          <div className={styles.headerCountLike}>
            <img className={styles.likeIcon} alt="like-icon" src={likeIcon} />
            <div>{likeCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Action(props) {
  return (
    <div className={styles.actionContainer}>
      <ActionHeader {...props} />
      <div className={styles.bodyContainer}>
        <PostSnippet post={props.tx.content} />
        <div className={styles.replyButton}>
          <img
            className={styles.replyButtonIcon}
            alt="reply-icon"
            src={replyButtonIcon}
          />
          <div>Reply</div>
        </div>
      </div>
    </div>
  );
}

export class FeedItem extends React.Component {
  render() {
    const {
      post: { id, content, timestamp, blockHash },
      user: { id: userId, arweaveId, twitterId },
      fullSize,
    } = this.props;

    const userName = arweaveId ? `@${arweaveId}` : userId.substr(0, 8) + "...";

    const iconUrl = twitterId
      ? `https://unavatar.now.sh/twitter/${twitterId}`
      : placeholderIcon;

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
          [styles.feedContainer]: !fullSize,
        })}
      >
        {fullSize ? body : <Link to={`/post/${id}`}>{body}</Link>}
      </div>
    );
  }
}

const Feed = ({ feed }) => {
  const { users, transactions } = feed;

  return (
    <div>
      {transactions.map((tx) => {
        const user = users.find((u) => u.id === tx.ownerAddress);
        return <Action key={tx.id} tx={tx} user={user} />;
      })}
    </div>
  );
};

export default Feed;
