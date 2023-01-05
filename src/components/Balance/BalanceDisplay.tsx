import React from 'react';
import DotLoader from 'components/Loaders/DotLoader';

interface IBalanceDisplayProps {
  balance: string;
  className: string;
  loader: boolean;
}

const BalanceDisplay: React.FC<IBalanceDisplayProps> = ({
  balance,
  className,
  loader
}) => {

  let balanceDisplay = balance;
  if (!balance && !loader) {
    balanceDisplay = '--';
  } else if (!balance) {
    balanceDisplay = '';
  }
  const balanceString = `Balance: ${balanceDisplay}`;

  return (
    <div id="balanceText" className={className}>
      {balanceString}
      {loader && <DotLoader />}
    </div>
  );
};

export default BalanceDisplay;
