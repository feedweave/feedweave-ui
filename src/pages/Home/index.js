import React from "react";
import { Button } from "reactstrap";

import { fetchFeed, UserContext } from "../../util";
import PostFeed from "../../components/PostFeed";
import PostsToggle from "../../components/PostsToggle";

import styles from "./index.module.css";

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

  renderLoadMoreButton() {
    return (
      <Button className={styles.loadMoreButton} onClick={this.handleClick}>
        Load more posts
      </Button>
    );
  }

  renderFeed() {
    const { feed, nextCursor } = this.state;
    return (
      <div>
        <PostFeed feed={feed} />
        {nextCursor ? this.renderLoadMoreButton() : null}
      </div>
    );
  }

  render() {
    const { isLoaded } = this.state;
    return (
      <div className={styles.container}>
        {isLoaded ? (
          <div>
            <PostsToggle /> {this.renderFeed()}
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    );
  }
}

export default Home;
