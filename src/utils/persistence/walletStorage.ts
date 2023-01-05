// @ts-nocheck
import store from 'store';

const LAST_WALLET_STORAGE_KEY = 'lastAccessedWallet';

export const getLastAccessedWallet = () => {
  return store.get(LAST_WALLET_STORAGE_KEY);
};

export const setLastAccessedWallet = (wallet) => {
  store.set(LAST_WALLET_STORAGE_KEY, wallet);
};
