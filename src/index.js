import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./react-auth0-spa";
import CssBaseline from "@material-ui/core/CssBaseline";
import config from "./auth_config.json";
import history from "./utils/history";
import App from "./App";

// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

// TODO: Due to an unresolved issue in material-ui Drawer, had to disable
// StrictMode until it's fixed. :(
// https://github.com/mui-org/material-ui/issues/13394
ReactDOM.render(
  <React.Fragment>
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin + "/react-card-game"}
      onRedirectCallback={onRedirectCallback}
    >
      <CssBaseline />
      <App />
    </Auth0Provider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
