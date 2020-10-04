import React from "react";
import Button from "../Button";
import modalStyles from "../Onboarding/index.module.css";

function FeatureComingSoon({ onClose }) {
  return (
    <div className={modalStyles.container}>
      <div className={modalStyles.top}>
        <div className={modalStyles.heading}>Feature coming soon</div>
        <div className={modalStyles.text}>
          <p>This functionality is currently being implemented!</p>
          <p>
            Follow the progress on{" "}
            <a
              href="https://github.com/feedweave/feedweave-dev/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            , or post about it on FeedWeave if you want it sooner! 🐜
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
export default FeatureComingSoon;
