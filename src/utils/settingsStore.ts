import * as path from "path";
import * as fs from "fs";
import { remote, app } from "electron";
import { merge } from "lodash";

import { initialState } from "../reducers/userSettings";
import { UserSettings } from "../types";

const CONFIG_NAME = "user-preferences";
const userDataPath = (app || remote.app).getPath("userData");
const fp = path.join(userDataPath, `${CONFIG_NAME}.json`);

export const persistUserSettings = (settings: UserSettings) => {
  fs.writeFileSync(fp, JSON.stringify(settings));
};

export const readUserSettings = (): UserSettings | null => {
  const { open, ...settings } = initialState;
  if (!fs.existsSync(fp)) {
    return settings;
  }
  return merge(settings, JSON.parse(
    fs.readFileSync(fp).toString()
  ) as UserSettings);
};
