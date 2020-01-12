import React from "react";
import { Link, navigate } from "@reach/router";

import { API_HOST, UserContext } from "../../util";
import PostFeed from "../../components/PostFeed";

import styles from "../Home/index.module.css";

class YourFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      feed: []
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
        `${API_HOST}/transactions?app-name=arweave-blog-0.0.1&user-feed=${user.address}`
      );
      const json = await res.json();
      this.setState({ isLoaded: true, feed: json });
    }
  }

  render() {
    const { isLoaded, feed } = this.state;
    const { user } = this.context;
    return (
      <div>
        <nav className={styles.nav}>
          {user ? (
            <ul>
              <li>
                <Link to="/my-feed">Your feed</Link>
              </li>
              <li>
                <Link to="/">Global feed</Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>Global feed</li>
            </ul>
          )}
        </nav>
        {isLoaded ? null : "Loading..."}
        {feed.length === 0 ? (
          "You're not following anyone yet!"
        ) : (
          <PostFeed posts={feed} />
        )}
      </div>
    );
  }
}

export default YourFeed;
