import React, { useContext, useState, useEffect } from "react";
import { Link, navigate } from "@reach/router";

import styles from "./index.module.css";
import logo from "./feedweave-logo.png";

import { UserContext, getUserName } from "../../util";

import LoginButton from "../LoginButton";

import Modal from "../Modal";
import { FirstTimeOnboarding } from "../Onboarding";

function Sidebar() {
  const { user, handleUser, declineOnboarding, reloadUser } = useContext(
    UserContext
  );
  const declinedOnboarding =
    window.localStorage.getItem("declinedOnboarding") === "yes";
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    setShowOnboarding(
      !declinedOnboarding && !!user && !user.userInfo.arweaveId
    );
  }, [user, declinedOnboarding]);

  const handleLogout = () => {
    navigate("/");

    handleUser(null);
    window.localStorage.setItem("declinedOnboarding", "");
  };

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
  };

  const handleCancelOnboarding = () => {
    declineOnboarding();
    setShowOnboarding(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoParent}>
        <Link to="/">
          <div className={styles.logo}>
            <img alt="feedweave logo" src={logo} />
            <span>FeedWeave</span>
          </div>
        </Link>
      </div>
      {user ? (
        <div className={styles.menu}>
          <div className={styles.activityMenu}>
            <div className={styles.menuItem}>
              <Link to="/">Activity on Arweave</Link>
            </div>
            <div className={styles.menuItem}>
              <Link to="/following">Following</Link>
            </div>
          </div>

          <div className={styles.userMenu}>
            <div className={styles.menuItem}>
              <Link to={`/user/${user.address}`}>
                Profile
                <span className={styles.userName}>
                  &nbsp;{getUserName(user.userInfo)}
                </span>
              </Link>
            </div>
            <div className={styles.menuItem}>
              <a className={styles.logOut} onClick={handleLogout}>
                Log out
              </a>
            </div>
          </div>
          <div className={styles.newPost}>
            <div className={styles.menuItem}>
              <Link to="/new-post">New Post</Link>
            </div>
          </div>
          <div></div>
        </div>
      ) : (
        <div className={styles.loginContainer}>
          <LoginButton />
        </div>
      )}
      {showOnboarding ? (
        <Modal>
          <FirstTimeOnboarding
            user={user}
            reloadUser={reloadUser}
            onSave={handleCloseOnboarding}
            onCancel={handleCancelOnboarding}
          />{" "}
        </Modal>
      ) : null}
    </div>
  );
}

export default Sidebar;
