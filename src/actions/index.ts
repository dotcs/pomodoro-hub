import { Action, ActionCreator, Dispatch } from "redux";
import { remote } from "electron";

import { StoreState, SlackSettingsState } from "../types";

export const START_TIMER = "START_TIMER";
export const STOP_TIMER = "STOP_TIMER";
export const TOGGLE_TIMER = "TOGGLE_TIMER";
export const UPDATE_SETTINGS_SLACK = "UPDATE_SETTINGS_SLACK";
export const TOGGLE_SETTINGS_VISIBILITY = "TOGGLE_SETTINGS_VISIBILITY";

export const UPDATE_SLACK_STATUS_REQUEST = "UDPATE_SLACK_STATUS_REQUEST";
export const UPDATE_SLACK_STATUS_SUCCESS = "UDPATE_SLACK_STATUS_SUCCESS";
export const UPDATE_SLACK_STATUS_FAILURE = "UDPATE_SLACK_STATUS_FAILURE";

export interface StartTimerAction extends Action {}
export const startTimer: ActionCreator<StartTimerAction> = () => {
  return {
    type: START_TIMER
  };
};

export interface StopTimerAction extends Action {}
export const stopTimer: ActionCreator<StopTimerAction> = () => {
  return {
    type: STOP_TIMER
  };
};

export interface ToggleTimerAction extends Action {}
export const toggleTimer: ActionCreator<ToggleTimerAction> = () => {
  return {
    type: TOGGLE_TIMER
  };
};

export interface UpdateSlackStatusRequestAction extends Action {}
export interface UpdateSlackStatusSuccessAction extends Action {}
export interface UpdateSlackStatusFailureAction extends Action {}
export const updateSlackStatus = (
  token: string,
  msg: string,
  emoji: string
) => {
  return (dispatch: Dispatch<StoreState>) => {
    const requestAction: UpdateSlackStatusRequestAction = {
      type: UPDATE_SLACK_STATUS_REQUEST
    };
    dispatch(requestAction);

    const profile = encodeURIComponent(
      JSON.stringify({
        status_text: msg,
        status_emoji: emoji
      })
    );
    const queryString = `token=${token}&profile=${profile}`;

    fetch(`https://slack.com/api/users.profile.set?${queryString}`, {
      method: "post"
    })
      .then(res => res.json())
      .then(response => {
        const successAction: UpdateSlackStatusSuccessAction = {
          type: UPDATE_SLACK_STATUS_SUCCESS
        };
        dispatch(successAction);
      })
      .catch(() => {
        const failureAction: UpdateSlackStatusFailureAction = {
          type: UPDATE_SLACK_STATUS_FAILURE
        };
        dispatch(failureAction);
      });
  };
};

export interface UpdateSettingsSlackAction extends Action {
  settings: Partial<SlackSettingsState>;
}
export const updateSettingsSlack = (
  settings: Partial<SlackSettingsState>
): UpdateSettingsSlackAction => {
  return {
    type: UPDATE_SETTINGS_SLACK,
    settings
  };
};

export interface ToggleSettingsVisibilityAction extends Action {}
export const toggleSettingsVisibility = () => ({
  type: TOGGLE_SETTINGS_VISIBILITY
});
