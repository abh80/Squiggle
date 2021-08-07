import { MessageData, MessageOutput } from "../../types/Interface";
import { postRpc } from "./Util";

chrome.runtime.onMessage.addListener(
  (
    message: MessageData,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: MessageOutput) => void
  ) => {
    switch (message.type) {
      case "squiggle:rpc-set":
        postRpc(message.data).then((x) => {
          if (x instanceof Error)
            return sendResponse({ type: "error", message: x.message });
        });
    }
  }
);
