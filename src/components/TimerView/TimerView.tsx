import * as React from "react";
import cx from "classnames";
import { connect } from "react-redux";
import { withStyles, WithStyles, StyleRulesCallback } from "material-ui/styles";
import Button from "material-ui/Button";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import { isNil } from "lodash";

import { compose } from "../../utils";
import { mapStateToProps, mapDispatchToProps } from "./TimerView.container";
import { calculateTimeLeft, calculateTimeLeftNumber } from "./utils";
import { SlackSettingsState } from "../../types";
import Clock from "../Clock";

export interface TimerViewOwnProps {
  className?: string;
}

export interface TimerViewStateProps {
  startTime: string;
  running: boolean;
  paused: boolean;
}

export interface TimerViewDispatchProps {
  onStart: () => void;
  onStop: () => void;
  onResume: () => void;
  onPause: () => void;
}

export type TimerViewProps = TimerViewOwnProps &
  TimerViewStateProps &
  TimerViewDispatchProps &
  WithStyles;

export interface TimerViewState {
  timeLeft: string | null;
  timeLeftNumber: number | null;
}

export const styles: StyleRulesCallback = theme => ({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing.unit
  },
  counter: {
    textAlign: "center",
    flex: 1,
    fontSize: "1.4em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  "button-bar": {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing.unit
  }
});

export const TIMER_VIEW_UPDATE_INTERVAL = 200;

export class TimerView extends React.Component<TimerViewProps, TimerViewState> {
  interval: number;
  state: TimerViewState = {
    timeLeft: null,
    timeLeftNumber: null
  };

  componentDidMount() {
    this.interval = window.setInterval(
      () => this.updateTimer(),
      TIMER_VIEW_UPDATE_INTERVAL
    );
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  updateTimer() {
    const { running, startTime } = this.props;
    let timeLeft: string | null = null;
    let timeLeftNumber: number | null = null;
    if (running) {
      timeLeft = calculateTimeLeft(startTime);
      timeLeftNumber = calculateTimeLeftNumber(startTime);
    }
    if (running && !isNil(timeLeftNumber) && timeLeftNumber <= 0) {
      this.setState({ timeLeft: null, timeLeftNumber: null });
      const myNotification = new Notification("Pomodoro session finished", {
        body: "Time's up! Well done. Now take a break and fill your battery."
      });
      return;
    }
    this.setState({ timeLeft, timeLeftNumber });
  }

  render() {
    const props = this.props;
    const state = this.state;
    return (
      <div className={cx(props.classes.root, props.className)}>
        <div className={props.classes.counter}>
          {props.running &&
            state.timeLeftNumber && (
              <Clock size={100} value={state.timeLeftNumber} />
            )}
        </div>
        <div className={props.classes["button-bar"]}>
          {props.running && (
            <>
              {!props.paused && (
                <Button onClick={props.onPause} disabled>
                  Pause
                </Button>
              )}
              {props.paused && <Button onClick={props.onResume}>Resume</Button>}
              <Button onClick={props.onStop}>Stop</Button>
            </>
          )}
          {!props.running && (
            <>
              <Button onClick={props.onStart}>Start</Button>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default compose<TimerViewOwnProps>(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(TimerView);
