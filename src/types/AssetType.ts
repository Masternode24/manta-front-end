// @ts-nocheck
import NETWORK from 'constants/NetworkConstants';
import Svgs from 'resources/icons';
import BN from 'bn.js';

const AssetIds = {
  DOL: 1,
  KAR: 8,
  AUSD: 9,
  LKSM: 10,
  MOVR: 11,
  KSM: 12
};

const getAssetIds = (config) => {
  return AssetIds;
};

export default class AssetType {
  constructor(
    assetId,
    baseName,
    baseTicker,
    icon,
    numberOfDecimals,
    publicExistentialDeposit,
    isPrivate,
    coingeckoId,
    isNativeToken = false,
    logicalTicker = null
  ) {
    this.assetId = assetId;
    this.baseName = baseName;
    this.baseTicker = baseTicker;
    this.logicalTicker = logicalTicker || baseTicker;
    this.name = AssetType._getFullName(baseName, isPrivate);
    this.ticker = AssetType._getFullTicker(baseTicker, isPrivate);
    this.icon = icon;
    this.numberOfDecimals = numberOfDecimals;
    this.publicExistentialDeposit = publicExistentialDeposit;
    this.existentialDeposit = isPrivate ? new BN(0) : publicExistentialDeposit;
    this.isPrivate = isPrivate;
    this.isNativeToken = isNativeToken;
    this.coingeckoId = coingeckoId;
  }

  static Native(config) {
    if (config.NETWORK_NAME === 'Calamari') {
      return AssetType.Calamari(config, false);
    } else {
      return AssetType.DolphinSkinnedCalamari(config, false);
    }
  }

  static DolphinSkinnedCalamari(config, isPrivate) {
    return new AssetType(
      getAssetIds(config).DOL,
      'Dolphin',
      'DOL',
      Svgs.Dolphin,
      12,
      new BN('100000000000'),
      isPrivate,
      'dolphin',
      true,
      'KMA'
    );
  }

  static Calamari(config, isPrivate) {
    return new AssetType(
      getAssetIds(config).KMA,
      'Calamari',
      'KMA',
      Svgs.Calamari,
      12,
      new BN('100000000000'),
      isPrivate,
      'calamari-network',
      true
    );
  }

  static Karura(config, isPrivate) {
    return new AssetType(
      getAssetIds(config).KAR,
      'Karura',
      'KAR',
      Svgs.KarIcon,
      12,
      new BN('100000000000'),
      isPrivate,
      'karura'
    );
  }
  static Kusama(config, isPrivate) {
    return new AssetType(
      getAssetIds(config).KSM,
      'Kusama',
      'KSM',
      Svgs.KusamaIcon,
      12,
      new BN('500000000'),
      isPrivate,
      'kusama'
    );
  }

  static Rococo(config, isPrivate) {
    return new AssetType(
      getAssetIds(config).ROC,
      'Rococo',
      'ROC',
      Svgs.RocIcon,
      12,
      new BN('1'),
      isPrivate,
      'rococo'
    );
  }

  static KintsugiBTC(config, isPrivate) {
    return new AssetType(
      getAssetIds(config).KBTC,
      'Kintsugi BTC',
      'kBTC',
      Svgs.KbtcIcon,
      8,
      new BN('1'),
      isPrivate,
      'bitcoin'
    );
  }

  static Moonriver(config, isPrivate) {
    return new AssetType(
      getAssetIds(config).MOVR,
      'Moonriver',
      'MOVR',
      Svgs.MovrIcon,
      18,
      new BN('10000000000000000'),
      isPrivate,
      'moonriver'
    );
  }

  static AllCurrencies(config, isPrivate) {
    if (config.NETWORK_NAME === NETWORK.DOLPHIN) {
      return [
        AssetType.DolphinSkinnedCalamari(config, isPrivate),
        AssetType.Karura(config, isPrivate),
        AssetType.Kusama(config, isPrivate),
        AssetType.Moonriver(config, isPrivate)
      ];
    } else if (config.NETWORK_NAME === NETWORK.CALAMARI) {
      return [
        AssetType.Calamari(config, isPrivate),
        AssetType.Karura(config, isPrivate),
        AssetType.Kusama(config, isPrivate),
        AssetType.Moonriver(config, isPrivate),
      ];
    }
  }

  static _getFullName(baseName, isPrivate) {
    return isPrivate ? `Test zk${baseName}` : `Test ${baseName}`;
  }

  static _getFullTicker(baseTicker, isPrivate) {
    return isPrivate ? `zk${baseTicker}` : baseTicker;
  }

  toPrivate() {
    return new AssetType(
      this.assetId,
      this.baseName,
      this.baseTicker,
      this.icon,
      this.numberOfDecimals,
      this.publicExistentialDeposit,
      true,
      this.coingeckoId,
      this.isNativeToken,
      this.logicalTicker
    );
  }

  toPublic() {
    return new AssetType(
      this.assetId,
      this.baseName,
      this.baseTicker,
      this.icon,
      this.numberOfDecimals,
      this.publicExistentialDeposit,
      false,
      this.coingeckoId,
      this.isNativeToken,
      this.logicalTicker
    );
  }

  toggleIsPrivate() {
    if (this.isPrivate) {
      return this.toPublic();
    } else {
      return this.toPrivate();
    }
  }

  canTransferXcm = (originChain, destinationChain) => {
    return originChain.xcmAssets.find(asset => asset.name === this.name)
      && destinationChain.xcmAssets.find(asset => asset.name === this.name);
  };
}
