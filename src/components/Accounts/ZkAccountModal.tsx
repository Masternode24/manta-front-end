//@ts-nocheck
import React from 'react';
import MantaIcon from 'resources/images/manta.png';
import { usePrivateWallet } from 'contexts/privateWalletContext';
import { useZkAccountBalances } from 'contexts/zkAccountBalancesContext';
import CopyPasteIcon from 'components/CopyPasteIcon';

const PrivateTokenTableContent = ({ balances }) => {
  const privateWallet = usePrivateWallet();
  if (balances && balances.length > 0) {
    return balances.map((balance, _) => (
      <PrivateTokenItem balance={balance} key={balance.assetType.assetId} />
    ));
  } else if (
    privateWallet?.balancesAreStaleRef.current
  ) {
    return <div className="whitespace-nowrap text-center">Syncing...</div>;
  } else {
    return (
      <div className="whitespace-nowrap text-center">
        You have no zkAssets yet.
      </div>
    );
  }
};

const PrivateTokenItem = ({ balance }) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex gap-3 items-center">
        <img className="w-8 h-8 rounded-full" src={balance.assetType.icon} />
        <div>
          <div className="text-white">{balance.assetType.ticker}</div>
          <div className="text-secondary">
            {balance.privateBalance.toString()}
          </div>
        </div>
      </div>
      <div className="text-white">{'$0.00'}</div>
    </div>
  );
};

const ZkAccountModalContent = () => {
  const { privateAddress } = usePrivateWallet();
  const { balances } = useZkAccountBalances();
  const succinctAddress = `${privateAddress.slice(
    0,
    6
  )}..${privateAddress.slice(-4)}`;
  return (
    <>
      <div className="w-80 mt-3 bg-fifth rounded-lg p-4 absolute left-0 top-full z-50 border border-white border-opacity-20 text-secondary ">
        <div className="flex flex-col gap-3">
          <div className="border border-secondary bg-white bg-opacity-5 rounded-lg p-2 text-secondary flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <img className="w-6 h-6" src={MantaIcon} alt="Manta" />
              <span className="text-white font-light">
                zkAddress&nbsp;
                {succinctAddress}
              </span>
            </div>
            <CopyPasteIcon className="w-5 h-5" textToCopy={privateAddress} />
          </div>
          <div className="border border-secondary bg-white bg-opacity-5 rounded-lg p-1 text-secondary flex flex-col justify-center items-center">
            <span className="pt-3 pb-1 text-base text-white">
              Total Balance
            </span>
            <div className="text-white pb-3 text-2xl font-bold">{'$0.00'}</div>
          </div>
        </div>
        <div className="flex flex-col border border-secondary rounded-lg px-6 py-4 mt-3 text-secondary overflow-y-auto h-48 bg-white bg-opacity-5">
          <PrivateTokenTableContent balances={balances} />
        </div>
      </div>
    </>
  );
};

const NoZkAccountModal = () => {
  return (
    <div className="w-80 mt-3 bg-fifth rounded-lg p-4 absolute left-0 top-full z-50 border border-white border-opacity-20 text-secondary ">
      <div className="whitespace-nowrap text-center">
        You have no zkAccount yet.
      </div>
    </div>
  );
};

const ZkAccountModal = () => {
  const { privateAddress } = usePrivateWallet();
  return privateAddress ? <ZkAccountModalContent /> : <NoZkAccountModal />;
};

export default ZkAccountModal;
