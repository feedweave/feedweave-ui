import React from "react";
import { Router, Link } from "@reach/router";

import { API_HOST } from "../../util";
import PostFeed from "../../components/PostFeed";
import FollowButton from "../../components/FollowButton";

import { UserContext } from "../../util";

import styles from "./index.module.css";
import SetUpIDButton from "../../components/SetUpIDButton";
import VerifyTwitterButton from "../../components/VerifyTwitterButton";

const FollowList = ({ ids, title, users }) => {
  return (
    <div>
      <div className={styles.followTitle}>{title}</div>
      {ids.map(id => {
        const relatedUser = users.find(user => user.id === id) || {};
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
    return <PostFeed feed={feed} />;
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
      feed: []
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
      `${API_HOST}/transactions?app-name=arweave-blog-0.0.1&wallet-id=${walletId}`
    ).then(res => res.json());

    const { user, relatedUsers } = await fetch(
      `${API_HOST}/arweave-social/user/${walletId}`
    ).then(res => res.json());
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

    return <FollowButton walletId={walletId} />;
  }

  render() {
    const { walletId } = this.props;
    const { user: loggedInUser } = this.context;
    const { user, feed, isLoaded, relatedUsers } = this.state;
    const { postCount, followerIds, followingIds, arweaveId, twitterId } = user;

    const isLoggedInUser = loggedInUser && loggedInUser.address === walletId;
    const element = isLoaded ? (
      <div>
        <div className={styles.userNameContainer}>
          {twitterId ? (
            <div className={styles.twitterAvatar}>
              <img
                alt="twitter-avatar"
                src={`https://avatars.io/twitter/${twitterId}`}
              />
            </div>
          ) : null}
          <div className={styles.userNameText}>
            <h1 className={styles.userName}>
              <Link to={`/user/${user.id}`}>
                {arweaveId ? `@${arweaveId}` : walletId}
              </Link>
            </h1>
            {arweaveId ? (
              <div className={styles.userNameSubheading}>{walletId}</div>
            ) : null}
          </div>
        </div>
        {isLoggedInUser && !arweaveId ? (
          <SetUpIDButton onSave={this.loadData} />
        ) : null}
        {isLoggedInUser && !twitterId ? <VerifyTwitterButton /> : null}
        <div className={styles.userStats}>
          <div>
            <Link to={`/user/${user.id}`}>Posts</Link>: {postCount}
          </div>
          <div>
            <Link to={`/user/${user.id}/followers`}>Followers</Link>:{" "}
            {followerIds.length}
          </div>
          <div>
            <Link to={`/user/${user.id}/following`}>Following</Link>:{" "}
            {followingIds.length}
          </div>
          {twitterId ? (
            <div>
              Twitter:{" "}
              <a href={`https://twitter.com/${twitterId}`}>{`@${twitterId}`}</a>
            </div>
          ) : null}
          <div>
            <a href={`https://explorer.arweave.co/address/${user.id}`}>
              Arweave activity
            </a>
          </div>
          {this.renderFollowButton()}
        </div>
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
