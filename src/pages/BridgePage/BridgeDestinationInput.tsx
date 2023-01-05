// @ts-nocheck
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTxStatus } from 'contexts/txStatusContext';
import { ethers } from 'ethers';
import { useMetamask } from 'contexts/metamaskContext';
import { useExternalAccount } from 'contexts/externalAccountContext';
import { validatePublicAddress } from 'utils/validation/validateAddress';
import Svgs from 'resources/icons';
import { useKeyring } from 'contexts/keyringContext';
import { useBridgeData } from './BridgeContext/BridgeDataContext';

const BridgeDestinationInput = () => {
  const { ethAddress } = useMetamask();
  const { setDestinationAddress, destinationAddress, destinationChain, originChain } = useBridgeData();
  const { selectedWallet } = useKeyring();
  const { externalAccount } = useExternalAccount();
  const { txStatus } = useTxStatus();
  const disabled = txStatus?.isProcessing();
  const [inputValue, setInputValue] = useState('');

  // Clear input if origin and destination chain are swapped
  useEffect(() => {
    setInputValue('');
  }, [originChain, destinationChain]);

  const destinationIsEvmChain = destinationChain.xcmAdapter.chain.type === 'ethereum';

  const validateAddress = (maybeAddress) => {
    if (destinationIsEvmChain) {
      return ethers.utils.isAddress(maybeAddress);
    }
    return validatePublicAddress(maybeAddress);
  };

  const onChangeDestinationtInput = (value) => {
    if (value === '') {
      setInputValue('');
      setDestinationAddress(null);
    } else if (validateAddress(value)) {
      setInputValue(value);
      setDestinationAddress(value);
    } else {
      setInputValue(value);
      setDestinationAddress(null);
    }
  };

  const onClickGetAddress = () => {
    if (disabled) {
      return;
    } else if (destinationIsEvmChain) {
      onChangeDestinationtInput(ethAddress);
    } else {
      onChangeDestinationtInput(externalAccount?.address);
    }
  };

  const getAddressIcon = () => {
    if (destinationIsEvmChain) {
      return <img className="w-6 h-6" src={Svgs.Metamask} alt={'metamask'} />;
    } else {
      return <img className="w-6 h-6" src={selectedWallet.logo.src} alt={selectedWallet.logo.alt} />;
    }
  };

  const getAccountName = () => {
    if (destinationIsEvmChain) {
      return 'Metamask';
    } else {
      return externalAccount?.meta.name;
    }
  };

  const destinationAccountIsMine = destinationAddress &&
    (destinationAddress === externalAccount?.address || destinationAddress === ethAddress);

  const ButtonContents = () => {
    return (
      <span className="w-32 px-1 flex justify-center whitespace-nowrap overflow-hidden">
        {
          destinationAccountIsMine ? (
            <>
              <div className="block w-5 mr-1 min-w-full min-h-full"><i >{getAddressIcon()}</i></div>
              <p className="block min-w-0 w-20 inline-block pt-0.5  overflow-hidden overflow-ellipsis">{getAccountName()}</p>
            </>
          )
            : 'Get Address'
        }
      </span>
    );
  };

  const placeholderMsg = `Enter ${
    originChain?.xcmAdapter?.chain?.type === 'ethereum' ? 'substrate' : 'EVM'} address`;

  return (
    <div
      className="flex items-center flex-grow h-16 mx-1"
    >
      <input
        id="recipientAddress"
        className={classNames(
          'w-full h-full rounded-lg manta-bg-gray px-5',
          'text-sm text-black dark:text-white outline-none rounded-lg',
          {disabled: disabled}
        )}
        onChange={(e) => onChangeDestinationtInput(e.target.value)}
        value={inputValue}
        disabled={disabled}
        placeholder={placeholderMsg}
      />
      <button
        onClick={onClickGetAddress}
        className={classNames('w-32 ml-1 h-full rounded-lg text-black',
          'dark:text-white outline-none rounded-2xl border-2 border-solid border-blue-500',
          'text-xs text-black dark:text-white', {disabled: disabled}
        )}
      >
        <ButtonContents />
      </button>
    </div>
  );
};

export default BridgeDestinationInput;
