import axios, { AxiosError } from "axios";
import { ActivitiesPostBody } from "../../types/Interface";

export const postRpc = async (
  PresenceData: ActivitiesPostBody
): Promise<Error | true> => {
  try {
    await axios.post("http://localhost:7879/activities", {
      headers: {
        "Content-Type": "application/json",
      },
      data: PresenceData,
    });
    return true;
  } catch (e: unknown) {
    return new Error((e as AxiosError).response?.data);
  }
};
