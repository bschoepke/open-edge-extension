chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.update({
    url: `microsoft-edge:${tab.url}`
  });
});