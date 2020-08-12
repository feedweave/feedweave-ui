import React, { useState } from "react";

import Modal from "../Modal";
import FeatureComingSoon from "../FeatureComingSoon";

import styles from "./index.module.css";

function HeaderOptions({ tx, user, onClose }) {
  const [isShowingModal, setIsShowingModal] = useState(false);
  const showModificationButtons = user && tx.ownerAddress === user.address;
  const closeModal = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setIsShowingModal(false);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    onClose();
  };

  const comingSoonClick = () => {
    setIsShowingModal(true);
  };
  return (
    <div className={styles.container}>
      <div onClick={copyUrl} className={styles.option}>
        Copy Link
      </div>
      {showModificationButtons ? (
        <div>
          <div onClick={comingSoonClick} className={styles.option}>
            Edit Post
          </div>

          <div onClick={comingSoonClick} className={styles.option}>
            Unpublish
          </div>
        </div>
      ) : null}
      {isShowingModal ? (
        <Modal onClose={closeModal}>
          <FeatureComingSoon />
        </Modal>
      ) : null}
    </div>
  );
}

export default HeaderOptions;
