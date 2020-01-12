import React from "react";

import { API_HOST } from "../../util";
import { PostFeedItem } from "../../components/PostFeed";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      post: {}
    };
  }

  async componentDidMount() {
    // TODO handle errors
    const { txId } = this.props;
    const res = await fetch(`${API_HOST}/transaction/${txId}`);
    const json = await res.json();
    this.setState({ isLoaded: true, post: json });
  }
  render() {
    const { post, isLoaded } = this.state;
    const element = isLoaded ? (
      <PostFeedItem fullSize={true} post={post} />
    ) : (
      "Loading..."
    );
    return element;
  }
}

export default Post;
