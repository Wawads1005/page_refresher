import { RefresherMessageModel } from "@/lib/model";

async function sendMessage(message: RefresherMessageModel) {
  await chrome.runtime.sendMessage(message);
}

export default sendMessage;
