import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { updateSlackStatus } from "../actions";
import { StoreState, ServiceState } from "../types";

export const withServiceUpdate = (type: ServiceState) => (
  action: Action
): ThunkAction<void, StoreState, {}> => {
  return (dispatch, getState) => {
    const {
      enabled,
      token,
      availableMsg,
      availableEmoji,
      busyMsg,
      busyEmoji
    } = getState().userSettings.slack;

    dispatch(action);

    if (enabled) {
      if (type === ServiceState.Busy) {
        const slackUpdateAction = updateSlackStatus(token, busyMsg, busyEmoji);
        dispatch(slackUpdateAction);
      } else if (type === ServiceState.Available) {
        const slackUpdateAction = updateSlackStatus(
          token,
          availableMsg,
          availableEmoji
        );
        dispatch(updateSlackStatus(token, availableMsg, availableEmoji));
      }
    }
  };
};
