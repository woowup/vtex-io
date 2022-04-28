import config from "./config";
import saveConfig from "./saveConfig";
import { getSalesChannels } from "./getSalesChannels";

export const mutations = {
  saveConfig,
};

export const queries = {
  config,
  getSalesChannels
};
