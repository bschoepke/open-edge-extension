const contextMenuId = 'openLinkInMicrosoftEdge';

function openInEdge(url) {
  chrome.tabs.update({
    url: `microsoft-edge:${url}`
  });
}

function onOpenInEdgeItemClicked(info, tab) {
  if (info.linkUrl && (info.menuItemId === contextMenuId)) {
    openInEdge(info.linkUrl);
  }
}

chrome.contextMenus.onClicked.addListener(onOpenInEdgeItemClicked);

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    'id': contextMenuId,
    'title': 'Open link in Microsoft Edge',
    'contexts': ['link']
  });
});

chrome.browserAction.onClicked.addListener(tab => {
  openInEdge(tab.url);
});
