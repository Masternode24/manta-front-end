// @ts-nocheck
import React from 'react';
import PublicPrivateToggle from 'pages/SendPage/PublicPrivateToggle';
import { useSend } from '../SendContext';
import SendAssetSelect from './SendAssetSelect';

const SendFromForm = () => {
  const {
    toggleSenderIsPrivate,
    senderAssetType,
  } = useSend();

  return (
    <div>
      <div className="mb-4 items-stretch">
        <div className="flex flex-row justify-between items-center">
          <div className="text-black dark:text-white">From</div>
          <PublicPrivateToggle
            onToggle={toggleSenderIsPrivate}
            isPrivate={senderAssetType.isPrivate}
            prefix="sender"
          />
        </div>
      </div>
      <SendAssetSelect />
    </div>
  );
};

export default SendFromForm;
