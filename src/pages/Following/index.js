import React from "react";
import { navigate } from "@reach/router";

import { API_HOST, APP_NAME, UserContext } from "../../util";
import PostFeed from "../../components/PostFeed";
import PostsToggle from "../../components/PostsToggle";

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
      const res = await fetch(
        `${API_HOST}/transactions?app-name=${APP_NAME}&user-feed=${user.address}`
      );
      const json = await res.json();
      this.setState({ isLoaded: true, feed: json });
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
      return "You're not following anyone yet!";
    }

    return <PostFeed feed={feed} />;
  }

  render() {
    const { isLoaded } = this.state;
    return (
      <div className={styles.container}>
        {isLoaded ? (
          <div>
            <PostsToggle />
            {this.renderFeed()}
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    );
  }
}

export default Following;
