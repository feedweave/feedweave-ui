import React, { useState, useContext } from "react";

import Button from "../Button";
import { PostButtonWrapper } from "../PostButton";
import { UserContext } from "../../util";

import {
  SOCIAL_GRAPH_APP_NAME,
  SOCIAL_GRAPH_APP_VERSION,
  APP_NAME,
} from "../../util";

const generateTags = (action) => {
  return {
    "App-Name": SOCIAL_GRAPH_APP_NAME,
    "App-Version": SOCIAL_GRAPH_APP_VERSION,
    Action: action,
    "App-Filter": APP_NAME,
  };
};

export function FollowButton({ user: userToFollow, onSave = () => {} }) {
  const { user: loggedInUser, reloadUser } = useContext(UserContext);
  const loggedInUserInfo = (loggedInUser && loggedInUser.userInfo) || {};
  const followingIds = loggedInUserInfo.followingIds || [];
  const [isFollowing, setIsFollowing] = useState(
    followingIds.indexOf(userToFollow.id) > -1
  );
  if (userToFollow.id === loggedInUserInfo.id) {
    return null;
  }
  if (!loggedInUser) {
    return <Button theme="greenFilled">Follow</Button>;
  }
  const action = isFollowing ? "unfollow" : "follow";
  const tags = generateTags(action);

  const internalOnSave = async () => {
    if (action === "follow") {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
    reloadUser();
    onSave();
  };

  if (isFollowing) {
    return (
      <PostButtonWrapper
        data={userToFollow.id}
        tags={tags}
        onSave={internalOnSave}
      >
        <Button theme="grayFilled">Following</Button>
      </PostButtonWrapper>
    );
  } else {
    return (
      <PostButtonWrapper
        data={userToFollow.id}
        tags={tags}
        onSave={internalOnSave}
      >
        <Button theme="greenFilled">Follow</Button>
      </PostButtonWrapper>
    );
  }
}

export default FollowButton;
