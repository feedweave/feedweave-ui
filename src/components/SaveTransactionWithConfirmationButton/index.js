import React, { useState, useContext } from "react";
import {
  Button,
  Modal as OldModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import styles from "./index.module.css";

import {
  UserContext,
  arweave,
  createTransaction,
  publishTransaction,
  winstonToAr,
} from "../../util";

class SaveTransactionWithConfirmationButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isModalOpen: false,
      txData: null,
    };

    this.openModal = this.openModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  static contextType = UserContext;

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  async openModal() {
    const { user } = this.context;

    const { data, tags } = this.props;
    this.setState({ isLoading: true });
    const tx = await createTransaction(data, tags, user.wallet);
    const balance = await arweave.wallets.getBalance(user.address);
    const balanceAfter = arweave.ar.sub(balance, tx.reward);

    this.setState({
      isModalOpen: true,
      isLoading: false,
      txData: { tx, balance, balanceAfter },
    });
  }

  async handleSave() {
    const {
      txData: { tx },
    } = this.state;
    await publishTransaction(tx);
    this.toggleModal();

    this.props.onSave(tx);
  }

  renderModalBody() {
    const { user } = this.context;
    const { data, tags } = this.props;
    const {
      txData: { tx, balance, balanceAfter },
    } = this.state;

    const dataSize = new Blob([data]).size;
    return (
      <ModalBody className={styles.modalBody}>
        <div>
          <strong>ID</strong>: {tx.id}
        </div>
        <div>
          <strong>Data</strong>: {dataSize + " Bytes"}
        </div>
        <div>
          <strong>Tags</strong>:
          <div className={styles.tagList}>
            <code>
              {Object.keys(tags).map((key) => {
                return (
                  <div key={key}>
                    {key}: {tags[key]}
                  </div>
                );
              })}
            </code>
          </div>
        </div>
        <div>
          <strong>Price</strong>: {winstonToAr(tx.reward)}
        </div>
        <div>
          <strong>Wallet</strong>: {user.address}
        </div>
        <div>
          <strong>Current balance</strong>: {winstonToAr(balance)}
        </div>
        <div>
          <strong>Balance after</strong>: {winstonToAr(balanceAfter)}
        </div>
      </ModalBody>
    );
  }

  render() {
    const { buttonText, data, disabled, size } = this.props;
    const { isModalOpen, txData, isLoading } = this.state;
    return (
      <div className={styles.container}>
        <Button
          color="primary"
          size={size}
          onClick={this.openModal}
          disabled={disabled || isLoading || !!!data}
        >
          {isLoading ? "Loading..." : buttonText}
        </Button>
        <OldModal isOpen={isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            Confirm transaction
          </ModalHeader>
          {txData ? this.renderModalBody() : null}
          <ModalFooter>
            <Button color="primary" onClick={this.handleSave}>
              Submit
            </Button>{" "}
            <Button color="secondary" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </OldModal>
      </div>
    );
  }
}

export default SaveTransactionWithConfirmationButton;
