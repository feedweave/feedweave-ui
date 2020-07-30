import React from "react";

import styles from "./index.module.css";

function HeaderOptions() {
  return (
    <div className={styles.container}>
      <div>Copy Link</div>
      <div>Edit Post</div>
      <div>Unpublish</div>
    </div>
  );
}

export default HeaderOptions;
