// @ts-nocheck
import React, { useState } from 'react';
import classNames from 'classnames';
import MantaLoading from 'components/Loading';
import ConnectWallet from 'components/Accounts/ConnectWallet';
import { ZkAccountConnect } from 'components/Navbar/ZkAccountButton';
import { useTxStatus } from 'contexts/txStatusContext';
import Balance from 'types/Balance';
import { usePrivateWallet } from 'contexts/privateWalletContext';
import { useExternalAccount } from 'contexts/externalAccountContext';
import { useConfig } from 'contexts/configContext';
import signerIsOutOfDate from 'utils/validation/signerIsOutOfDate';
import { useSend } from './SendContext';

const ActiveSendButton = () => {
  const { send, isToPrivate, isToPublic, isPublicTransfer, isPrivateTransfer } =
    useSend();
  const { txStatus } = useTxStatus();
  const disabled = txStatus?.isProcessing();

  let buttonLabel;
  if (isToPrivate()) {
    buttonLabel = 'To Private';
  } else if (isToPublic()) {
    buttonLabel = 'To Public';
  } else if (isPublicTransfer()) {
    buttonLabel = 'Public Transfer';
  } else if (isPrivateTransfer()) {
    buttonLabel = 'Private Transfer';
  }
  const onClickHandler = () => {
    if (!disabled) {
      send();
    }
  };

  return (
    <button
      id="sendButton"
      onClick={onClickHandler}
      className={classNames(
        'py-2 cursor-pointer unselectable-text',
        'text-center text-white rounded-lg gradient-button w-full',
        { disabled: disabled }
      )}>
      {buttonLabel}
    </button>
  );
};

const ValidationSendButton = ({ showModal }) => {
  const config = useConfig();
  const {
    isPublicTransfer,
    isPrivateTransfer,
    receiverAddress,
    userCanPayFee,
    userHasSufficientFunds,
    receiverAssetType,
    receiverAmountIsOverExistentialBalance,
    senderAssetTargetBalance,
    senderNativeTokenPublicBalance
  } = useSend();
  const { signerIsConnected, signerVersion } = usePrivateWallet();
  const { externalAccount } = useExternalAccount();

  let validationMsg = null;
  let shouldShowWalletMissingValidation = false;
  let shouldShowSignerMissingValidation = false;
  let shouldShowWalletSignerMissingValidation = false;

  if (!signerIsConnected && !isPublicTransfer() && !externalAccount) {
    shouldShowWalletSignerMissingValidation = true;
  } else if (!signerIsConnected && !isPublicTransfer()) {
    shouldShowSignerMissingValidation = true;
  } else if (signerIsOutOfDate(config, signerVersion)) {
    validationMsg = 'Signer out of date';
  } else if (!externalAccount) {
    shouldShowWalletMissingValidation = true;
  } else if (!senderAssetTargetBalance) {
    validationMsg = 'Enter amount';
  } else if (userCanPayFee() === false) {
    validationMsg = `Cannot pay ${senderNativeTokenPublicBalance?.assetType?.baseTicker} fee`;
  } else if (userHasSufficientFunds() === false) {
    validationMsg = 'Insufficient balance';
  } else if (
    receiverAddress === null &&
    (isPrivateTransfer() || isPublicTransfer())
  ) {
    validationMsg = `Enter recipient ${
      isPrivateTransfer() ? 'zkAddress' : 'substrate address'
    }`;
  } else if (
    receiverAddress === false &&
    (isPrivateTransfer() || isPublicTransfer())
  ) {
    validationMsg = `Invalid ${
      isPrivateTransfer() ? 'zkAddress' : 'substrate address'
    }`;
  } else if (receiverAmountIsOverExistentialBalance() === false) {
    const existentialDeposit = new Balance(
      receiverAssetType,
      receiverAssetType.existentialDeposit
    );
    validationMsg = `Min transaction is ${existentialDeposit.toDisplayString(
      3,
      false
    )}`;
  }

  const ValidationText = ({ validationMsg }) => {
    return (
      <div
        className={classNames(
          'py-2 unselectable-text text-center text-white rounded-lg w-full gradient-button filter brightness-50'
        )}>
        {validationMsg}
      </div>
    );
  };

  return (
    <>
      {shouldShowSignerMissingValidation && (
        <ZkAccountConnect
          className={
            'bg-connect-signer-button py-2 unselectable-text text-center text-white rounded-lg w-full'
          }
        />
      )}
      {shouldShowWalletMissingValidation && (
        <ConnectWallet
          isButtonShape={true}
          className={
            'bg-connect-wallet-button py-2 unselectable-text text-center text-white rounded-lg w-full'
          }
        />
      )}
      {shouldShowWalletSignerMissingValidation && (
        <>
          <button
            onClick={() => showModal()}
            className={classNames(
              'gradient-button py-2 unselectable-text text-center text-white rounded-lg w-full'
            )}>
            Connect Wallet and Signer
          </button>
        </>
      )}
      {validationMsg && <ValidationText validationMsg={validationMsg} />}
      {!shouldShowSignerMissingValidation &&
        !shouldShowWalletMissingValidation &&
        !shouldShowWalletSignerMissingValidation &&
        !validationMsg && <ActiveSendButton />}
    </>
  );
};

const SendButton = ({ showModal }) => {
  const { txStatus } = useTxStatus();

  if (txStatus?.isProcessing()) {
    return <MantaLoading className="ml-6 py-4 place-self-center" />;
  } else {
    return <ValidationSendButton showModal={showModal}/>;
  }
};

export default SendButton;
