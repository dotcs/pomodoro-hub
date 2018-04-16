import "isomorphic-fetch";

import * as path from "path";
import { app, BrowserWindow, Tray, ipcMain } from "electron";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} from "electron-devtools-installer";
import { createStore, Middleware, compose, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import { MyBrowserWindow, StoreState } from "./types";
import rootReducer from "./reducers";
import { readUserSettings } from "./utils/settingsStore";

const rootDir = path.join(__dirname, "..");
const assetsDirectory = path.join(rootDir, "assets");

let mainWindow: MyBrowserWindow = null;
let settingsWindow: MyBrowserWindow = null;
let tray: Tray = null;

const pathIndexHtml = path.resolve(__dirname, "..", "index.html");
const pathSettingsHtml = path.resolve(__dirname, "..", "settings.html");

const createTray = () => {
  tray = new Tray(path.join(assetsDirectory, "sunTemplate.png"));
  tray.on("right-click", (e, bounds) => toggleWindow(bounds));
  tray.on("double-click", (e, bounds) => toggleWindow(bounds));
  tray.on("click", function(event, bounds) {
    toggleWindow(bounds);

    // Show devtools when command clicked
    if (mainWindow.isVisible() && process.defaultApp && event.ctrlKey) {
      mainWindow.webContents.openDevTools({ mode: "detach" });
    }
  });
};

const toggleWindow = (bounds: Electron.Rectangle) => {
  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    showWindow(bounds);
  }
};

const showWindow = (bounds?: Electron.Rectangle) => {
  const position = getWindowPosition(bounds);
  mainWindow.setPosition(position.x, position.y, false);
  mainWindow.show();
  mainWindow.focus();
};

const getWindowPosition = (bounds?: Electron.Rectangle) => {
  const windowBounds = mainWindow.getBounds();
  const trayBounds = bounds || tray.getBounds();

  // Center window horizontally below the tray icon
  const x = Math.round(
    trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
  );

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 4);

  return { x: x, y: y };
};

const createReduxStore = () => {
  // TODO: Use https://github.com/hardchor/electron-redux instead?
  const middleware: Middleware[] = [ReduxThunk];

  // const composeEnhancers =
  // (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const composeEnhancers = compose;
  const enhancer = composeEnhancers(applyMiddleware(...middleware));

  const userSettings = readUserSettings();
  const initialState: Partial<StoreState> = {
    userSettings: { ...userSettings, open: false }
  };
  const store = createStore<StoreState>(
    rootReducer,
    (userSettings ? initialState : {}) as any,
    enhancer
  );
  return store;
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 200,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      // Prevents renderer process code from not running when window is
      // hidden
      backgroundThrottling: false
    }
  }) as MyBrowserWindow;

  // Pass store as global variable to window, because it's used in multiple
  // windows.
  mainWindow._store = store;

  mainWindow.loadURL(`file://${pathIndexHtml}`);

  // Hide the window when it loses focus
  mainWindow.on("blur", () => {
    if (!mainWindow.webContents.isDevToolsOpened()) {
      mainWindow.hide();
    }
  });
};

app.dock.hide();
const store = createReduxStore();

app.on("ready", () => {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log("An error occurred: ", err));
  installExtension(REDUX_DEVTOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log("An error occurred: ", err));

  createTray();
  createWindow();
});

ipcMain.on("open-settings", () => {
  if (!settingsWindow) {
    settingsWindow = new BrowserWindow({
      width: 800,
      height: 600
    }) as MyBrowserWindow;
    settingsWindow._store = store;

    settingsWindow.loadURL(`file://${pathSettingsHtml}`);

    // Settings window cannot be closed, because this somehow destroys the
    // shared redux instance. So instead of closing it, hide it from the user.
    settingsWindow.on("close", event => {
      event.preventDefault();
      settingsWindow.hide();
    });
  } else {
    settingsWindow.show();
  }
});

ipcMain.on("app-quit", () => {
  app.quit();
});

app.on("window-all-closed", function() {
  app.quit();
});

app.on("before-quit", () => {
  // Make sure to remove all close listeners, that may prevent the default
  // behaviour when quitting the app.
  if (mainWindow) {
    mainWindow.removeAllListeners("close");
  }
  if (settingsWindow) {
    settingsWindow.removeAllListeners("close");
  }
});

ipcMain.on("show-window", () => {
  showWindow();
});
