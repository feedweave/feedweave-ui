import React from "react";

import Helmet from "react-helmet";

var unified = require("unified");
var remark = require("remark-parse");
var stringify = require("remark-stringify");

var visit = require("unist-util-visit");
var remove = require("unist-util-remove");
var select = require("unist-util-select");

const characterLimit = 140;

const shorten = options => tree => {
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

const trim = options => tree => {
  let aggregateLength = 0;
  visit(tree, "text", function(node) {
    const valueLength = node.value.length;
    console.log(valueLength);
    aggregateLength += valueLength;
    if (aggregateLength > characterLimit) {
      node.value =
        node.value
          .substring(0, valueLength - (aggregateLength - characterLimit))
          .trimEnd() + "...";
    }
  });
};

const replace = options => tree => {
  visit(tree, "root", function(node) {
    node.children = select.selectAll("text", tree);
  });
};

const extractTitle = content => {
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

const extractPostMeta = post => {
  const { content, id } = post;
  const title = extractTitle(content);

  return {
    title,
    url: `https://feedweave.co/post/${id}`
  };
};

const PostMetaTags = ({ post }) => {
  const { title, url } = extractPostMeta(post);
  return (
    <Helmet>
      <title>{`${title}`}</title>
      {/* <meta property="og:description" content={description} /> */}
      {/* <meta property="og:image" content={imageUrl} /> */}
      <meta property="og:url" content={url} />
      {/* <meta name="twitter:card" content="summary_large_image" /> */}
      <meta property="og:site_name" content="FEEDweave" />
      <meta name="twitter:site" content="@FEEDweave_" />
    </Helmet>
  );
};

export default PostMetaTags;
