import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";

import { fetchUserFeed, fetchUser } from "../../util";
import ActivityFeed from "../../components/ActivityFeed";
import ProfileHeader from "../../components/ProfileHeader";
import FollowList from "../../components/FollowList";

import styles from "./index.module.css";

const Index = ({ feed }) => {
  if (feed.length === 0) {
    return "No posts yet!";
  } else {
    return (
      <div className={styles.indexContainer}>
        <ActivityFeed feed={feed} />
      </div>
    );
  }
};

function User({ address }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [relatedUsers, setRelatedUsers] = useState([]);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const [feed, { user, relatedUsers }] = await Promise.all([
        fetchUserFeed(address),
        fetchUser(address),
      ]);

      setFeed(feed);
      setUser(user);
      setRelatedUsers(relatedUsers);

      setIsLoading(false);
    }

    fetchData();
  }, [address]);

  const reloadUser = async () => {
    const { user, relatedUsers } = await fetchUser(address);
    setUser(user);
    setRelatedUsers(relatedUsers);
  };

  return isLoading ? (
    "Loading..."
  ) : (
    <div className={styles.container}>
      <ProfileHeader user={user} reloadUser={reloadUser} />
      <Router primary={false}>
        <Index path="/" feed={feed} />
        <FollowList
          path="/following"
          displayIds={user.followingIds}
          allUsers={relatedUsers}
          reloadUser={reloadUser}
        />
        <FollowList
          path="/followers"
          displayIds={user.followerIds}
          allUsers={relatedUsers}
          reloadUser={reloadUser}
        />
      </Router>
    </div>
  );
}

export default User;
