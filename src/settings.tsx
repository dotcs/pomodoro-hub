import "isomorphic-fetch";
import "normalize.css/normalize.css";

import { remote, ipcRenderer } from "electron";
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import SettingsApp from "./components/SettingsApp";
import { MyBrowserWindow } from "./types";

const myWindow = remote.getCurrentWindow() as MyBrowserWindow;

render(
  <Provider store={myWindow._store}>
    <SettingsApp />
  </Provider>,
  document.getElementById("root")
);
