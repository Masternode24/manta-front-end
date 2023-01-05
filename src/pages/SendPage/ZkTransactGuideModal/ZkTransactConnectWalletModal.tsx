// @ts-nocheck
import React from 'react';
import Svgs from 'resources/icons';

import { SubstrateConnectWalletBlock } from 'components/Modal/connectWalletModal';

const ZkTransactConnectWalletModal = () => {
    return (
      <div className="flex flex-col text-white w-128">
        <h1 className="text-2xl font-bold">Start to zkTransact</h1>
        <div className="py-2 font-medium text-xl">Connect Wallet</div>
        <p className="text-sm text-white text-opacity-70">
          Connecting wallet is to connect your public accounts.
        </p>
        <p className="text-sm text-white text-opacity-70">
          That allows you to transact public assets and pay gas fee with it.
        </p>
        <div className="w-2/3">
          <SubstrateConnectWalletBlock />
        </div>
        <p className="flex flex-row gap-2 mt-4 text-secondary text-xs mb-14">
          <img src={Svgs.InformationIcon} />
          Already installed? Try refreshing this page
        </p>
        <div className="absolute bottom-4 left-6 flex flex-row gap-2">
          <div className="h-2 w-12 bg-connect-signer-button rounded"></div>
          <div className="h-2 w-12 bg-connect-signer-button bg-opacity-20 rounded"></div>
          <div className="h-2 w-12 bg-connect-signer-button bg-opacity-20 rounded"></div>
        </div>
      </div>
    );
};

export default ZkTransactConnectWalletModal;
