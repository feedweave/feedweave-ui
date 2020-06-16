import React from "react";
import { Link } from "@reach/router";

import UserIcon from "../UserIcon";
import styles from "./index.module.css";

export function FollowButton() {
  return <div className={styles.followButton}>Follow</div>;
}

export default function ProfileHeader({
  username,
  user,
  walletAddress,
  twitterHandle,
  postsCount,
  followersCount,
  followingCount,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.upperRectangle}></div>
      <div className={styles.userInfo}>
        <div className={styles.avatarContainer}>
          <UserIcon size="44px" user={user} />
        </div>
        <div className={styles.userInfoText}>
          <div className={styles.username}>{username}</div>
          <div className={styles.addressTwitterFollow}>
            <div className={styles.addressTwitter}>
              <div className={styles.address}>
                <a
                  href={`https://explorer.arweave.co/address/${walletAddress}`}
                >
                  {walletAddress}
                </a>
              </div>
              {twitterHandle ? (
                <div className={styles.twitter}>
                  <a href={`https://twitter.com/${twitterHandle}`}>Twitter</a>
                </div>
              ) : null}
            </div>
            <FollowButton />
          </div>
        </div>
      </div>
      <div className={styles.navigation}>
        <Link className={styles.navigationButton} to={`/user/${walletAddress}`}>
          {postsCount} Posts
        </Link>
        <Link
          className={styles.navigationButton}
          to={`/user/${walletAddress}/followers`}
        >
          {followersCount} Followers
        </Link>
        <Link
          className={styles.navigationButton}
          to={`/user/${walletAddress}/following`}
        >
          {followingCount} Following
        </Link>
      </div>
    </div>
  );
}
