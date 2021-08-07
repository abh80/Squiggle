import { ActivitiesPostBody } from "./../../src/Interface";
export interface MessageData {
  type: string;
  data: ActivitiesPostBody;
}
export interface MessageOutput {
  type: "error" | "success";
  message?: string;
}
export { ActivitiesPostBody };
