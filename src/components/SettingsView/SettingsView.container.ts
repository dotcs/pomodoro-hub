import { Dispatch } from "redux";
import { remote } from "electron";
import { cloneDeep, merge } from "lodash";

import {
  StoreState,
  UserSettingsState,
  UserSettings,
  MyBrowserWindow,
  SlackSettingsState
} from "../../types";
import { SettingsViewStateProps, SettingsViewDispatchProps } from ".";
import { updateSettingsSlack } from "../../actions";
import { persistUserSettings } from "../../utils/settingsStore";

const myWindow = remote.getCurrentWindow() as MyBrowserWindow;
const store = myWindow._store;

export const mapStateToProps = (state: StoreState): SettingsViewStateProps => ({
  settings: state.userSettings
});

export const mapDispatchToProps = (
  dispatch: Dispatch<StoreState>
): SettingsViewDispatchProps => ({
  onUpdateSlackSettings: (settings: Partial<SlackSettingsState>) => {
    const { userSettings } = store.getState();
    const userSettingsCopy = cloneDeep(userSettings);
    userSettingsCopy.slack = merge(userSettingsCopy.slack, settings);

    dispatch(updateSettingsSlack(settings));
    persistUserSettings(userSettingsCopy);
  }
});
