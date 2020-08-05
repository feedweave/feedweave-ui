import React from "react";

import { BoldExtension } from "remirror/extension/bold";
import { BlockquoteExtension } from "remirror/extension/blockquote";
import { CodeExtension } from "remirror/extension/code";
import { CodeBlockExtension } from "remirror/extension/code-block";
import { HeadingExtension } from "remirror/extension/heading";
import { ItalicExtension } from "remirror/extension/italic";
import { StrikeExtension } from "remirror/extension/strike";
import { UnderlineExtension } from "remirror/extension/underline";
import { AutoLinkExtension } from "@remirror/extension-auto-link";
import { EmojiExtension } from "remirror/extension/emoji";

import {
  BulletListExtension,
  ListItemExtension,
  OrderedListExtension,
} from "remirror/preset/list";
import { CorePreset } from "remirror/preset/core";

import { RemirrorProvider, useManager, useRemirror } from "remirror/react";

const EXTENSIONS = [
  new CorePreset(),
  new BoldExtension(),
  new ItalicExtension(),
  new UnderlineExtension(),
  new StrikeExtension(),
  new HeadingExtension(),
  new BlockquoteExtension(),
  new BulletListExtension(),
  new ListItemExtension(),
  new OrderedListExtension(),
  new CodeExtension(),
  new CodeBlockExtension(),
  new AutoLinkExtension(),
  new EmojiExtension(),
];

const EditorWrapper = ({ children, className, onChange }) => {
  const extensionManager = useManager(EXTENSIONS);

  const value = "";

  return (
    <RemirrorProvider
      placeholder="foo"
      autoFocus={true}
      manager={extensionManager}
      value={value}
      onChange={onChange}
      className={className}
    >
      <div>{children}</div>
    </RemirrorProvider>
  );
};

export default EditorWrapper;

export const TextEditor = ({ className }) => {
  const { getRootProps } = useRemirror();

  return <div className={className} {...getRootProps()} />;
};
