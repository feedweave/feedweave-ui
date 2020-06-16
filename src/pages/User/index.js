import React from "react";
import { Router, Link } from "@reach/router";

import { API_HOST, APP_NAME } from "../../util";
import PostFeed from "../../components/PostFeed";
import FollowButton from "../../components/FollowButton";
import ProfileHeader from "../../components/ProfileHeader";

import { UserContext } from "../../util";

import styles from "./index.module.css";

const FollowList = ({ ids, title, users }) => {
  return (
    <div>
      <div className={styles.followTitle}>{title}</div>
      {ids.map((id) => {
        const relatedUser = users.find((user) => user.id === id) || {};
        const displayName =
          (relatedUser.arweaveId && `@${relatedUser.arweaveId}`) || id;

        return (
          <div>
            <Link to={`/user/${id}`}>{displayName}</Link>
          </div>
        );
      })}
    </div>
  );
};

const Index = ({ feed }) => {
  if (feed.length === 0) {
    return "No posts yet!";
  } else {
    return (
      <div className={styles.indexContainer}>
        <PostFeed feed={feed} />;
      </div>
    );
  }
};

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      user: {},
      relatedUsers: [],
      feed: [],
    };

    this.loadData = this.loadData.bind(this);
  }

  static contextType = UserContext;

  async componentDidMount() {
    await this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.walletId !== prevProps.walletId) {
      this.loadData();
    }
  }

  async loadData() {
    // TODO handle errors
    this.setState({ isLoaded: false });
    const { walletId } = this.props;
    const feed = await fetch(
      `${API_HOST}/transactions?app-name=${APP_NAME}&wallet-id=${walletId}`
    ).then((res) => res.json());

    const { user, relatedUsers } = await fetch(
      `${API_HOST}/arweave-social/user/${walletId}`
    ).then((res) => res.json());
    this.setState({ isLoaded: true, feed, user, relatedUsers });
  }
  renderFollowButton() {
    const { walletId } = this.props;
    const { user: loggedInUser } = this.context;
    if (!loggedInUser) {
      return;
    }

    if (loggedInUser.address === walletId) {
      return;
    }

    return (
      <div className={styles.followButton}>
        <FollowButton walletId={walletId} />
      </div>
    );
  }

  render() {
    const { walletId } = this.props;
    const { user, feed, isLoaded, relatedUsers } = this.state;
    const { postCount, followerIds, followingIds, arweaveId, twitterId } = user;

    const username = arweaveId ? `@${arweaveId}` : walletId;
    const avatarUrl = twitterId
      ? `https://unavatar.now.sh/twitter/${twitterId}`
      : null;

    const element = isLoaded ? (
      <div className={styles.container}>
        <ProfileHeader
          username={username}
          avatarUrl={avatarUrl}
          walletAddress={walletId}
          twitterHandle={twitterId}
          postsCount={postCount}
          followersCount={followerIds.length}
          followingCount={followingIds.length}
        />
        <Router primary={false}>
          <Index path="/" feed={feed} />
          <FollowList
            path="/following"
            ids={user.followingIds}
            users={relatedUsers}
            title="Following"
          />
          <FollowList
            path="/followers"
            ids={user.followerIds}
            users={relatedUsers}
            title="Followers"
          />
        </Router>
      </div>
    ) : (
      "Loading..."
    );
    return element;
  }
}

export default User;
