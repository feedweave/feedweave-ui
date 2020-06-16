import React from "react";

import Sidebar from "../../components/Sidebar";

import styles from "./index.module.css";

class Main extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <>
        <Sidebar />
        <div className={styles.contentContainer}>
          <div className={styles.content}>{children}</div>
        </div>
      </>
    );
  }
}

export default Main;
