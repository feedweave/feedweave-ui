import React from "react";
import { navigate } from "@reach/router";

import { UserContext, fetchFollowingFeed } from "../../util";
import ActivityFeed from "../../components/ActivityFeed";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import { FollowingMetaTags } from "../../components/MetaTags";

import styles from "../Home/index.module.css";

class Following extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      feed: {},
    };
  }

  static contextType = UserContext;

  async componentDidMount() {
    // TODO handle errors
    const { user } = this.context;
    if (!user) {
      await navigate("/");
    } else {
      const feed = await fetchFollowingFeed(user.address);
      this.setState({ isLoaded: true, feed });
    }
  }

  renderFeed() {
    const {
      user: {
        userInfo: { followingIds },
      },
    } = this.context;

    const { feed } = this.state;

    if (followingIds.length === 0) {
      return (
        <EmptyState>
          <div>You're not following anyone yet.</div>
          <div>Follow a few accounts to see posts appear here.</div>
        </EmptyState>
      );
    }

    return <ActivityFeed feed={feed} />;
  }

  render() {
    const { isLoaded } = this.state;
    return (
      <div className={styles.container}>
        <FollowingMetaTags />
        {isLoaded ? <div>{this.renderFeed()}</div> : <LoadingSpinner />}
      </div>
    );
  }
}

export default Following;
