import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

import { navigate } from "@reach/router";
import { arweave, getUserInfo } from "../../util";

import { UserContext } from "../../util";

import styles from "./index.module.css";

class LoginButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isModalOpen: false };

    this.inputFileRef = React.createRef();
    this.handleUploadClick = this.handleUploadClick.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  static contextType = UserContext;

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  async openModal() {
    this.setState({
      isModalOpen: true,
    });
  }

  handleUploadClick = (e) => {
    e.preventDefault();
    this.inputFileRef.current.click();
  };

  handleFileChange = (e) => {
    e.preventDefault();

    const file = this.inputFileRef.current.files[0];
    const reader = new FileReader();

    const { handleUser } = this.context;

    reader.onload = async () => {
      try {
        const wallet = JSON.parse(reader.result);
        const address = await arweave.wallets.jwkToAddress(wallet);
        const { user: userInfo } = await getUserInfo(address).then((res) =>
          res.json()
        );
        handleUser({ wallet, address, userInfo });
        this.toggleModal();
        navigate("/following");
      } catch (error) {
        alert(error.toString());
      }
    };
    reader.readAsText(file);
  };

  render() {
    const { isModalOpen } = this.state;
    return (
      <div>
        <Button color="link" onClick={this.openModal}>
          Log in/Sign up
        </Button>
        <Modal isOpen={isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Log in</ModalHeader>
          <ModalBody>
            <div className={styles.dropArea} onClick={this.handleUploadClick}>
              <div>
                <Button className={styles.dropAreaLink} color="link">
                  Upload
                </Button>{" "}
                an Arweave keyfile to log in.
              </div>
            </div>
            <div className={styles.getWalletCopy}>
              Don't have a wallet? Get one{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://tokens.arweave.org/"
              >
                here
              </a>
              !
            </div>
            <div className={styles.instructions}>
              FEEDweave is built on the{" "}
              <a href="https://arweave.org">Arweave </a> blockchain and uses
              cryptographic keys for identity and authentication.
            </div>
          </ModalBody>
        </Modal>
        <input
          ref={this.inputFileRef}
          type="file"
          style={{ display: "none" }}
          accept="application/json"
          onChange={this.handleFileChange}
        />
      </div>
    );
  }
}

export default LoginButton;
