import React, { useContext, useState } from "react";

import { Link } from "@reach/router";

import UserIcon from "../UserIcon";
import FollowButton from "../FollowButton";
import Button from "../Button";
import Modal from "../Modal";
import styles from "./index.module.css";
import { getUserName, UserContext } from "../../util";

import { SetupUsername, SetupTwitter } from "../Onboarding";

function OnboardingButtons({ user, onSave }) {
  const { arweaveId, twitterId } = user.userInfo;
  const [showWhichModal, setShowWhichModal] = useState(null);

  let ModalContent;

  if (showWhichModal === "name") {
    ModalContent = SetupUsername;
  } else if (showWhichModal === "twitter") {
    ModalContent = SetupTwitter;
  } else {
    ModalContent = null;
  }

  const handleSetupName = () => {
    setShowWhichModal("name");
  };

  const handleLinkTwitter = () => {
    setShowWhichModal("twitter");
  };

  const handleModalClose = () => {
    setShowWhichModal(null);
  };

  const handleModalSave = () => {
    setShowWhichModal(null);
    onSave();
  };

  return (
    <div className={styles.onboardingButtons}>
      {!arweaveId ? (
        <Button theme="greenFilled" onClick={handleSetupName}>
          Set Name
        </Button>
      ) : null}
      {!twitterId ? (
        <Button theme="greenFilled" onClick={handleLinkTwitter}>
          Link Twitter
        </Button>
      ) : null}
      {ModalContent ? (
        <Modal>
          <ModalContent
            user={user}
            onCancel={handleModalClose}
            onSave={handleModalSave}
          />
        </Modal>
      ) : null}
    </div>
  );
}

export default function ProfileHeader({ user, reloadUser }) {
  const { postCount, followerIds, followingIds, twitterId, id } = user;
  const { user: loggedInUser, reloadUser: reloadLoggedInUser } = useContext(
    UserContext
  );
  const showOnboardingButtons = loggedInUser && loggedInUser.address === id;

  const onOnboardingSave = () => {
    reloadUser();
    reloadLoggedInUser();
  };
  return (
    <div className={styles.container}>
      <div className={styles.upperRectangle}></div>
      <div className={styles.userInfo}>
        <div></div>
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
            {showOnboardingButtons ? (
              <OnboardingButtons
                user={loggedInUser}
                onSave={onOnboardingSave}
              />
            ) : null}
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
