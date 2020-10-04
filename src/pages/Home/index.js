import React, { useState, useEffect } from "react";

import { fetchPostFeed, fetchActivityFeed } from "../../util";
import ActivityFeed from "../../components/ActivityFeed";
import PostsToggle from "../../components/PostsToggle";
import Button from "../../components/Button";

import { HomeMetaTags } from "../../components/MetaTags";
import LoadingSpinner from "../../components/LoadingSpinner";

import styles from "./index.module.css";

function LoadMoreButton({ onClick, isLoading }) {
  return (
    <div className={styles.loadMoreButtonContainer}>
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <LoadingSpinner />
        </div>
      ) : (
        <Button onClick={onClick}>Load more posts</Button>
      )}
    </div>
  );
}

function Home() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCursor, setCurrentCursor] = useState(null);
  const [feedType, setFeedType] = useState("posts");
  const [feedData, setFeedData] = useState({
    feed: { users: [], transactions: [] },
    nextCursor: null,
  });
  const { feed, nextCursor } = feedData;

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      let json;
      if (feedType === "posts") {
        json = await fetchPostFeed(currentCursor);
      } else {
        json = await fetchActivityFeed(currentCursor);
      }
      const {
        nextCursor,
        transactions: newTransactions,
        users: newUsers,
      } = json;
      const mergedUsers = feed.users.concat(newUsers);
      const mergedTransactions = feed.transactions.concat(newTransactions);
      setFeedData({
        feed: { users: mergedUsers, transactions: mergedTransactions },
        nextCursor,
      });
      setIsInitialLoading(false);
      setIsLoading(false);
    }

    fetchData();
  }, [currentCursor, feedType]);

  function loadMorePosts() {
    setCurrentCursor(nextCursor);
  }

  function typeChanged(type) {
    if (feedType === type) {
      return;
    }
    setFeedType(type);
    setFeedData({
      feed: { users: [], transactions: [] },
      nextCursor: null,
    });
    setCurrentCursor(null);
    setIsInitialLoading(true);
  }

  return (
    <div className={styles.container}>
      <HomeMetaTags />
      <div>
        <div className={styles.toggleContainer}>
          <PostsToggle onToggle={typeChanged} />
        </div>
        {isInitialLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <ActivityFeed feed={feed} />
            {nextCursor ? (
              <LoadMoreButton onClick={loadMorePosts} isLoading={isLoading} />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
