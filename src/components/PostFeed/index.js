import React from "react";
import { Link } from "@reach/router";
import unified from "unified";
import parse from "remark-parse";
import remark2react from "remark-react";
import classnames from "classnames";

import styles from "./index.module.css";

function formatDate(unixtime) {
  var date = new Date(unixtime * 1000);
  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return `${monthNames[monthIndex]} ${day}, ${year}`;
}

export class PostFeedItem extends React.Component {
  render() {
    const {
      post: { id, ownerAddress, content, timestamp },
      fullSize
    } = this.props;

    const body = (
      <div className={styles.itemBody}>
        <div className={styles.itemContent}>
          {
            unified()
              .use(parse)
              .use(remark2react)
              .processSync(
                content.length > 241 && !fullSize
                  ? content.substr(0, 240) + "..."
                  : content
              ).contents
          }
        </div>
        <div className={styles.itemMetadata}>
          <div className={styles.itemCredit}>
            By: <Link to={`/user/${ownerAddress}`}>{ownerAddress}</Link>
          </div>
          <div className={styles.itemDate}>{formatDate(timestamp)}</div>
          <div>
            <a href={`https://explorer.arweave.co/transaction/${id}`}>Raw tx</a>
          </div>
        </div>
      </div>
    );

    return (
      <div
        className={classnames(styles.itemContainer, {
          [styles.fullSizeContainer]: fullSize
        })}
      >
        {fullSize ? body : <Link to={`/post/${id}`}>{body}</Link>}
      </div>
    );
  }
}

const PostFeed = ({ posts }) => (
  <div>
    {posts.map(post => (
      <PostFeedItem key={post.id} post={post} />
    ))}
  </div>
);

export default PostFeed;
