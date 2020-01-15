import React from "react";

import { API_HOST } from "../../util";
import { PostFeedItem } from "../../components/PostFeed";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      post: null,
      user: null
    };
  }

  async componentDidMount() {
    await this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.txId !== prevProps.txId) {
      this.loadData();
    }
  }

  async loadData() {
    // TODO handle errors
    const { txId } = this.props;
    const res = await fetch(`${API_HOST}/transaction/${txId}`);
    const json = await res.json();
    const { user, transaction } = json;
    this.setState({ isLoaded: true, post: transaction, user });
  }

  render() {
    const { post, user, isLoaded } = this.state;
    const element = isLoaded ? (
      <PostFeedItem fullSize={true} post={post} user={user} />
    ) : (
      "Loading..."
    );
    return element;
  }
}

export default Post;
