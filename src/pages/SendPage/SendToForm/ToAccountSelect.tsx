// @ts-nocheck
import React from 'react';
import { useSend } from 'pages/SendPage/SendContext';
import { useExternalAccount } from 'contexts/externalAccountContext';
import
AccountSelect,
{ substrateAccountToReactSelectOption, substrateAccountsToReactSelectOptions }
  from 'components/Accounts/BridgeAccountSelectDropdown';

const PublicToAccountSelect = () => {
  const {
    receiverAddress,
    setReceiver
  } = useSend();
  const {
    externalAccountOptions
  } = useExternalAccount();

  const options = substrateAccountsToReactSelectOptions(externalAccountOptions);
  const receiverAccount = externalAccountOptions.find(option => option.address === receiverAddress);
  const selectedOption = receiverAccount
    ? substrateAccountToReactSelectOption(receiverAccount)
    : null;

  const onChangeOption = (option) => {
    const { value: { address } } = option;
    setReceiver(address);
  };

  return (
    <AccountSelect
      options={options}
      selectedOption={selectedOption}
      onChangeOption={onChangeOption}
    />
  );
};


const PrivateToAccountSelect = () => {
  const {
    receiverAddress,
    setReceiver,
  } = useSend();

  const toReactSelectOption = (address) => {
    return {
      value: { address },
      label: 'Private',
    };
  };

  const options = receiverAddress ? [receiverAddress] : [];

  const reactSelectOptions = options?.map((address) => {
    return toReactSelectOption(address);
  });

  const selectedOption = receiverAddress ? toReactSelectOption(receiverAddress) : null;

  const onChangeOption = (option) => {
    const { value: { address } } = option;
    setReceiver(address);
  };

  return (
    <AccountSelect
      options={reactSelectOptions}
      selectedOption={selectedOption}
      onChangeOption={onChangeOption}
    />
  );
};

const ToAccountSelect = () => {
  const { receiverAssetType } = useSend();
  return (
    receiverAssetType.isPrivate
      ? <PrivateToAccountSelect />
      : <PublicToAccountSelect />
  );
};

export default ToAccountSelect;
