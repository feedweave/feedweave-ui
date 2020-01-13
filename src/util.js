import React from "react";
import Arweave from "arweave/web";

export const arweave = Arweave.init({
  host: "localhost",
  port: 4000,
  protocol: "http"
});

export const API_HOST = "";

export const APP_NAME = `arweave-blog-0.0.1`;
export const SOCIAL_GRAPH_APP_NAME = `social-graph`;
export const SOCIAL_GRAPH_APP_VERSION = `0.0.1`;

export const createTransaction = async (post, tags, wallet) => {
  const tx = await arweave.createTransaction({ data: post }, wallet);

  tx["last_tx"] = await arweave.api.get("/tx_anchor").then(x => x.data);

  for (const [tagKey, tagValue] of Object.entries(tags)) {
    tx.addTag(tagKey, tagValue);
  }

  await arweave.transactions.sign(tx, wallet);
  return tx;
};

export const publishTransaction = async tx => {
  await arweave.transactions.post(tx);
  return tx;
};

export const getUserInfo = async address => {
  const info = await fetch(`${API_HOST}/arweave-social/user/${address}`);
  return info;
};

export const UserContext = React.createContext({
  user: null,
  handleUser: () => {}
});
