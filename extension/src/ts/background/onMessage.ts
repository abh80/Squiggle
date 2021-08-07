import { MessageData, MessageOutput } from "../../../types/Interface";
import { postRpc } from "../Util";

export const onMessage = async (
  message: MessageData,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: MessageOutput) => void
): Promise<void> => {
  switch (message.type) {
    case "squiggle:rpc-set": {
      const x = await postRpc(message.data);
      if (x !== true)
        return sendResponse({ type: "error", message: x.message });
      else return sendResponse({ type: "success" });
    }
  }
};

chrome.runtime.onMessage.addListener(
  (
    message: MessageData,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: MessageOutput) => void
  ) => {
    onMessage(message, sender, sendResponse);
    return true;
  }
);
