// @ts-check

import { keys } from "./shared.js";

const buttonNode = document.querySelector("button");
const resetButtonNode = document.querySelector("#reset");
const inputNode = document.querySelector("input");

const DEFAULT_INTERVAL = 5; // Default interval in seconds

document.addEventListener("DOMContentLoaded", () => {
  buttonNode?.addEventListener("click", async () => {
    const intervalValue = inputNode
      ? parseInt(inputNode?.value, 10)
      : DEFAULT_INTERVAL;

    if (isNaN(intervalValue) || intervalValue <= 0) {
      alert("Please enter a valid positive number for the interval.");
      return;
    }

    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab) return;

    chrome.runtime.sendMessage({
      action: keys.start,
      tabId: tab.id,
      interval: intervalValue,
    });
  });

  resetButtonNode?.addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab) return;

    chrome.runtime.sendMessage({
      action: keys.stop,
      tabId: tab.id,
    });
  });
});
