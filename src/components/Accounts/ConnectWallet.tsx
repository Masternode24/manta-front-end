// @ts-nocheck
import React from 'react';
import classNames from 'classnames';
import { useModal } from 'hooks';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTxStatus } from 'contexts/txStatusContext';
import ConnectWalletModal from 'components/Modal/connectWalletModal';

const ConnectWallet = ({
  isButtonShape,
  setIsMetamaskSelected,
  text = 'Connect Wallet',
  className = ''
}) => {
  const { ModalWrapper, showModal } = useModal();
  const { txStatus } = useTxStatus();
  const disabled = txStatus?.isProcessing();
  const onClickPlusIcon = () => !disabled && showModal();

  return (
    <>
      {isButtonShape ? (
        <button className={classNames(className)} onClick={onClickPlusIcon}>
          {text}
        </button>
      ) : (
        <FontAwesomeIcon
          className={classNames('w-6 h-6 px-5 py-4 cursor-pointer z-10 text-secondary', {disabled: disabled})}
          icon={faPlusCircle}
          onClick={onClickPlusIcon}
        />
      )}
      <ModalWrapper>
        <ConnectWalletModal setIsMetamaskSelected={setIsMetamaskSelected} />
      </ModalWrapper>
    </>
  );
};

export default ConnectWallet;
