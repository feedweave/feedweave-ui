import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";

import { fetchPostFeed, fetchActivityFeed } from "../../util";
import ActivityFeed from "../../components/ActivityFeed";
import PostsToggle from "../../components/PostsToggle";

import styles from "./index.module.css";

function LoadMoreButton({ onClick }) {
  return (
    <Button className={styles.loadMoreButton} onClick={onClick}>
      Load more posts
    </Button>
  );
}

function Home() {
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
      setIsLoading(false);
    }

    fetchData();
  }, [currentCursor, feedType]);

  function loadMorePosts() {
    setCurrentCursor(nextCursor);
  }

  function toggleFeedType() {
    if (feedType === "posts") {
      setFeedType("all");
    } else {
      setFeedType("posts");
    }
    setFeedData({
      feed: { users: [], transactions: [] },
      nextCursor: null,
    });
    setCurrentCursor(null);
  }

  return (
    <div className={styles.container}>
      <div>
        <PostsToggle onClick={toggleFeedType} />
        {isLoading ? (
          "Loading..."
        ) : (
          <div>
            <ActivityFeed feed={feed} />
            {nextCursor ? <LoadMoreButton onClick={loadMorePosts} /> : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
