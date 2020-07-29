import React from "react";
import Arweave from "arweave/web";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

import unified from "unified";
import parse from "remark-parse";
import remark2react from "remark-react";

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;
const API_PORT = process.env.REACT_APP_API_PORT;

const API_PROTOCOL = process.env.REACT_APP_API_PROTOCOL;

export const API_HOST = process.env.REACT_APP_API_HOST;

export const arweave = Arweave.init({
  host: API_DOMAIN,
  port: API_PORT,
  protocol: API_PROTOCOL,
});

export const APP_NAME = process.env.REACT_APP_APP_NAME;

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

export const fetchUser = async (address) => {
  const response = await fetch(`${API_HOST}/arweave-social/user/${address}`);
  const data = await response.json();
  return data;
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

export const fetchPostFeed = async (cursor) => {
  const queryParam = cursor ? `?cursor=${cursor}` : "";
  const res = await fetch(`${API_HOST}/post-feed${queryParam}`);
  const json = await res.json();

  return json;
};

export const fetchActivityFeed = async (cursor) => {
  const queryParam = cursor ? `?cursor=${cursor}` : "";
  const res = await fetch(`${API_HOST}/activity-feed${queryParam}`);
  const json = await res.json();

  return json;
};

export const fetchUserFeed = async (address) => {
  const response = await fetch(
    `${API_HOST}/transactions?app-name=${APP_NAME}&wallet-id=${address}`
  );
  const data = await response.json();
  return data;
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

export async function generatePostTx(data, tags, user) {
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

export function getUserName(user) {
  const { id: userId, arweaveId } = user;
  return arweaveId ? `@${arweaveId}` : userId.substr(0, 8) + "...";
}

export function truncateHash(hash) {
  return hash.substr(0, 9) + "...";
}
