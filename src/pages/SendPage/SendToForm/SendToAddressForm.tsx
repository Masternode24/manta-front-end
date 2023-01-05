// @ts-nocheck
import React from 'react';
import { useSend } from '../SendContext';
import SendToAddressInput from './SendToAddressInput';
import ReceiverBalanceDisplay from './ReceiverBalanceDisplay';

const SendToAddressForm = () => {
  const { isPrivateTransfer, isPublicTransfer } = useSend();

  return isPrivateTransfer() || isPublicTransfer() ? (
    <>
      <SendToAddressInput />
    </>
  ) : (
    <>
      <ReceiverBalanceDisplay />
    </>
  );
};

export default SendToAddressForm;
