import React from "react";
import { Link } from "@reach/router";

import { API_HOST, UserContext } from "../../util";
import PostFeed from "../../components/PostFeed";

import styles from "./index.module.css";

class Home extends React.Component {
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
    const res = await fetch(
      `${API_HOST}/transactions?app-name=arweave-blog-0.0.1`
    );
    const json = await res.json();
    this.setState({ isLoaded: true, feed: json });
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
        {isLoaded ? <PostFeed feed={feed} /> : "Loading..."}
      </div>
    );
  }
}

export default Home;
