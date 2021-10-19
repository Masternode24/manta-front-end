import FormSelect from 'components/elements/Form/FormSelect';
import React, { useState, useRef, useEffect } from 'react';
import { base64Encode } from '@polkadot/util-crypto';
import CurrencyType from 'types/ui/CurrencyType';
import BN from 'bn.js';
import FormInput from 'components/elements/Form/FormInput';
import Button from 'components/elements/Button';
import { useSubstrate } from 'contexts/SubstrateContext';
import Svgs from 'resources/icons';
import { useWallet } from 'contexts/WalletContext';
import { useSigner } from 'contexts/SignerContext';
import { useExternalAccount } from 'contexts/ExternalAccountContext';
import TxStatus from 'types/ui/TxStatus';
import { makeTxResHandler } from 'utils/api/MakeTxResHandler';
import { base64Decode } from '@polkadot/util-crypto';
import MantaLoading from 'components/elements/Loading';
import { showError, showSuccess } from 'utils/ui/Notifications';
import selectCoins from 'utils/SelectCoins';
import { generateMintZeroCoinTx } from 'utils/api/BatchGenerateTransactions';
import { generateExternalTransferParams } from 'utils/api/BatchGenerateTransactions';

const SendTab = () => {
  const { api } = useSubstrate();
  const { signerClient } = useSigner();
  const { currentExternalAccount } = useExternalAccount();
  const { getSpendableBalance, spendableAssets, removeSpendableAsset } =
    useWallet();

  const [, setUnsub] = useState(null);
  const [selectedAssetType, setSelectedAssetType] = useState(null);
  const [sendAmountInput, setSendAmountInput] = useState(null);
  const [privateTransferAmount, setPrivateTransferAmount] = useState(
    new BN(-1)
  );
  const [receivingAddress, setreceivingAddress] = useState('');
  const coinSelection = useRef(null);
  const [status, setStatus] = useState(null);
  const txResWasHandled = useRef(null);
  const [privateBalance, setPrivateBalance] = useState(null);

  useEffect(() => {
    selectedAssetType &&
      setPrivateBalance(getSpendableBalance(selectedAssetType.assetId));
  }, [selectedAssetType, status, spendableAssets]);

  /**
   *
   * polkadot.js API API response Handlers
   *
   */

  const onPrivateTransferSuccess = async (block) => {
    // Seems like every batched tx gets handled?
    if (txResWasHandled.current === true) {
      return;
    }
    coinSelection.current.coins.forEach((coins) => {
      removeSpendableAsset(coins);
    });
    showSuccess('Transfer successful');
    txResWasHandled.current = true;
    setStatus(TxStatus.finalized(block));
  };

  const onPrivateTransferFailure = (block, error) => {
    // Every batched tx gets handled separately
    if (txResWasHandled.current === true) {
      return;
    }
    console.error(error);
    showError('Transfer failed');
    txResWasHandled.current = true;
    setStatus(TxStatus.failed(block, error));
  };

  const onPrivateTransferUpdate = (message) => {
    setStatus(TxStatus.processing(message));
  };

  const onClickSend = async () => {
    setStatus(TxStatus.processing());
    coinSelection.current = selectCoins(privateTransferAmount, spendableAssets);

    let transactions = [];

    if (coinSelection.current.coins.length === 1) {
      const [mintZeroCoinAsset, mintZeroCoinTx] = await generateMintZeroCoinTx(
        coinSelection.current.coins[0].asset_id,
        signerClient,
        api
      );
      transactions.push(mintZeroCoinTx);
      coinSelection.current.coins.push(mintZeroCoinAsset);
    }

    const privateTransferParamsList = await generateExternalTransferParams(
      receivingAddress,
      coinSelection.current,
      signerClient,
      api
    );

    const privateTransferPayloads =
      await signerClient.requestGeneratePrivateTransferPayloads(
        selectedAssetType.assetId,
        receivingAddress,
        privateTransferParamsList
      );

    privateTransferPayloads
      .map((payload) => api.tx.mantaPay.privateTransfer(payload))
      .forEach((privateTransferTransaction) =>
        transactions.push(privateTransferTransaction)
      );

    const txResHandler = makeTxResHandler(
      api,
      onPrivateTransferSuccess,
      onPrivateTransferFailure,
      onPrivateTransferUpdate
    );

    const unsub = api.tx.utility
      .batch(transactions)
      .signAndSend(currentExternalAccount, txResHandler);
    setUnsub(() => unsub);
  };

  const insufficientFunds = privateBalance?.lt(privateTransferAmount);
  const formIsDisabled = status && status.isProcessing();
  const buttonIsDisabled =
    formIsDisabled || insufficientFunds || !privateTransferAmount.gt(new BN(0));

  const onChangeSendAmountInput = (amountStr) => {
    setSendAmountInput(amountStr);
    try {
      setPrivateTransferAmount(new BN(amountStr));
    } catch (error) {
      return;
    }
  };

  const onClickMax = () => {
    onChangeSendAmountInput(privateBalance.toString());
  };

  const onChangereceivingAddress = (e) => {
    try {
      setreceivingAddress(
        base64Encode(
          api
            .createType(
              'MantaAssetShieldedAddress',
              base64Decode(e.target.value)
            )
            .toU8a()
        )
      );
    } catch (e) {
      setreceivingAddress(null);
    }
  };

  const balanceString =
    privateBalance &&
    selectedAssetType &&
    `Available: ${privateBalance.toString()} private ${
      selectedAssetType.ticker
    }`;

  const addressValidationText = 'Receiver';

  return (
    <div className="send-content">
      <div className="py-2">
        <FormSelect
          label="Token"
          selectedOption={selectedAssetType}
          setSelectedOption={setSelectedAssetType}
          options={CurrencyType.AllCurrencies()}
          disabled={formIsDisabled}
        />
        <FormInput
          value={sendAmountInput}
          onChange={(e) => onChangeSendAmountInput(e.target.value)}
          onClickMax={onClickMax}
          type="text"
        >
          {balanceString}
        </FormInput>
      </div>
      <img className="mx-auto" src={Svgs.ArrowDownIcon} alt="switch-icon" />
      <div className="py-2">
        <FormInput
          onChange={onChangereceivingAddress}
          prefixIcon={Svgs.WalletIcon}
          isMax={false}
          type="text"
        >
          {addressValidationText}
        </FormInput>
      </div>
      {status?.isProcessing() ? (
        <MantaLoading className="py-4" />
      ) : (
        <Button
          onClick={onClickSend}
          disabled={buttonIsDisabled}
          className="btn-primary btn-hover w-full text-lg py-3"
        >
          Send
        </Button>
      )}
    </div>
  );
};

export default SendTab;
