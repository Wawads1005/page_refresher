const intervals = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "start") {
    const { tabId, interval } = message;

    if (intervals[tabId]) {
      clearInterval(intervals[tabId]);
    }

    intervals[tabId] = setInterval(() => {
      chrome.scripting.executeScript({
        target: { tabId },
        func: () => window.location.reload(),
      });
    }, interval * 1000);
  } else if (message.action === "stop") {
    const { tabId } = message;

    if (intervals[tabId]) {
      clearInterval(intervals[tabId]);
      delete intervals[tabId];
    }
  }
});
