import { IOClients } from "@vtex/api";
import CoreClient from "./core";

export class Clients extends IOClients {
  public get core() {
    return this.getOrSet("core", CoreClient);
  }
}
