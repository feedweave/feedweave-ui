import React from "react";
import { Button } from "reactstrap";

import { API_HOST, UserContext } from "../../util";
import PostFeed from "../../components/PostFeed";
import PostsToggle from "../../components/PostsToggle";

import styles from "./index.module.css";

const fetchFeed = async (cursor) => {
  const queryParam = cursor ? `?cursor=${cursor}` : "";
  const res = await fetch(`${API_HOST}/post-feed${queryParam}`);
  const json = await res.json();

  return json;
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      nextCursor: null,
      feed: {},
    };

    this.handleClick = this.handleClick.bind(this);
  }

  static contextType = UserContext;

  async handleClick() {
    const {
      nextCursor,
      feed: { transactions, users },
    } = this.state;
    const json = await fetchFeed(nextCursor);
    this.setState({
      isLoaded: true,
      feed: {
        transactions: transactions.concat(json.transactions),
        users: users.concat(json.users),
      },
      nextCursor: json.nextCursor,
    });
  }

  async componentDidMount() {
    // TODO handle errors
    const json = await fetchFeed();
    const { nextCursor } = json;
    this.setState({ isLoaded: true, feed: json, nextCursor });
  }

  render() {
    const { isLoaded, feed, nextCursor } = this.state;
    return (
      <div className={styles.container}>
        <PostsToggle />
        {isLoaded ? (
          <div>
            <PostFeed feed={feed} />
            {nextCursor ? (
              <Button
                className={styles.loadMoreButton}
                onClick={this.handleClick}
              >
                Load more posts
              </Button>
            ) : null}
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    );
  }
}

export default Home;
