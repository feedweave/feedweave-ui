import React from "react";

import placeholderIcon from "./placeholder-icon.png";

export default function UserIcon({ size, user }) {
  const { twitterId } = user;
  const avatarUrl = twitterId
    ? `https://unavatar.now.sh/twitter/${twitterId}`
    : placeholderIcon;
  return (
    <img
      style={{
        width: size,
        height: size,
        borderRadius: parseInt(size, 10) / 2,
      }}
      alt="avatar"
      src={avatarUrl}
    />
  );
}
