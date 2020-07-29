import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";

import { fetchUserFeed, fetchUser } from "../../util";
import ActivityFeed from "../../components/ActivityFeed";
import ProfileHeader from "../../components/ProfileHeader";
import FollowList from "../../components/FollowList";
import EmptyState from "../../components/EmptyState";
import LoadingSpinner from "../../components/LoadingSpinner";

import styles from "./index.module.css";

const Index = ({ feed }) => {
  const { transactions } = feed;
  return transactions.length === 0 ? (
    <EmptyState>This user hasn't made any posts yet.</EmptyState>
  ) : (
    <ActivityFeed feed={feed} />
  );
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

  const followingEmptyElement = (
    <EmptyState>This user isn't following anyone yet.</EmptyState>
  );
  const followersEmptyElement = (
    <EmptyState>This user isn't followed by anyone yet.</EmptyState>
  );
  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className={styles.container}>
      <ProfileHeader user={user} reloadUser={reloadUser} />
      <div className={styles.routeContainer}>
        <Router primary={false}>
          <Index path="/" feed={feed} />
          <FollowList
            path="/following"
            displayIds={user.followingIds}
            allUsers={relatedUsers}
            reloadUser={reloadUser}
            emptyElement={followingEmptyElement}
          />
          <FollowList
            path="/followers"
            displayIds={user.followerIds}
            allUsers={relatedUsers}
            reloadUser={reloadUser}
            emptyElement={followersEmptyElement}
          />
        </Router>
      </div>
    </div>
  );
}

export default User;
