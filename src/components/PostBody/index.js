import React from "react";
import remark2react from "remark-react";
import unified from "unified";
import remark from "remark-parse";

import visit from "unist-util-visit";
import remove from "unist-util-remove";

import { renderMarkdown } from "../../util";

import styles from "./index.module.css";

const characterLimit = 400;

const shorten = (options) => (tree) => {
  let aggregateLength = 0;

  const test = (node) => {
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

export default function PostBody({ content }) {
  return (
    <div className={styles.postContainer}>
      <div className={styles.post}>{renderMarkdown(content)}</div>
    </div>
  );
}

export const PostSnippet = ({ post }) => {
  return (
    <div className={styles.snippetContainer}>
      <div className={styles.snippet}>
        {
          unified()
            .use(remark)
            .use(shorten)
            .use(trim)
            .use(remark2react)
            .processSync(post).contents
        }
      </div>
    </div>
  );
};
