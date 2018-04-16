import { combineReducers } from "redux";

import timer from "./timer";
import userSettings from "./userSettings";
import { StoreState } from "../types";

const rootReducer = combineReducers<StoreState>({
  userSettings,
  timer
});

export default rootReducer;
