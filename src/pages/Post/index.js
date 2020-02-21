import React from "react";
import Helmet from "react-helmet";

import { API_HOST } from "../../util";
import { PostFeedItem } from "../../components/PostFeed";
import Comments from "../../components/Comments";
import SubmitComment from "../../components/SubmitComment";

const loadPost = async txId => {
  const res = await fetch(`${API_HOST}/transaction/${txId}`);
  const { user, transaction: post } = await res.json();
  return { user, post };
};

const loadComments = async txId => {
  const res = await fetch(`${API_HOST}/transaction/${txId}/comments`);
  const { users, comments } = await res.json();
  return { users, comments };
};

const PostMetaTags = ({ post }) => {
  const { title, description, image, url, username } = extractPostMeta(post);
  return (
    <Helmet>
      <title>{`${title} | FEEDweave`}</title>
      <meta
        property="og:description"
        content="Offering tour packages for individuals or groups."
      />
      <meta
        property="og:image"
        content="http://euro-travel-example.com/thumbnail.jpg"
      />
      <meta
        property="og:url"
        content="http://euro-travel-example.com/index.htm"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:site_name" content="FEEDweave" />
      <meta name="twitter:site" content="@FEEDweave_" />
    </Helmet>
  );
};

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      post: null,
      user: null,
      commentsData: null
    };

    this.reloadComments = this.reloadComments.bind(this);
  }

  async componentDidMount() {
    await this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.txId !== prevProps.txId) {
      this.loadData();
    }
  }

  async reloadComments() {
    this.setState({ isLoaded: false });

    const { txId } = this.props;
    const commentsData = await loadComments(txId);

    this.setState({ isLoaded: true, commentsData });
  }

  async loadData() {
    // TODO handle errors
    const { txId } = this.props;
    const { user, post } = await loadPost(txId);
    const commentsData = await loadComments(txId);

    this.setState({ isLoaded: true, post, user, commentsData });
  }

  render() {
    const { txId } = this.props;
    const { post, user, commentsData, isLoaded } = this.state;
    const element = isLoaded ? (
      <div>
        <PostFeedItem fullSize={true} post={post} user={user} />
        <SubmitComment txId={txId} onSave={this.reloadComments} />
        <Comments data={commentsData} />
      </div>
    ) : (
      "Loading..."
    );
    return element;
  }
}

export default Post;
