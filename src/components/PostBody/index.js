import React from "react";
import { renderMarkdown } from "../../util";

export default function PostBody({ content }) {
  return <div>{renderMarkdown(content)}</div>;
}
