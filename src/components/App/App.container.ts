import { Dispatch } from "redux";
import { ipcRenderer } from "electron";

import { StoreState } from "../../types";
import { AppStateProps, AppDispatchProps } from "./App";
import { toggleSettingsVisibility } from "../../actions";

export const mapStateToProps = (state: StoreState): AppStateProps => ({});

export const mapDispatchToProps = (
  dispatch: Dispatch<StoreState>
): AppDispatchProps => ({
  onToggleUserSettings: () => {
    ipcRenderer.send("open-settings");
    dispatch(toggleSettingsVisibility());
  },
  onQuit: () => {
    ipcRenderer.send("app-quit");
  }
});
