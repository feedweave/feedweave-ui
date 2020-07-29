import React, { useState, useRef, useContext } from "react";

import { navigate } from "@reach/router";
import { arweave, fetchUser } from "../../util";

import Button from "../Button";
import { UserContext } from "../../util";

import styles from "./index.module.css";

function KeyUploader({ handleUser }) {
  const inputEl = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleUploadClick = (e) => {
    e.preventDefault();
    inputEl.current.click();
  };

  const handleFileInput = (e) => {
    e.preventDefault();

    const file = inputEl.current.files[0];
    handleFile(file);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const wallet = JSON.parse(reader.result);
        const address = await arweave.wallets.jwkToAddress(wallet);
        const { user: userInfo } = await fetchUser(address);
        const user = { wallet, address, userInfo };
        handleUser(user);
        navigate("/");
      } catch (error) {
        alert(error.toString());
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className={styles.keyUploaderContainer}>
      <div
        className={styles.dropArea}
        onClick={handleUploadClick}
        onDrop={handleFileDrop}
        onDragOver={handleDrag}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
      >
        <div className={styles.uploadText}>
          <div className={styles.uploadButton}>Upload</div>
          &nbsp;or Drag In
        </div>
        <div className={styles.fileNameExampleText}>
          arweave-keyfile-a1b2c3.json
        </div>
      </div>
      <div className={styles.uploaderDescription}>
        Don’t have a keyfile or Arweave wallet?{" "}
        <a
          href="https://www.arweave.org/wallet"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get one here.
        </a>
      </div>
      <input
        ref={inputEl}
        type="file"
        style={{ display: "none" }}
        accept="application/json"
        onChange={handleFileInput}
      />
    </div>
  );
}

function LoginWizard() {
  const [loginState, setLoginState] = useState("loggedOut");
  const { handleUser } = useContext(UserContext);

  const showKeyUpload = () => {
    setLoginState("uploadKey");
  };
  if (loginState === "loggedOut") {
    return <Button onClick={showKeyUpload}>Log in / Sign up</Button>;
  }

  if (loginState === "uploadKey") {
    return <KeyUploader handleUser={handleUser} />;
  }
}

export default LoginWizard;
