// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import { KeyringContextProvider } from './keyringContext';
import { ThemeProvider } from './themeContext';

const GlobalContexts = ({children}) => {
  return (
    <KeyringContextProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider >
    </KeyringContextProvider>
  );
};

GlobalContexts.propTypes = {
  children: PropTypes.any
};

export default GlobalContexts;

