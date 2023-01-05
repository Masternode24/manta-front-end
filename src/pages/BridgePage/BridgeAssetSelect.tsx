// @ts-nocheck
import React from 'react';
import BridgeBalanceInput from 'pages/BridgePage/BridgeBalanceInput';
import AssetTypeSelect from 'components/Assets/AssetTypeSelect';
import { useBridgeData } from './BridgeContext/BridgeDataContext';

const BridgeAssetSelect = () => {
  const {
    senderAssetCurrentBalance,
    senderAssetType,
    setSenderAssetTargetBalance,
    maxInput,
    senderAssetTypeOptions,
    setSelectedAssetType,
  } = useBridgeData();

  const balanceText = senderAssetCurrentBalance?.toDisplayString();

  return (
    <div className="w-100 relative">
      <AssetTypeSelect
        assetType={senderAssetType}
        assetTypeOptions={senderAssetTypeOptions}
        setSelectedAssetType={setSelectedAssetType}
      />
      <BridgeBalanceInput
        balanceText={balanceText}
        senderAssetCurrentBalance={senderAssetCurrentBalance}
        setSenderAssetTargetBalance={setSenderAssetTargetBalance}
        senderAssetType={senderAssetType}
        maxSendableBalance={maxInput}
      />
    </div>
  );
};

export default BridgeAssetSelect;
