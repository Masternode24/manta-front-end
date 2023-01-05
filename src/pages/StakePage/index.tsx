// @ts-nocheck
import React from 'react';
import Navbar from 'components/Navbar';
import { StakeDataContextProvider } from './StakeContext/StakeDataContext';
import StakePageContent from './StakePageContent';
import { StakeTxContextProvider } from './StakeContext/StakeTxContext';

const StakePage = () => {
  return (
    <StakeDataContextProvider>
      <StakeTxContextProvider>
        <Navbar />
        <StakePageContent />
      </StakeTxContextProvider>
    </StakeDataContextProvider>
  );
};

export default StakePage;
