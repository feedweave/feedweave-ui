import React from "react";
import { Link, navigate } from "@reach/router";

import { API_HOST, APP_NAME, APP_VERSION, UserContext } from "../../util";
import PostFeed from "../../components/PostFeed";

import styles from "../Home/index.module.css";

class YourFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      feed: {}
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
        `${API_HOST}/transactions?app-name=${APP_NAME}&app-version=${APP_VERSION}&user-feed=${user.address}`
      );
      const json = await res.json();
      this.setState({ isLoaded: true, feed: json });
    }
  }

  renderFeed() {
    const {
      user: {
        userInfo: { followingIds }
      }
    } = this.context;

    const { feed } = this.state;
    if (followingIds.length === 0) {
      return "You're not following anyone yet!";
    }

    return <PostFeed feed={feed} />;
  }

  render() {
    const { isLoaded } = this.state;
    const { user } = this.context;
    return (
      <div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link to="/my-feed">Your feed</Link>
            </li>
            <li>
              <Link to="/">Global feed</Link>
            </li>
          </ul>
        </nav>
        {isLoaded && user ? this.renderFeed() : "Loading..."}
      </div>
    );
  }
}

export default YourFeed;
