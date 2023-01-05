import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const NAVLINKPATH = {
  Transact: '/transact',
  Bridge: '/bridge',
  Stake: '/stake'
};
const Navs = () => {
  const isActiveTransactPage = window.location.pathname.includes(
    NAVLINKPATH.Transact
  );
  const isActiveBridgePage = window.location.pathname.includes(
    NAVLINKPATH.Bridge
  );
  const isActiveStakePage = window.location.pathname.includes(
    NAVLINKPATH.Stake
  );
  return (
    <div className="mt-2 flex flex-row justify-between rounded-full bg-secondary w-113.5 shadow-2xl items-center text-sm">
      <NavLink
        to="/transact"
        className={classNames(
          'py-3 w-1/3 rounded-full text-white text-opacity-60 text-center hover:text-white hover:text-opacity-100 hover:font-bold',
          {
            'bg-button-secondary text-white text-opacity-100 font-bold':
              isActiveTransactPage
          }
        )}>
        zkTransact
      </NavLink>
      <NavLink
        to="/bridge"
        className={classNames(
          'py-3 w-1/3 rounded-full text-white text-opacity-60 text-center hover:text-white hover:text-opacity-100 hover:font-bold',
          {
            'bg-button-secondary text-white text-opacity-100 font-bold':
              isActiveBridgePage
          }
        )}>
        Bridge
      </NavLink>
      {/* <NavLink
        to="/stake"
        className={classNames("py-3 w-1/4 rounded-full text-white text-opacity-60 text-center hover:text-white hover:text-opacity-100 hover:font-bold", {
            'bg-button-secondary text-white text-opacity-100 font-bold': isActiveStakePage
          })}
      >
        Stake
      </NavLink> */}
      <a
        href="https://forum.manta.network/"
        className="py-3 w-1/3 rounded-full text-white text-opacity-60 text-center hover:text-white hover:text-opacity-100 hover:font-bold"
        target="_blank"
        rel="noreferrer">
        Govern
      </a>
    </div>
  );
};

export default Navs;
