import "isomorphic-fetch";
import "normalize.css/normalize.css";

import { remote, ipcRenderer } from "electron";
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { createMuiTheme } from "material-ui/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

import App from "./components/App";
import { MyBrowserWindow } from "./types";

const myWindow = remote.getCurrentWindow() as MyBrowserWindow;
(window as any).__store = myWindow._store;

render(
  <Provider store={myWindow._store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
