import React, { useState, useRef, useEffect } from "react";
import classnames from "classnames";

import UserIcon from "../UserIcon";
import Button from "../Button";

import styles from "./index.module.css";

function ConfirmTx() {
  return (
    <div className={styles.confirmTxContainer}>
      <div className={styles.heading}>Submit Proof of Identity</div>
      <div className={styles.txData}>
        <div className={styles.dataRow}>
          <div className={styles.dataKey}>ID:</div>
          <div className={styles.dataValue}>
            ee_QpxI1IhwYZN4SAw2HuUuPCRE9XwPpM7PCcZU3fhM
          </div>
        </div>
        <div className={styles.dataRow}>
          <div className={styles.dataKey}>Data:</div>
          <div className={styles.dataValue}>152 Bytes</div>
        </div>
        <div className={styles.dataRow}>
          <div className={styles.dataKey}>Wallet:</div>
          <div className={styles.dataValue}>
            BhWx_AdInMBYr7Ouq5mQhPii_Eslq8Qb7_4uBAGOX0U
          </div>
        </div>
        <div className={styles.dataRow}>
          <div className={styles.dataKey}>Price:</div>
          <div className={styles.dataValue}>0.000006330106 AR</div>
        </div>
        <div className={styles.dataRow}>
          <div className={styles.dataKey}>Balance:</div>
          <div className={styles.dataValue}>0.998887991367 AR</div>
        </div>
      </div>
    </div>
  );
}

function TwitterProof({ user }) {
  return (
    <div className={styles.twitterProofContainer}>
      <UserIcon size={44} user={user} />
      <div className={styles.userInfo}>
        <div className={styles.userName}>@username</div>
        <div className={styles.userAddress}>
          vvSAIicpLpJAvcub5QF4xm1QmTY3_RrdZM3g3BN
        </div>
      </div>
    </div>
  );
}

function TwitterHandleInput({ user }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <div className={styles.inputContainer}>
        <div className={styles.inputHeading}>Arweave Address</div>
        <div className={styles.input}>
          <input type="text" placeholder={user.address} disabled />
        </div>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputHeading}>Twitter Username</div>
        <div className={classnames(styles.input, styles.twitterInput)}>
          <div className={styles.atPrefix}>@</div>

          <input type="text" ref={inputRef} placeholder="yourname" />
        </div>
      </div>
    </div>
  );
}

function LinkTwitterTop() {
  return (
    <>
      <div className={styles.heading}>Link Twitter Account</div>
      <div className={styles.text}>
        Linking your Twitter account displays your avatar and verifies your
        identity, so people know who you are.
        <ol>
          <li>Post a tweet with your Arweave address.</li>
          <li>Submit an Arweave transaction with your Twitter handle.</li>
        </ol>
      </div>
    </>
  );
}

function LinkTwitter({ user }) {
  const [flowStep, setFlowStep] = useState("postToTwitter");

  const handlePostToTwitter = () => {
    setFlowStep("submitProof");
  };

  const handleSubmitProof = () => {
    setFlowStep("confirmTx");
  };

  const handleConfirmTx = () => {};

  const handleBack = () => {
    setFlowStep("submitProof");
  };

  let top;
  let middle;
  let button;

  if (flowStep === "postToTwitter") {
    top = <LinkTwitterTop />;
    middle = <TwitterHandleInput user={user} />;
    button = <Button onClick={handlePostToTwitter}>Post to Twitter</Button>;
  }

  if (flowStep === "submitProof") {
    top = <LinkTwitterTop />;
    middle = <TwitterProof user={user} />;
    button = (
      <Button onClick={handleSubmitProof}>Submit Proof of Identity</Button>
    );
  }

  if (flowStep === "confirmTx") {
    top = <ConfirmTx />;
    button = (
      <Button onClick={handleConfirmTx}>Submit Proof of Identity</Button>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>{top}</div>
      <div className={styles.middle}>{middle}</div>
      <div className={styles.bottom}>
        <div></div>
        {button}
      </div>
    </div>
  );
}
function ConfirmID({ id, transaction }) {}

function Welcome({ user }) {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.heading}>Welcome to FeedWeave!</div>
        <div className={styles.text}>
          Set your username and link Twitter to confirm your identity and set
          your profile photo.
        </div>
      </div>
      <div className={styles.middle}>
        <UserIcon size={44} user={user} />
        <div className={styles.userInfo}>
          <div className={styles.userName}>@username</div>
          <div className={styles.addressAndButtonContainer}>
            <div className={styles.userAddress}>
              vvSAIicpLpJAvcub5QF4xm1QmTY3_RrdZM3g3BN
            </div>
            <Button theme="gray">Link Twitter</Button>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.uploadKeyfile}>Upload a different keyfile</div>
        <div className={styles.finishSetup}>Finish Profile Setup</div>
      </div>
    </div>
  );
}

export default LinkTwitter;
