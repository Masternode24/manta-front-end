import React from 'react';
import { usePrivateWallet } from 'contexts/privateWalletContext';
import BalanceDisplay from 'components/Balance/BalanceDisplay';
import { useSend } from '../SendContext';

const ReceiverBalanceDisplay = () => {
  const {
    receiverAssetType,
    receiverCurrentBalance,
    receiverAddress,
    isToPrivate,
    isPrivateTransfer,
    senderAssetTargetBalance,
  } = useSend();
  const { isInitialSync } = usePrivateWallet();

  const shouldShowInitialSync =
    isInitialSync.current && (isToPrivate() || isPrivateTransfer());
  const balanceString = shouldShowInitialSync
    ? 'Syncing to ledger'
    : receiverCurrentBalance?.toString();

  const shouldShowLoader =
    receiverAddress && !receiverCurrentBalance && !shouldShowInitialSync;

  const targetBalanceString = senderAssetTargetBalance
    ? senderAssetTargetBalance.toString()
    : '0.00';
  return (
    <div className="relative gap-4 justify-between items-center px-4 py-2 manta-bg-gray rounded-lg h-20 mb-2">
      <div className="absolute left-4 bottom-7 p-2 cursor-default w-1/2 text-xl text-gray-500 overflow-hidden">
        {targetBalanceString}
      </div>
      <div className="absolute right-6 top-2 border-0 flex flex-y items-center gap-3 mt-2">
        <div>
          <img
            className="w-6 h-6 rounded-full"
            src={receiverAssetType?.icon}
            alt="icon"
          />
        </div>
        <div className="text-black dark:text-white place-self-center">
          {receiverAssetType?.ticker}
        </div>
      </div>
      <BalanceDisplay
        balance={balanceString}
        className="absolute text-white right-0 bottom-3 mr-6 mt-2.5 text-xs"
        loader={shouldShowLoader}
      />
    </div>
  );
};

export default ReceiverBalanceDisplay;
