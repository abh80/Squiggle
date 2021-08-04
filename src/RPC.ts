import { Client as RPCClient, Presence } from "discord-rpc";
import { ActivitiesPostBody, PresenceOutput } from "./Interface";

export default class RPC {
  clientID: string | null;
  rpcClient: RPCClient;
  isActive: boolean;

  constructor(clientID?: string) {
    this.clientID = clientID || null;
    this.isActive = false;
  }

  private init(clientID?: string): void {
    this.clientID = clientID || this.clientID;
    if (!this.clientID) return;
    this.rpcClient = new RPCClient({ transport: "ipc" });
  }

  async postActivity(
    clientID: string,
    Activity: ActivitiesPostBody
  ): Promise<PresenceOutput> {
    if (this.isActive) await this.deleteActivity(this.clientID);
    this.init(clientID);
    const payload: Presence = {
      state: Activity.state,
      details: Activity.description,
      startTimestamp: Activity.start,
      endTimestamp: Activity.end,
      largeImageKey: Activity.largeImage,
      smallImageKey: Activity.smallImage,
      buttons: Activity.buttons,
    };

    try {
      await this.connect();
      await this.rpcClient.setActivity(payload);
    } catch (e) {
      return {
        message: e.toString(),
        type: "error",
      };
    }
    this.isActive = true;
    return {
      type: "sucess",
    };
  }
  async deleteActivity(clientID: string): Promise<PresenceOutput> {
    if (this.clientID != clientID)
      return { message: "No activity to delete", type: "error" };
    try {
      await this.rpcClient.clearActivity();
    } catch (e) {
      this.isActive = false;
      return {
        message: e.toString(),
        type: "error",
      };
    }
    this.isActive = false;
    return {
      type: "sucess",
    };
  }
  private connect(): Promise<RPCClient> {
    return this.rpcClient?.connect(this.clientID);
  }
}
