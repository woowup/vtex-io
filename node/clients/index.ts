import { IOClients } from "@vtex/api";
import CoreClient from "./core";
import WoowupClient from "./woowup";

export class Clients extends IOClients {
  public get core() {
    return this.getOrSet("core", CoreClient);
  }
  public get woowup() {
    return this.getOrSet("woowup", WoowupClient);
  }
}
