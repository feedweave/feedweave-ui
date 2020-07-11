import React, { useState, useContext } from "react";

import confirmStyles from "../Onboarding/index.module.css";

import {
  UserContext,
  generatePostTx,
  publishTransaction,
  winstonToAr,
} from "../../util";

import Modal, { ModalBody } from "../Modal";
import Button from "../Button";

function ConfirmTxModal({ txData, onClose, onSave, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const { tx, balance, data, user } = txData;

  const dataSize = new Blob([data]).size;

  const handleConfirmTx = async () => {
    setIsLoading(true);
    await publishTransaction(tx);
    setIsLoading(false);
    onSave();
  };

  const top = (
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

function PostButton({ data, onSave, buttonText }) {
  const [isLoading, setIsLoading] = useState(false);
  const [tx, setTx] = useState(null);
  const { user } = useContext(UserContext);

  const handleClick = async () => {
    setIsLoading(true);
    const tx = await generatePostTx(data, user);
    setTx(tx);
    setIsLoading(false);
  };

  return (
    <>
      <Button isLoading={isLoading} onClick={handleClick}>
        Publish to Arweave
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

export default PostButton;
