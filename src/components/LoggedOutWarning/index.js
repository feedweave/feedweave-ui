import React from "react";
import Button from "../Button";
import modalStyles from "../Onboarding/index.module.css";

function LoggedOutWarning({ onClose }) {
  return (
    <div className={modalStyles.container}>
      <div className={modalStyles.top}>
        <div className={modalStyles.heading}>Not Logged In</div>
        <div className={modalStyles.text}>
          <p>
            You must be logged in to post on FeedWeave. Log in using the menu.
          </p>
          <p>
            Don’t have a keyfile or Arweave wallet?{" "}
            <a
              href="https://www.arweave.org/wallet"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get one here.
            </a>
          </p>
        </div>
      </div>
      <div className={modalStyles.bottom}>
        <Button theme="secondary" onClick={onClose}>
          Close
        </Button>
        <div></div>
      </div>
    </div>
  );
}
export default LoggedOutWarning;
