export interface ActivitiesPostBody {
  clientID: string;
  description?: string;
  state?: string;
  start?: number;
  end?: number;
  largeImage?: string;
  smallImage?: string;
  buttons?: Array<{ label: string; url: string }>;
}
export interface PresenceOutput {
  message?: string;
  type: "sucess" | "error";
}
