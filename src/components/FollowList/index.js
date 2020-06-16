import React from "react";
import { Link } from "@reach/router";
import UserIcon from "../../components/UserIcon";
import { FollowButton } from "../../components/ProfileHeader";

import styles from "./index.module.css";

export default function FollowList({ displayIds, allUsers }) {
  return (
    <div className={styles.container}>
      {displayIds.map((id) => {
        const user = allUsers.find((user) => user.id === id) || {};
        const displayName = (user.arweaveId && `@${user.arweaveId}`) || id;

        return (
          <div className={styles.listItem}>
            <div className={styles.iconAndName}>
              <UserIcon size={"22px"} user={user} />
              <Link className={styles.username} to={`/user/${id}`}>
                {displayName}
              </Link>
            </div>
            <FollowButton />
          </div>
        );
      })}
    </div>
  );
}
