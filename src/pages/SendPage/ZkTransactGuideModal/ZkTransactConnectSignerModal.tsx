// @ts-nocheck
import React from 'react';
import MantaIcon from 'resources/images/manta.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faQuestionCircle,
  faArrowUpRightFromSquare,
  faInfoCircle,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

const ZkTransactConnectSignerModal = () => {
  return (
    <div className="flex flex-col text-white w-128">
      <h1 className="text-2xl font-bold">Start to zkTransact</h1>
      <div className="py-2 font-medium text-xl">Connect Manta Signer</div>
      <p className="text-white text-opacity-70 text-sm">
        Log in to Manta Signer to see your zkAssets and
      </p>
      <p className="text-white text-opacity-70 text-sm">
        transact public assets to zkAssets
      </p>
      <img className="my-3 w-12 h-12" src={MantaIcon} alt="Manta" />
      <p className="text-white text-opacity-70 text-sm">
        Please log in Manta Signer
      </p>
      <div className="mt-4 my-3 mb-14">
        <p className="text-white text-opacity-70 text-sm">
          Don't have Manta Signer installed?
        </p>
        <a
          href="https://signer.manta.network/"
          target="_blank"
          className="my-1 text-white hover:cursor-pointer flex flex-row items-center gap-3 text-sm"
          rel="noreferrer">
          Download Now
          <FontAwesomeIcon className="w-2.5 h-2.5" icon={faChevronRight} />
        </a>
      </div>
      <div className="absolute bottom-4 left-6 flex flex-row gap-2">
        <div className="h-2 w-12 bg-connect-signer-button rounded"></div>
        <div className="h-2 w-12 bg-connect-signer-button rounded"></div>
        <div className="h-2 w-12 bg-connect-signer-button bg-opacity-20 rounded"></div>
      </div>
    </div>
  );
};

export default ZkTransactConnectSignerModal;
