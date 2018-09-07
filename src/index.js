import ReactDOM from "react-dom";
import React from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "mobx-react";

import App from "./components/App";

import authStore from "./stores/authStore";
import commonStore from "./stores/commonStore";

const stores = {
  authStore,
  commonStore,
};

// For easier debugging
window._____APP_STATE_____ = stores;

ReactDOM.render(
  <Provider {...stores}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
