import config from "./config";
import saveConfig from "./saveConfig";
import sendToWoowup from "./sendToWoowup";
import { getSalesChannels } from "./getSalesChannels";

export const mutations = {
  saveConfig,
  sendToWoowup
};

export const queries = {
  config,
  getSalesChannels,
};
