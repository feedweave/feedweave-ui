import React from "react";
import Arweave from "arweave/web";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

import unified from "unified";
import parse from "remark-parse";
import remark2react from "remark-react";

export const arweave = Arweave.init({
  host: "gateway.arweave.co",
  port: 443,
  protocol: "https",
});

export const API_HOST = "https://gateway.arweave.co";

export const APP_NAME = `FEEDweave`;
export const APP_VERSION = `0.0.1`;
export const SOCIAL_GRAPH_APP_NAME = `social-graph`;
export const SOCIAL_GRAPH_APP_VERSION = `0.0.1`;

export const createTransaction = async (post, tags, wallet) => {
  const tx = await arweave.createTransaction({ data: post }, wallet);

  for (const [tagKey, tagValue] of Object.entries(tags)) {
    tx.addTag(tagKey, tagValue);
  }

  await arweave.transactions.sign(tx, wallet);
  return tx;
};

export const publishTransaction = async (tx) => {
  await arweave.transactions.post(tx);
  return tx;
};

export const getUserInfo = async (address) => {
  const info = await fetch(`${API_HOST}/arweave-social/user/${address}`);
  return info;
};

export const UserContext = React.createContext({
  user: null,
  handleUser: () => {},
});

export const fetchUserByArweaveID = async (userName) => {
  const res = await fetch(
    `${API_HOST}/arweave-social/check-arweave-id/${userName}`
  );

  if (res.status === 404) {
    return null;
  } else {
    const user = await res.json();
    return user;
  }
};

export const loadPost = async (txId) => {
  const res = await fetch(`${API_HOST}/transaction/${txId}`);
  const { user, transaction: post } = await res.json();
  return { user, post };
};

export const loadComments = async (txId) => {
  const res = await fetch(`${API_HOST}/transaction/${txId}/comments`);
  const { users, comments } = await res.json();
  return { users, comments };
};

export const fetchFeed = async (cursor) => {
  const queryParam = cursor ? `?cursor=${cursor}` : "";
  const res = await fetch(`${API_HOST}/post-feed${queryParam}`);
  const json = await res.json();

  return json;
};

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

export function formatDate(unixtime) {
  var date = new Date(unixtime * 1000);
  return timeAgo.format(date, "twitter");
}

export const renderMarkdown = (content) => {
  return unified().use(parse).use(remark2react).processSync(content).contents;
};

const tags = {
  "App-Name": APP_NAME,
  "App-Version": APP_VERSION,
};

export async function generatePostTx(data, user) {
  const [tx, balance] = await Promise.all([
    createTransaction(data, tags, user.wallet),
    arweave.wallets.getBalance(user.address),
  ]);
  const balanceAfter = arweave.ar.sub(balance, tx.reward);

  return { tx, balance, balanceAfter, tags, data, user };
}

export const winstonToAr = (winston) => {
  return winston && arweave.ar.winstonToAr(winston) + " AR";
};
