// @ts-nocheck
import React from 'react';
import classNames from 'classnames';
import { useTxStatus } from 'contexts/txStatusContext';
import PropTypes from 'prop-types';
import Svgs from 'resources/icons';

const PublicPrivateToggle = ({ isPrivate, onToggle, prefix }) => {
  const { txStatus } = useTxStatus();
  const disabled = txStatus?.isProcessing();

  const onClick = () => {
    !disabled && onToggle();
  };

  let buttonId;
  if (isPrivate) {
    buttonId = `${prefix}PrivateTogglePublic`;
  } else {
    buttonId = `${prefix}PublicTogglePrivate`;
  }

  return (
    <>
      <div
        id={buttonId}
        onClick={onClick}
        className={classNames(
          'flex text-center cursor-pointer place-items-center btn-hover unselectable-text',
          'rounded-full bg-button-secondary text-white',
          { disabled: disabled }
        )}
      >
        {isPrivate ? (
          <div className="flex flex-row gap-2 w-24 justify-center items-center text-xss">
            <img
              className="w-3 h-3 place-self-center"
              src={Svgs.LockIcon}
              alt="icon"
            />
            Private
          </div>
        ) : (
          <div className="flex flex-row gap-2 w-24 justify-center items-center text-xss">
            <img
              className="w-3 h-3 place-self-center"
              src={Svgs.InternetIcon}
              alt="icon"
            />
            Public
          </div>
        )}
      </div>
    </>
  );
};

PublicPrivateToggle.propTypes = {
  isPrivate: PropTypes.bool,
  onToggle: PropTypes.func,
  label: PropTypes.string,
  prefix: PropTypes.string
};

export default PublicPrivateToggle;
