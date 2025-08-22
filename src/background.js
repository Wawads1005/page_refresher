// @ts-check

import { keys } from "./shared.js";

/**
 * @typedef {Object} Message
 * @property {string} action - The action to perform (start or stop).
 * @property {number} tabId - The ID of the tab to operate on.
 * @property {number} interval - The interval in seconds for the start action.
 */

const intervals = {};

chrome.runtime.onMessage.addListener((message) => {
  /** @type {Message} */
  const mssg = message;

  if (mssg.action === keys.start) {
    const { tabId, interval } = mssg;

    if (intervals[tabId]) {
      clearInterval(intervals[tabId]);
    }

    intervals[tabId] = setInterval(() => {
      chrome.scripting.executeScript({
        target: { tabId },
        func: () => window.location.reload(),
      });
    }, interval * 1000);
  } else if (mssg.action === keys.stop) {
    const { tabId } = mssg;

    if (intervals[tabId]) {
      clearInterval(intervals[tabId]);
      delete intervals[tabId];
    }
  }
});
