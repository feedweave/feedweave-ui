import React, { useState, useEffect, useContext } from "react";
import { Router } from "@reach/router";

import { fetchUserFeed, fetchUser, UserContext } from "../../util";
import ActivityFeed from "../../components/ActivityFeed";
import ProfileHeader from "../../components/ProfileHeader";
import FollowList from "../../components/FollowList";
import EmptyState from "../../components/EmptyState";
import LoadingSpinner from "../../components/LoadingSpinner";

import { UserMetaTags } from "../../components/MetaTags";

import styles from "./index.module.css";

const Index = ({ feed, isLoggedInUser }) => {
  const { transactions } = feed;
  const messagePrefix = isLoggedInUser ? "You haven't" : "This user hasn't";
  return transactions.length === 0 ? (
    <EmptyState>{messagePrefix} made any posts yet.</EmptyState>
  ) : (
    <ActivityFeed feed={feed} />
  );
};

function User({ address }) {
  const { user: loggedInUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [relatedUsers, setRelatedUsers] = useState([]);
  const [feed, setFeed] = useState([]);

  const isLoggedInUser = loggedInUser && loggedInUser.address === user.id;

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

  const messagePrefix = isLoggedInUser ? "You aren't" : "This user isn't";

  const followingEmptyElement = (
    <EmptyState>{messagePrefix} following anyone yet.</EmptyState>
  );
  const followersEmptyElement = (
    <EmptyState>{messagePrefix} followed by anyone yet.</EmptyState>
  );
  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className={styles.container}>
      <UserMetaTags user={user} />
      <ProfileHeader user={user} reloadUser={reloadUser} />
      <div className={styles.routeContainer}>
        <Router primary={false}>
          <Index path="/" feed={feed} isLoggedInUser={isLoggedInUser} />
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
