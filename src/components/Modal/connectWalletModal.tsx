// @ts-nocheck
import React from 'react';
import { getWallets } from '@talismn/connect-wallets';
import { useKeyring } from 'contexts/keyringContext';
import { useMetamask } from 'contexts/metamaskContext';
import Svgs from 'resources/icons';

const WalletNotInstalledBlock = ({
  walletName,
  walletLogo,
  walletInstallLink
}) => {
  return (
    <div className="mt-6 py-3 px-4 h-16 text-sm flex items-center justify-between border border-manta-blue-secondary text-white rounded-lg w-full block">
      <div className="flex flex-row items-center gap-4">
        <img
          src={walletLogo.src}
          alt={walletLogo.alt}
          className="w-6 h-6 rounded-full"
        />
        {walletName}
      </div>
      <a href={walletInstallLink} target="_blank" rel="noreferrer">
        <div className="text-center rounded-lg bg-button-fourth text-white py-2 px-4 text-sm w-21">
          Install
        </div>
      </a>
    </div>
  );
};

const WalletInstalledBlock = ({ walletName, walletLogo, connectHandler }) => {
  return (
    <button
      onClick={connectHandler}
      className="mt-5 py-3 px-4 h-16 flex items-center justify-between border border-manta-blue-secondary text-white rounded-lg w-full block">
      <div className="flex flex-row items-center gap-4">
        <img
          src={walletLogo.src}
          alt={walletLogo.alt}
          className="w-6 h-6 rounded-full"
        />
        {walletName}
      </div>
      <div className="rounded-lg bg-button-fourth text-white py-2 px-4 text-xs">
        Connect
      </div>
    </button>
  );
};

const WalletEnabledBlock = ({ walletName, walletLogo }) => {
  return (
    <div className="mt-6 py-3 px-4 h-16 flex items-center justify-between border border-manta-blue-secondary text-white rounded-lg w-full block">
      <div className="flex flex-row items-center gap-4">
        <img
          src={walletLogo.src}
          alt={walletLogo.alt}
          className="w-6 h-6 rounded-full"
        />
        {walletName}
      </div>
      <div className="flex flex-row gap-3 items-center rounded-lg text-xs">
        <div className="rounded full w-2 h-2 bg-green-300"></div>Connected
      </div>
    </div>
  );
};

const ConnectWalletBlock = ({
  walletName,
  isWalletInstalled,
  walletInstallLink,
  walletLogo,
  isWalletEnabled,
  connectHandler
}) => {
  if (isWalletEnabled) {
    return (
      <WalletEnabledBlock walletName={walletName} walletLogo={walletLogo} />
    );
  } else if (isWalletInstalled) {
    return (
      <WalletInstalledBlock
        walletName={walletName}
        walletLogo={walletLogo}
        connectHandler={connectHandler}
      />
    );
  } else {
    return (
      <WalletNotInstalledBlock
        walletName={walletName}
        walletLogo={walletLogo}
        walletInstallLink={walletInstallLink}
      />
    );
  }
};

const MetamaskConnectWalletBlock = () => {
  const { configureMoonRiver, ethAddress } = useMetamask();
  const metamaskIsInstalled = window.ethereum?.isMetaMask && !window.ethereum?.isBraveWallet && !window.ethereum.isTalisman;

  return (
    <ConnectWalletBlock
      key={'metamask'}
      walletName={'Metamask'}
      isWalletInstalled={metamaskIsInstalled}
      walletInstallLink={'https://metamask.io/'}
      walletLogo={{ src: Svgs.Metamask, alt: '' }}
      isWalletEnabled={!!ethAddress}
      connectHandler={configureMoonRiver}
    />
  );
};

export const SubstrateConnectWalletBlock = ({ setIsMetamaskSelected }) => {
  const { connectWallet, connectWalletExtension } = useKeyring();

  const onSubstrateWalletConnectHandler = (walletName) => () => {
    connectWalletExtension(walletName);
    connectWallet(walletName);
    setIsMetamaskSelected && setIsMetamaskSelected(false);
  };

  const capitalizeFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return getWallets().map((wallet) => {
    // wallet.extension would not be defined if enabled not called
    const isWalletEnabled = wallet.extension ? true : false;

    return (
      <ConnectWalletBlock
        key={wallet.extensionName}
        walletName={capitalizeFirstLetter(wallet.extensionName)}
        isWalletInstalled={wallet.installed}
        walletInstallLink={wallet.installUrl}
        walletLogo={wallet.logo}
        isWalletEnabled={isWalletEnabled}
        connectHandler={onSubstrateWalletConnectHandler(wallet.extensionName)}
      />
    );
  });
};

const ConnectWalletModal = ({ setIsMetamaskSelected }) => {
  const isBridgePage = window?.location?.pathname?.includes('dolphin/bridge');
  return (
    <div className="w-96">
      <h1 className="text-xl text-white">Connect Wallet</h1>
      <SubstrateConnectWalletBlock
        setIsMetamaskSelected={setIsMetamaskSelected}
      />
      {isBridgePage && <MetamaskConnectWalletBlock />}
      <p className="flex flex-row gap-2 mt-5 text-secondary text-xsss">
        <img src={Svgs.InformationIcon} />
        Already installed? Try refreshing this page
      </p>
    </div>
  );
};

export default ConnectWalletModal;
