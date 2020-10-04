import React from "react";

import Helmet from "react-helmet";

import unified from "unified";
import remark from "remark-parse";
import stringify from "remark-stringify";
import visit from "unist-util-visit";
import remove from "unist-util-remove";
import select from "unist-util-select";

import { getUserName } from "../../util";

const characterLimit = 140;

const shorten = (options) => (tree) => {
  let nodeFound = false;

  const test = (node, index, parent) => {
    if (nodeFound && node.type !== "text") {
      return true;
    }
    if (node.type === "heading" && node.depth === 1) {
      nodeFound = true;
    }
    if (node.type === "paragraph" && parent && parent.type === "root") {
      nodeFound = true;
    }
    return false;
  };
  remove(tree, test);
};

const replace = (options) => (tree) => {
  visit(tree, "root", function (node) {
    node.children = [select.select("text", tree)];
  });
};

const trim = (options) => (tree) => {
  let aggregateLength = 0;
  visit(tree, "text", function (node) {
    const valueLength = node.value.length;
    aggregateLength += valueLength;
    if (aggregateLength > characterLimit) {
      node.value =
        node.value
          .substring(0, valueLength - (aggregateLength - characterLimit))
          .trimEnd() + "...";
    }
  });
};

const extractTitle = (content) => {
  return unified()
    .use(remark)
    .use(shorten)
    .use(replace)
    .use(trim)
    .use(stringify)
    .processSync(content)
    .toString()
    .trim();
};

const extractPostMeta = (post) => {
  const { content, id } = post;
  const title = extractTitle(content);

  return {
    title,
    url: `https://feedweave.co/post/${id}`,
  };
};

export const PostMetaTags = ({ post }) => {
  const { title, url } = extractPostMeta(post);
  return (
    <Helmet>
      <title>{`${title}`}</title>
      {/* <meta property="og:description" content={description} /> */}
      {/* <meta property="og:image" content={imageUrl} /> */}
      <meta property="og:url" content={url} />
      {/* <meta name="twitter:card" content="summary_large_image" /> */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      {/* <meta name="twitter:description" content="View the album on Flickr." /> */}
      <meta property="og:site_name" content="FEEDweave" />
      <meta name="twitter:site" content="@FEEDweave_" />
    </Helmet>
  );
};

export const HomeMetaTags = () => {
  return (
    <Helmet>
      <title>FeedWeave</title>
    </Helmet>
  );
};

export const FollowingMetaTags = () => {
  return (
    <Helmet>
      <title>Following</title>
    </Helmet>
  );
};

export const NewPostMetaTags = () => {
  return (
    <Helmet>
      <title>New Post</title>
    </Helmet>
  );
};

export const UserMetaTags = ({ user }) => {
  const username = getUserName(user);
  return (
    <Helmet>
      <title>{username}</title>
    </Helmet>
  );
};
