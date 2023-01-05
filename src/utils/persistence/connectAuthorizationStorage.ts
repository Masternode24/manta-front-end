// @ts-nocheck
import store from 'store';

const HAS_AUTH_TO_CONNECT_METAMASK_KEY = 'hasAuthToConnectMetamask';
const HAS_AUTH_TO_CONNECT_WALLET_KEY='hasAuthToConnectWallet';

export const setHasAuthToConnectMetamaskStorage = (isAuthorized) => {
  store.set(HAS_AUTH_TO_CONNECT_METAMASK_KEY, isAuthorized);
};

export const getHasAuthToConnectMetamaskStorage = () => {
  return store.get(HAS_AUTH_TO_CONNECT_METAMASK_KEY, false);
};

export const setHasAuthToConnectWalletStorage = (walletNames) => {
  store.set(HAS_AUTH_TO_CONNECT_WALLET_KEY, walletNames);
};

export const getHasAuthToConnectWalletStorage = () => {
  return store.get(HAS_AUTH_TO_CONNECT_WALLET_KEY, []);
};

