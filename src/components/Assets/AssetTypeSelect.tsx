// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import { useTxStatus } from 'contexts/txStatusContext';
import AssetType from 'types/AssetType';
import classNames from 'classnames';

const AssetTypeSelect = ({
  assetType,
  assetTypeOptions,
  setSelectedAssetType
}) => {
  const { txStatus } = useTxStatus();
  const disabled = txStatus?.isProcessing();
  const dropdownOptions = assetTypeOptions?.map((assetType) => {
    return {
      id: `assetType_${assetType.ticker}`,
      key: assetType.assetId,
      label: assetType.ticker,
      value: assetType
    };
  });

  const onChangeAssetType = (option) => {
    if (option.value.assetId !== assetType.assetId) {
      setSelectedAssetType(option.value);
    }
  };

  return (
    <Select
      id="selectedAssetType"
      className={classNames(
        '!absolute right-3 manta-bg-gray rounded-2xl whitespace-nowrap text-black dark:text-white',
        { disabled: disabled }
      )}
      isSearchable={false}
      value={assetType}
      onChange={onChangeAssetType}
      options={dropdownOptions}
      isDisabled={disabled}
      placeholder="--"
      styles={dropdownStyles(disabled)}
      components={{
        SingleValue: AssetTypeSingleValue,
        Option: AssetTypeOption,
        IndicatorSeparator: EmptyIndicatorSeparator
      }}
    />
  );
};

AssetTypeSelect.propTypes = {
  selectedOption: PropTypes.instanceOf(AssetType),
  setSelectedOption: PropTypes.func,
  optionsArePrivate: PropTypes.bool
};

const dropdownStyles = (disabled) => {
  const cursor = disabled ? 'not-allowed !important' : 'pointer';
  return {
    dropdownIndicator: () => ({ paddingRight: '1rem' }),
    control: (provided) => ({
      ...provided,
      borderStyle: 'none',
      borderWidth: '0px',
      borderRadius: '1rem',
      backgroundColor: 'transparent',
      paddingBottom: '0.5rem',
      paddingTop: '0.5rem',
      boxShadow: '0 0 #0000',
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center',
      height: '56px',
      cursor: cursor
    }),
    option: () => ({
      fontSize: '12pt'
    }),
    valueContainer: () => ({
      minHeight: '2rem',
      minWidth: '75%',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center'
    }),
    menu: (provided) => ({
      ...provided,
      width: '200%'
    }),
    container: () => ({
      position: 'absolute'
    })
  };
};

const EmptyIndicatorSeparator = () => {
  return <div />;
};

const AssetTypeSingleValue = ({ data }) => {
  return (
    <div className="border-0 flex items-center gap-2">
      <img className="w-6 h-6 rounded-full" src={data.icon} alt="icon" />
      <div className="text-black dark:text-white place-self-center">
        {data.ticker}
      </div>
    </div>
  );
};

const AssetTypeOption = (props) => {
  const { value, innerProps } = props;
  return (
    <div {...innerProps}>
      <div
        id={value.ticker}
        className="flex items-center inline w-full hover:bg-blue-100"
      >
        <img className="ml-3 w-6 rounded-full" src={value.icon} alt="icon" />
        <div className="p-2 pl-4 text-black">
          <components.Option {...props} />
          <div className="text-xs block manta-gray">{value.name}</div>
        </div>
      </div>
    </div>
  );
};

export default AssetTypeSelect;
