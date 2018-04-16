import * as React from "react";
import { connect } from "react-redux";
import { withStyles, WithStyles, StyleRulesCallback } from "material-ui/styles";
import TextField from "material-ui/TextField";
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText
} from "material-ui/Form";
import Switch from "material-ui/Switch";

import { compose } from "../../utils";
import { mapStateToProps, mapDispatchToProps } from "./SettingsView.container";
import { UserSettingsState, SlackSettingsState } from "../../types";

export interface SettingsViewOwnProps {}
export interface SettingsViewStateProps {
  settings: UserSettingsState;
}
export interface SettingsViewDispatchProps {
  onUpdateSlackSettings: (settings: Partial<SlackSettingsState>) => void;
}

export type SettingsViewProps = SettingsViewOwnProps &
  SettingsViewStateProps &
  SettingsViewDispatchProps &
  WithStyles;

export const styles: StyleRulesCallback = theme => ({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing.unit
  },
  "slack-status-row": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  "slack-status-row__control": {
    flex: 1,
    marginRight: theme.spacing.unit,
    "&:nth-child(2n)": {
      marginRight: 0
    }
  }
});

export const SettingsView: React.SFC<SettingsViewProps> = props => {
  return (
    <div className={props.classes.root}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Slack integration</FormLabel>
        <FormControlLabel
          control={
            <Switch
              checked={props.settings.slack.enabled}
              onChange={() =>
                props.onUpdateSlackSettings({
                  enabled: !props.settings.slack.enabled
                })
              }
            />
          }
          label="Enable Slack integration"
        />
        <FormGroup>
          <TextField
            label="Slack token"
            value={props.settings.slack.token}
            onChange={e =>
              props.onUpdateSlackSettings({ token: e.target.value })
            }
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
            fullWidth
          />
        </FormGroup>
        <FormHelperText>
          Get your Slack token{" "}
          <a
            href="https://api.slack.com/custom-integrations/legacy-tokens"
            target="_blank"
          >
            here
          </a>.
        </FormHelperText>

        <div className={props.classes["slack-status-row"]}>
          <TextField
            className={props.classes["slack-status-row__control"]}
            label="Message if available"
            value={props.settings.slack.availableMsg}
            placeholder="Available"
            onChange={e =>
              props.onUpdateSlackSettings({ availableMsg: e.target.value })
            }
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
          <TextField
            className={props.classes["slack-status-row__control"]}
            label="Emoji if available"
            value={props.settings.slack.availableEmoji}
            placeholder=":blush:"
            onChange={e =>
              props.onUpdateSlackSettings({ availableEmoji: e.target.value })
            }
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
        </div>
        <div className={props.classes["slack-status-row"]}>
          <TextField
            className={props.classes["slack-status-row__control"]}
            label="Message if busy"
            placeholder="In Pomodoro session (DND)"
            value={props.settings.slack.busyMsg}
            onChange={e =>
              props.onUpdateSlackSettings({ busyMsg: e.target.value })
            }
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
          <TextField
            className={props.classes["slack-status-row__control"]}
            label="Emoji if busy"
            value={props.settings.slack.busyEmoji}
            onChange={e =>
              props.onUpdateSlackSettings({ busyEmoji: e.target.value })
            }
            placeholder=":facepunch:"
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
        </div>
      </FormControl>
    </div>
  );
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(SettingsView as any);
