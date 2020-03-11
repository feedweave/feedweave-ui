import remark2react from "remark-react";
import unified from "unified";
import remark from "remark-parse";

import visit from "unist-util-visit";
import remove from "unist-util-remove";

const characterLimit = 160;

const shorten = options => tree => {
  let aggregateLength = 0;

  const test = node => {
    if (aggregateLength > characterLimit) {
      return true;
    }
    if (node.type === "text") {
      aggregateLength += node.value.length;
    }
    return false;
  };
  remove(tree, test);
};

const trim = options => tree => {
  let aggregateLength = 0;
  visit(tree, "text", function(node) {
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

const Post = ({ post }) => {
  return unified()
    .use(remark)
    .use(shorten)
    .use(trim)
    .use(remark2react)
    .processSync(post).contents;
};

export default Post;
