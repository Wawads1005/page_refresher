import { RefresherMessageModel } from "@/lib/model";

const intervals = new Map<number, NodeJS.Timeout>();

chrome.runtime.onMessage.addListener(async (message: RefresherMessageModel) => {
  switch (message.action) {
    case "start": {
      const foundInterval = intervals.get(message.tabId);

      if (!foundInterval) {
        const interval = setInterval(() => {
          chrome.tabs.reload(message.tabId);
        }, message.interval! * 1000);

        intervals.set(message.tabId, interval);
      }

      break;
    }
    case "stop": {
      const foundInterval = intervals.get(message.tabId);

      if (foundInterval) {
        clearInterval(foundInterval);

        intervals.delete(message.tabId);
      }

      break;
    }
  }
});
