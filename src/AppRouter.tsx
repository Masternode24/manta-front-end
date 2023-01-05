// @ts-nocheck
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { SendPage, StakePage, BridgePage } from 'pages';
import { CalamariBasePage, DolphinBasePage } from 'pages/BasePage';


const DolphinRoutes = () => {
  return (
    <DolphinBasePage>
      <Routes>
        <Route path="dolphin">
          <Route index element={<Navigate to="bridge" />} />
          <Route path="bridge" element={<BridgePage />} exact />
          <Route path="transact" element={<SendPage />} exact />
        </ Route >
      </Routes>
    </DolphinBasePage>
  );
};

const CalamariRoutes = () => {
  return (
    <CalamariBasePage>
      <Routes>
        <Route path="calamari">
          <Route index element={<Navigate to="stake" />} />
          <Route path="stake" element={<StakePage />} exact />
        </ Route >
      </Routes>
    </CalamariBasePage>
  );
};

const RedirectRoutes = () => {
  return (
    <Routes>
      <Route
        index
        element={<Navigate to="/calamari/stake" replace />}
        exact
      />
      <Route
        path="/transact"
        element={<Navigate to="/dolphin/transact" replace />}
        exact
      />
      <Route
        path="/bridge"
        element={<Navigate to="/dolphin/bridge" replace />}
        exact
      />
      <Route
        path="/stake"
        element={<Navigate to="/calamari/stake" replace />}
        exact
      />
    </Routes>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <RedirectRoutes />
      <CalamariRoutes/>
      <DolphinRoutes/>
    </Router>
  );
};

export default AppRouter;
