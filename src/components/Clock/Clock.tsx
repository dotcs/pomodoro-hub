import * as React from "react";
import { compose } from "../../utils";
import { withStyles, WithStyles, StyleRulesCallback } from "material-ui/styles";

export interface ClockOwnProps {
  size: number;
  value: number;
}

export type ClockProps = ClockOwnProps & WithStyles;

const styles: StyleRulesCallback = theme => ({
  root: {
    display: "inline-block",
    "& > svg": {
      transform: "rotate(-90deg)",
      borderRadius: "50%"
    }
  },
  top: {
    fill: "transparent",
    stroke: "dodgerblue",
    strokeWidth: 10
  },
  bottom: {
    fill: "transparent",
    stroke: "gainsboro",
    strokeWidth: 8
  }
});

export const Clock: React.SFC<ClockProps> = props => {
  const value = props.value * 100;
  const strokeDasharray = `${value} 100`;
  const containerStyle = {
    width: props.size,
    height: props.size
  };

  return (
    <div className={props.classes.root} style={containerStyle}>
      <svg viewBox="0 0 32 32">
        <circle className={props.classes.bottom} r="16" cx="16" cy="16" />
        <circle
          className={props.classes.top}
          r="16"
          cx="16"
          cy="16"
          style={{ strokeDasharray }}
        />
      </svg>
    </div>
  );
};

Clock.defaultProps = {
  size: 32
};

export default compose<ClockOwnProps>(withStyles(styles))(Clock as any);
