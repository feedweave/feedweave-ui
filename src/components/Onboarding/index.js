import React, { useState, useEffect } from "react";
import classnames from "classnames";

import UserIcon from "../UserIcon";
import Button from "../Button";
import { PostButtonWrapper } from "../PostButton";

import { fetchUserByArweaveID, useDebounce, getUserName } from "../../util";

import styles from "./index.module.css";

const arweaveIdTags = {
  "App-Name": "arweave-id",
  "App-Version": "0.0.1",
  Type: "name",
};

const twitterTags = {
  "App-Name": "identity-link",
  "App-Version": "0.0.1",
  Provider: "twitter",
};

function postToTwitter(address) {
  const msg = `I am verifying myself on @FEEDweave_! My Arweave address is ${address}`;
  window.open(
    `https://twitter.com/intent/tweet?text=${msg}`,
    "mywin",
    "left=20,top=20,width=500,height=448,toolbar=1,resizable=0"
  );
}

const tagsWithTime = () => {
  return { ...arweaveIdTags, "Unix-Time": Math.floor(Date.now() / 1000) };
};

export function ConfirmTx() {
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

function TwitterProof({ user, twitterHandle }) {
  const avatarUrl = `https://unavatar.now.sh/twitter/${twitterHandle}`;
  return (
    <div className={styles.twitterProofContainer}>
      <img
        style={{
          width: 44,
          height: 44,
          borderRadius: parseInt(44, 10) / 2,
        }}
        alt="avatar"
        src={avatarUrl}
      />
      <div className={styles.userInfo}>
        <div className={styles.userName}>{getUserName(user.userInfo)}</div>
        <div className={styles.userAddress}>{user.address}</div>
      </div>
    </div>
  );
}

function TwitterHandleInput({ user, value, onChange }) {
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

          <input
            type="text"
            placeholder="yourname"
            value={value}
            onChange={onChange}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}

function LinkTwitterTop() {
  return (
    <>
      <div className={styles.heading}>Link Twitter</div>
      <div className={styles.text}>
        Linking Twitter syncs your avatar and verifies your identity, so people
        know who you are.
        <ol>
          <li>Post a tweet with your Arweave address.</li>
          <li>Submit an Arweave transaction with your Twitter handle.</li>
        </ol>
      </div>
    </>
  );
}

export function SetupTwitter({ user, onSave, onCancel }) {
  const [flowStep, setFlowStep] = useState("postToTwitter");
  const [twitterHandle, setTwitterHandle] = useState("");

  const onTwitterHandleChange = (event) => {
    setTwitterHandle(event.target.value);
  };

  const handlePostToTwitter = () => {
    postToTwitter(user.address);
    setFlowStep("submitProof");
  };

  let top;
  let middle;
  let button;

  if (flowStep === "postToTwitter") {
    top = <LinkTwitterTop />;
    middle = (
      <TwitterHandleInput
        user={user}
        onChange={onTwitterHandleChange}
        value={twitterHandle}
      />
    );
    button = <Button onClick={handlePostToTwitter}>Post to Twitter</Button>;
  }

  if (flowStep === "submitProof") {
    top = <LinkTwitterTop />;
    middle = <TwitterProof user={user} twitterHandle={twitterHandle} />;
    button = (
      <PostButtonWrapper
        data={twitterHandle}
        tags={twitterTags}
        onSave={onSave}
      >
        <Button>Submit Proof of Identity</Button>
      </PostButtonWrapper>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>{top}</div>
      <div className={styles.middle}>{middle}</div>
      <div className={styles.bottom}>
        <Button theme="secondary" onClick={onCancel}>
          Set up later
        </Button>
        {button}
      </div>
    </div>
  );
}

export function SetupUsername({ user, onSave, onCancel }) {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isNameTaken, setIsNameTaken] = useState(false);
  const debouncedUsername = useDebounce(username, 300);

  const onUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  useEffect(() => {
    async function fetchData() {
      if (!debouncedUsername || debouncedUsername === "") {
        return;
      }
      setIsNameTaken(false);
      setIsLoading(true);
      try {
        const user = await fetchUserByArweaveID(debouncedUsername);

        if (user) {
          setIsNameTaken(true);
        }
      } catch (e) {
        //TODO handle error
      }
      setIsLoading(false);
    }

    fetchData();
  }, [debouncedUsername]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.heading}>Welcome to FeedWeave!</div>
        <div className={styles.text}>
          <p>Set up your human-readable username.</p>
        </div>
      </div>
      <div className={styles.middle}>
        <UserIcon size={44} user={user} />
        <div className={styles.userInfo}>
          <div className={styles.userNameInput}>
            <div>@</div>
            <input
              placeholder="username"
              autoFocus
              value={username}
              onChange={onUsernameChange}
            />
          </div>
          <div className={styles.addressAndButtonContainer}>
            <div className={styles.userAddress}>{user.address}</div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <Button theme="secondary" onClick={onCancel}>
          Set up later
        </Button>
        <div className={styles.buttonWithError}>
          {isNameTaken ? (
            <div className={styles.error}>That name is already taken.</div>
          ) : null}

          <PostButtonWrapper
            data={username}
            tags={tagsWithTime()}
            onSave={onSave}
          >
            <Button isDisabled={isNameTaken} isLoading={isLoading}>
              Set Username
            </Button>
          </PostButtonWrapper>
        </div>
      </div>
    </div>
  );
}

export function FirstTimeOnboarding({ user, reloadUser, onSave, onCancel }) {
  const [onboardingStep, setOnboardingStep] = useState("name");

  const onUsernameSave = () => {
    setOnboardingStep("twitter");
    reloadUser();
  };

  const onTwitterSave = () => {
    reloadUser();
    onSave();
  };

  if (onboardingStep === "name") {
    return (
      <SetupUsername user={user} onSave={onUsernameSave} onCancel={onCancel} />
    );
  } else if (onboardingStep === "twitter") {
    return (
      <SetupTwitter user={user} onSave={onTwitterSave} onCancel={onCancel} />
    );
  }
}
