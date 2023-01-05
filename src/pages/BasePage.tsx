// @ts-nocheck
import NETWORK from 'constants/NetworkConstants';
import React from 'react';
import PropTypes from 'prop-types';
import { ConfigContextProvider, useConfig } from 'contexts/configContext';
import { ExternalAccountContextProvider } from 'contexts/externalAccountContext';
import { SubstrateContextProvider } from 'contexts/substrateContext';
import { MetamaskContextProvider } from 'contexts/metamaskContext';
import DeveloperConsole from 'components/Developer/DeveloperConsole';
import { TxStatusContextProvider, useTxStatus } from 'contexts/txStatusContext';
import { useEffect } from 'react';
import { showError, showInfo, showSuccess } from 'utils/ui/Notifications';
import { UsdPricesContextProvider } from 'contexts/usdPricesContext';
import { PrivateWalletContextProvider } from 'contexts/privateWalletContext';
import { ZkAccountBalancesContextProvider } from 'contexts/zkAccountBalancesContext';

const TxStatusHandler = () => {
  const config = useConfig();
  const { txStatus } = useTxStatus();

  const subscanUrl = txStatus?.subscanUrl || config.SUBSCAN_URL;

  useEffect(() => {
    if (txStatus?.isFinalized()) {
      showSuccess(subscanUrl, 'Transaction succeeded', txStatus?.extrinsic);
    } else if (txStatus?.isFailed()) {
      showError('Transaction failed');
    } else if (txStatus?.isProcessing() && txStatus.message) {
      showInfo(txStatus.message);
    }
  }, [txStatus]);

  return (
    <div />
  );
};

const BasePage = ({children}) => {
  return (
    <SubstrateContextProvider>
      <ExternalAccountContextProvider>
        <TxStatusContextProvider>
          <DeveloperConsole />
          <TxStatusHandler />
          {children}
        </TxStatusContextProvider>
      </ExternalAccountContextProvider>
    </SubstrateContextProvider>
  );
};

BasePage.propTypes = {
  children: PropTypes.any
};

export const CalamariBasePage = ({children}) => {
  return (
    <ConfigContextProvider network={NETWORK.CALAMARI}>
      <BasePage>
        {children}
      </BasePage>
    </ConfigContextProvider>
  );
};

CalamariBasePage.propTypes = {
  children: PropTypes.any
};

export const DolphinBasePage = ({children}) => {
  return (
    <ConfigContextProvider network={NETWORK.DOLPHIN}>
      <BasePage>
        <UsdPricesContextProvider>
          <MetamaskContextProvider>
            <PrivateWalletContextProvider>
              <ZkAccountBalancesContextProvider>
                {children}
              </ZkAccountBalancesContextProvider>
            </PrivateWalletContextProvider>
          </MetamaskContextProvider>
        </UsdPricesContextProvider>
      </BasePage>
    </ConfigContextProvider>
  );
};

DolphinBasePage.propTypes = {
  children: PropTypes.any
};
