import React, { useState, useContext, useEffect } from "react";

import confirmStyles from "../Onboarding/index.module.css";

import {
  UserContext,
  generatePostTx,
  publishTransaction,
  winstonToAr,
} from "../../util";

import Modal, { ModalBody } from "../Modal";
import Button from "../Button";
import LoggedOutWarning from "../LoggedOutWarning";

function Tags({ tags }) {
  return Object.keys(tags).map((k) => (
    <div key={k}>
      {k}: {tags[k]}
    </div>
  ));
}

function ConfirmTx({ txData }) {
  const { tx, balance, data, user, tags } = txData;

  const dataSize = new Blob([data]).size;

  return (
    <div className={confirmStyles.confirmTxContainer}>
      <div className={confirmStyles.heading}>Submit transaction</div>
      <div className={confirmStyles.txData}>
        <div className={confirmStyles.dataRow}>
          <div className={confirmStyles.dataKey}>ID:</div>
          <div className={confirmStyles.dataValue}>{tx.id}</div>
        </div>
        <div className={confirmStyles.dataRow}>
          <div className={confirmStyles.dataKey}>Wallet:</div>
          <div className={confirmStyles.dataValue}>{user.address}</div>
        </div>
        <div className={confirmStyles.dataRow}>
          <div className={confirmStyles.dataKey}>Tags:</div>
          <div className={confirmStyles.dataTags}>
            <Tags tags={tags} />
          </div>
        </div>
        <div className={confirmStyles.dataRow}>
          <div className={confirmStyles.dataKey}>Size:</div>
          <div className={confirmStyles.dataValue}>{`${dataSize}  Bytes`}</div>
        </div>
        <div className={confirmStyles.dataRow}>
          <div className={confirmStyles.dataKey}>Price:</div>
          <div className={confirmStyles.dataValue}>
            {winstonToAr(tx.reward)}
          </div>
        </div>
        <div className={confirmStyles.dataRow}>
          <div className={confirmStyles.dataKey}>Balance:</div>
          <div className={confirmStyles.dataValue}>{winstonToAr(balance)}</div>
        </div>
      </div>
    </div>
  );
}

function ConfirmTxModal({ txData, onClose, onSave, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const { tx } = txData;

  const handleConfirmTx = async () => {
    setIsLoading(true);
    await publishTransaction(tx);
    setIsLoading(false);
    onSave();
  };

  const top = <ConfirmTx txData={txData} />;

  const bottom = (
    <>
      <div></div>
      <Button onClick={handleConfirmTx} isLoading={isLoading}>
        Confirm Transaction
      </Button>
    </>
  );

  return (
    <Modal initialShow={true} {...props}>
      <ModalBody top={top} bottom={bottom} />
    </Modal>
  );
}

function PostButton({
  data,
  tags,
  onSave,
  buttonText = "Publish to Arweave",
  children,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [tx, setTx] = useState(null);
  const { user } = useContext(UserContext);

  const handleClick = async () => {
    setIsLoading(true);
    const tx = await generatePostTx(data, tags, user);
    setTx(tx);
    setIsLoading(false);
  };

  return (
    <>
      <Button isLoading={isLoading} onClick={handleClick}>
        {children ? children : buttonText}
      </Button>
      {tx ? (
        <ConfirmTxModal
          txData={tx}
          onSave={onSave}
          onClose={() => setTx(null)}
        />
      ) : null}
    </>
  );
}

function GeneratingTxInner({ onCancel }) {
  const top = (
    <div className={confirmStyles.confirmTxContainer}>
      <div className={confirmStyles.heading}>Submit transaction</div>
      <div className={confirmStyles.loadingIndicator}>
        Generating transaction...
      </div>
      <div className={confirmStyles.txData}> </div>
    </div>
  );
  const bottom = (
    <>
      <Button theme="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <Button isLoading={true}>Confirm Transaction</Button>
    </>
  );

  return <ModalBody top={top} bottom={bottom} />;
}

function ConfirmTxInner({ txData, onSave, onCancel }) {
  const [isLoading, setIsLoading] = useState(false);
  const { tx } = txData;

  const handleConfirmTx = async () => {
    setIsLoading(true);
    await publishTransaction(tx);
    setIsLoading(false);
    onSave(tx);
  };

  const top = <ConfirmTx txData={txData} />;

  const bottom = (
    <>
      <Button theme="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <Button isLoading={isLoading} onClick={handleConfirmTx}>
        Confirm Transaction
      </Button>
    </>
  );
  return <ModalBody top={top} bottom={bottom} />;
}

function GenerateAndConfirmTx({ data, tags, onSave, onCancel }) {
  const [txData, setTxData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function generateTx() {
      setIsLoading(true);
      const txData = await generatePostTx(data, tags, user);
      setTxData(txData);
      setIsLoading(false);
    }

    generateTx();
  }, [data, tags, user]);

  return isLoading ? (
    <GeneratingTxInner onCancel={onCancel} />
  ) : (
    <ConfirmTxInner txData={txData} onSave={onSave} onCancel={onCancel} />
  );
}

export function PostButtonWrapper({ data, tags, onSave, children }) {
  const { user } = useContext(UserContext);
  const [isShowingModal, setIsShowingModal] = useState(false);
  const onClose = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setIsShowingModal(false);
  };

  const onInternalSave = (tx) => {
    onClose();
    onSave(tx);
  };

  const onClick = () => {
    setIsShowingModal(true);
  };

  const modalContents = user ? (
    <GenerateAndConfirmTx
      data={data}
      tags={tags}
      onSave={onInternalSave}
      onCancel={onClose}
    />
  ) : (
    <LoggedOutWarning onClose={onClose} />
  );

  return (
    <div onClick={onClick}>
      {children}
      {isShowingModal ? <Modal onClose={onClose}>{modalContents}</Modal> : null}
    </div>
  );
}

export default PostButton;
