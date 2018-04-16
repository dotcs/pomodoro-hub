import * as React from "react";
import cx from "classnames";
import { connect } from "react-redux";
import { withStyles, WithStyles, StyleRulesCallback } from "material-ui/styles";
import SettingsIcon from "material-ui-icons/settings";
import IconButton from "material-ui/IconButton";

import OffIcon from "../Icons/OffIcon";
import { compose } from "../../utils";
import TimerView from "../TimerView";
import SettingsView from "../SettingsView";
import { mapStateToProps, mapDispatchToProps } from "./App.container";

export interface AppOwnProps {}
export interface AppStateProps {}
export interface AppDispatchProps {
  onToggleUserSettings: () => void;
  onQuit: () => void;
}

export type AppProps = AppOwnProps &
  AppStateProps &
  AppDispatchProps &
  WithStyles;

const styles: StyleRulesCallback = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,.75)"
  },
  "button-bar": {
    display: "flex",
    justifyContent: "flex-end"
  }
});

const App: React.SFC<AppProps> = props => {
  return (
    <div className={props.classes.root}>
      <div className={props.classes["button-bar"]}>
        <IconButton aria-label="Settings" onClick={props.onToggleUserSettings}>
          <SettingsIcon />
        </IconButton>
        <IconButton aria-label="Settings" onClick={props.onQuit}>
          <OffIcon />
        </IconButton>
      </div>
      <TimerView />
    </div>
  );
};

export default compose<AppOwnProps>(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(App as any);
