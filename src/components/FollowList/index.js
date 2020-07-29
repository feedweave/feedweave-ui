import React from "react";
import { Link } from "@reach/router";
import UserIcon from "../UserIcon";
import FollowButton from "../FollowButton";

import styles from "./index.module.css";

export default function FollowList({ displayIds, allUsers, reloadUser }) {
  return (
    <div className={styles.container}>
      {displayIds.map((id) => {
        const user = allUsers.find((user) => user.id === id) || {};
        const displayName = (user.arweaveId && `@${user.arweaveId}`) || id;

        return (
          <div key={id} className={styles.listItem}>
            <Link className={styles.iconAndName} to={`/user/${id}`}>
              <UserIcon size={"22px"} user={user} />
              <div className={styles.username}>{displayName}</div>
            </Link>
            <FollowButton user={user} onSave={reloadUser} />
          </div>
        );
      })}
    </div>
  );
}
