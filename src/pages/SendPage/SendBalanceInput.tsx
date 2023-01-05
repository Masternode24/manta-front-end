// @ts-nocheck
import React, { useState } from 'react';
import Balance from 'types/Balance';
import Decimal from 'decimal.js';
import BN from 'bn.js';
import { useSubstrate } from 'contexts/substrateContext';
import { useSend } from 'pages/SendPage/SendContext';
import { usePrivateWallet } from 'contexts/privateWalletContext';
import { useExternalAccount } from 'contexts/externalAccountContext';
import BalanceInput from '../../components/Balance/BalanceInput';

const SendBalanceInput = () => {
  const { api } = useSubstrate();
  const {
    senderAssetCurrentBalance,
    setSenderAssetTargetBalance,
    senderAssetType,
    senderIsPrivate,
    getMaxSendableBalance
  } = useSend();
  const { externalAccount } = useExternalAccount();
  const { privateAddress } = usePrivateWallet();
  const { isInitialSync } = usePrivateWallet();
  const shouldShowInitialSync = isInitialSync.current && senderIsPrivate();

  const shouldShowPublicLoader = Boolean(!senderAssetCurrentBalance &&
    api?.isConnected &&
    externalAccount?.address
  );
  const shouldShowPrivateLoader = Boolean(!senderAssetCurrentBalance &&
    api?.isConnected &&
    !shouldShowInitialSync &&
    privateAddress
  );
  const shouldShowLoader = senderIsPrivate() ? shouldShowPrivateLoader : shouldShowPublicLoader;

  const balanceText = shouldShowInitialSync
    ? 'Syncing to network'
    : senderAssetCurrentBalance?.toString();

  const [inputValue, setInputValue] = useState('');

  const onChangeSendAmountInput = (value) => {
    if (value === '') {
      setSenderAssetTargetBalance(null);
      setInputValue('');
    } else {
      try {
        const targetBalance = Balance.fromBaseUnits(
          senderAssetType,
          new Decimal(value)
        );
        setInputValue(value);
        if (targetBalance.valueAtomicUnits.gt(new BN(0))) {
          setSenderAssetTargetBalance(targetBalance);
        } else {
          setSenderAssetTargetBalance(null);
        }
      } catch (error) {
        return;
      }
    }
  };

  const onClickMax = () => {
    const maxSendableBalance = getMaxSendableBalance();
    if (maxSendableBalance) {
      onChangeSendAmountInput(maxSendableBalance.toString());
    }
  };

  return (
    <BalanceInput
      onChangeAmountInput={onChangeSendAmountInput}
      inputValue={inputValue}
      onClickMax={onClickMax}
      balanceText={balanceText}
      shouldShowLoader={shouldShowLoader}
    />
  );
};

export default SendBalanceInput;
