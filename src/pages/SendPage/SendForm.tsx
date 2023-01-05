// @ts-nocheck
import React, { useEffect } from 'react';
import Svgs from 'resources/icons';
import signerIsOutOfDate from 'utils/validation/signerIsOutOfDate';
import { usePrivateWallet } from 'contexts/privateWalletContext';
import { useConfig } from 'contexts/configContext';
import DowntimeModal from 'components/Modal/downtimeModal';
import { UpDownArrowSvg } from 'resources/svgs';
import Navs from 'components/Navbar/Navs';
import MobileNotSupportedModal from 'components/Modal/mobileNotSupported';
import userIsMobile from 'utils/ui/userIsMobile';
import { useKeyring } from 'contexts/keyringContext';
import { useTxStatus } from 'contexts/txStatusContext';
import classNames from 'classnames';
import SendFromForm from './SendFromForm';
import SendToForm from './SendToForm';
import { useSend } from './SendContext';

const SendForm = () => {
  const config = useConfig();
  const { keyring } = useKeyring();
  const {
    swapSenderAndReceiverArePrivate,
    isPrivateTransfer,
    isPublicTransfer
  } = useSend();
  const { txStatus } = useTxStatus();
  const disabled = txStatus?.isProcessing();
  const disabledSwapSenderReceiver = isPrivateTransfer() || isPublicTransfer();

  useEffect(() => {
    if (keyring) {
      keyring.setSS58Format(config.SS58_FORMAT);
    }
  }, [keyring]);

  const onClickSwapSenderReceiver = () => {
    if (!disabled) {
      swapSenderAndReceiverArePrivate();
    }
  };

  document.title = config.PAGE_TITLE;

  let warningModal = <div />;
  if (config.DOWNTIME) {
    warningModal = <DowntimeModal />;
  } else if (userIsMobile()) {
    warningModal = <MobileNotSupportedModal />;
  }

  return (
    <div>
      {warningModal}
      <div className="2xl:inset-x-0 justify-center min-h-full flex flex-col gap-6 items-center pb-2">
        <Navs />
        <div
          className={classNames('w-113.5 px-12 py-6 bg-secondary rounded-xl', {
            disabled: disabled
          })}>
          <SendFromForm />
          <div onClick={onClickSwapSenderReceiver}>
            <UpDownArrowSvg
              className={classNames(
                'mx-auto my-4 cursor-pointer',
                { disabled: disabled || disabledSwapSenderReceiver }
              )}
              fill={disabledSwapSenderReceiver ? 'grey' : 'white'}
            />
          </div>
          <SendToForm />
        </div>
      </div>
    </div>
  );
};

export default SendForm;
