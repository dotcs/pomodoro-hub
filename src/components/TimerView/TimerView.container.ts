import { Dispatch } from "redux";

import { StoreState, SlackSettingsState, ServiceState } from "../../types";
import { TimerViewStateProps, TimerViewDispatchProps } from ".";
import {
  toggleTimer,
  startTimer,
  stopTimer,
  updateSlackStatus
} from "../../actions";
import { withServiceUpdate } from "../../utils";

export const mapStateToProps = (state: StoreState): TimerViewStateProps => {
  const { running, startTime, paused } = state.timer;
  const { slack } = state.userSettings;

  return {
    running,
    paused,
    startTime
  };
};

export const mapDispatchToProps = (
  dispatch: Dispatch<StoreState>
): TimerViewDispatchProps => {
  return {
    onPause: () => {
      const action = toggleTimer();
      const wrappedAction = withServiceUpdate(ServiceState.Available)(action);
      dispatch(wrappedAction);
    },
    onResume: () => {
      const action = toggleTimer();
      const wrappedAction = withServiceUpdate(ServiceState.Busy)(action);
      dispatch(wrappedAction);
    },
    onStart: () => {
      const action = startTimer();
      const wrappedAction = withServiceUpdate(ServiceState.Busy)(action);
      dispatch(wrappedAction);
    },
    onStop: () => {
      const action = stopTimer();
      const wrappedAction = withServiceUpdate(ServiceState.Available)(action);
      dispatch(wrappedAction);
    }
  };
};
