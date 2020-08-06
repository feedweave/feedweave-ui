import React from "react";
import { Link } from "@reach/router";

import UserIcon from "../UserIcon";
import FollowButton from "../FollowButton";
import styles from "./index.module.css";
import { getUserName } from "../../util";

export default function ProfileHeader({ user, reloadUser }) {
  const { postCount, followerIds, followingIds, twitterId, id } = user;
  return (
    <div className={styles.container}>
      <div className={styles.upperRectangle}></div>
      <div className={styles.userInfo}>
        <div className={styles.avatarContainer}>
          <UserIcon size="44px" user={user} />
        </div>
        <div className={styles.userInfoText}>
          <div className={styles.username}>{getUserName(user)}</div>
          <div className={styles.addressTwitterFollow}>
            <div className={styles.addressTwitter}>
              <div className={styles.address}>
                <a href={`https://explorer.arweave.co/address/${id}`}>{id}</a>
              </div>
              {twitterId ? (
                <div className={styles.twitter}>
                  <a href={`https://twitter.com/${twitterId}`}>Twitter</a>
                </div>
              ) : null}
            </div>
            <FollowButton user={user} onSave={reloadUser} />
          </div>
        </div>
      </div>
      <div className={styles.navigation}>
        <Link className={styles.navigationButton} to={`/user/${id}`}>
          {postCount} Posts
        </Link>
        <Link className={styles.navigationButton} to={`/user/${id}/followers`}>
          {followerIds.length} Followers
        </Link>
        <Link className={styles.navigationButton} to={`/user/${id}/following`}>
          {followingIds.length} Following
        </Link>
      </div>
    </div>
  );
}
