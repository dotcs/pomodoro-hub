import { Reducer } from "redux";

import { TimerState } from "../types";
import { START_TIMER, STOP_TIMER, TOGGLE_TIMER } from "../actions";

const initialState: TimerState = {
  running: false,
  paused: false,
  startTime: null
};

const reducer: Reducer<TimerState> = (state = initialState, action) => {
  switch (action.type) {
    case START_TIMER: {
      const startTime = new Date().toISOString();
      return { ...state, running: true, paused: false, startTime };
    }
    case STOP_TIMER: {
      return { ...state, running: false, paused: false, startTime: null };
    }
    case TOGGLE_TIMER: {
      const { paused } = state;
      return { ...state, paused: !paused };
    }
    default:
      return state;
  }
};

export default reducer;
