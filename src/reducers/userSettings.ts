import { Reducer } from "redux";

import { UserSettingsState } from "../types";
import {
  UPDATE_SETTINGS_SLACK,
  UpdateSettingsSlackAction,
  TOGGLE_SETTINGS_VISIBILITY
} from "../actions";

export const initialState: UserSettingsState = {
  open: false,
  slack: {
    enabled: false,
    token: null,
    availableEmoji: ":blush:",
    availableMsg: "Available",
    busyEmoji: ":facepunch:",
    busyMsg: "In Pomodoro session (DND)"
  }
};

const reducer: Reducer<UserSettingsState> = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SETTINGS_VISIBILITY: {
      const { open } = state;
      return { ...state, open: !open };
    }
    case UPDATE_SETTINGS_SLACK: {
      const { settings } = action as UpdateSettingsSlackAction;
      return { ...state, slack: { ...state.slack, ...settings } };
    }
    default:
      return state;
  }
};

export default reducer;
