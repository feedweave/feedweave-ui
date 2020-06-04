import React from "react";
import { Link, navigate } from "@reach/router";

import styles from "./index.module.css";
import logo from "./feedweave-logo.png";

import { UserContext } from "../../util";

import LoginButton from "../LoginButton";
import UserIcon from "../UserIcon";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  static contextType = UserContext;

  handleLogout = () => {
    const { handleUser } = this.context;

    navigate("/");

    handleUser(null);
  };

  render() {
    const { user } = this.context;
    return (
      <div className={styles.container}>
        <div className={styles.logoParent}>
          <Link to="/">
            <div className={styles.logo}>
              <img src={logo} />
              <span>FeedWeave</span>
            </div>
          </Link>
          <span className={styles.subHeading}>Arweave publishing</span>
        </div>
        {user ? (
          <div className={styles.menu}>
            <div className={styles.activityMenu}>
              <div className={styles.menuItem}>
                <Link to="/">Activity on Arweave</Link>
              </div>
              <div className={styles.menuItem}>
                <Link to="/my-feed">Following</Link>
              </div>
            </div>

            <div className={styles.userMenu}>
              <div className={styles.menuItem}>
                <Link to={`/user/${user.address}`}>
                  Profile
                  <span className={styles.userName}>
                    &nbsp;@{user.userInfo.arweaveId}
                  </span>
                </Link>
              </div>
              <div className={styles.logOut} onClick={this.handleLogout}>
                Log out
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
          <div>
            <LoginButton />
          </div>
        )}
      </div>
    );
  }
}

export default Sidebar;
