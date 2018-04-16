import { Store } from "redux";
import { BrowserWindow } from "electron";

export interface MyBrowserWindow extends BrowserWindow {
  _store: Store<StoreState>;
}

export enum ServiceState {
  Available = "Available",
  Busy = "Busy"
}

export interface TimerState {
  running: boolean;
  paused: boolean;
  startTime: string | null;
}

export interface SlackSettingsState {
  enabled: boolean;
  token: string | null;
  availableMsg: string;
  availableEmoji: string;
  busyMsg: string;
  busyEmoji: string;
}

export interface UserSettings {
  slack: SlackSettingsState;
}

export interface UserSettingsState extends UserSettings {
  open: boolean;
}

export interface StoreState {
  timer: TimerState;
  userSettings: UserSettingsState;
}
