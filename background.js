const linkContextMenuId = 'openLinkInMicrosoftEdge';
const frameContextMenuId = 'openTabsInMicrosoftEdge';

function openInEdge(url) {
  chrome.tabs.update({
    url: `microsoft-edge:${url}`
  });
}

function onOpenInEdgeItemClicked(info, tab) {
  if (info.linkUrl && (info.menuItemId === linkContextMenuId)) {
    openInEdge(info.linkUrl);
  } else if (info.menuItemId === frameContextMenuId) {
    chrome.tabs.query({
      currentWindow: true,
    }, tabs => {
      for (let i = 0; i < tabs.length; i++) {
        const tabUrl = tabs[i].url;
        setTimeout(() => openInEdge(tabUrl), (i + 1) * 10);
      }
    });
  }
}

chrome.contextMenus.onClicked.addListener(onOpenInEdgeItemClicked);

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    'id': linkContextMenuId,
    'title': 'Open link in Microsoft Edge',
    'contexts': ['link']
  });

  chrome.contextMenus.create({
    'id': frameContextMenuId,
    'title': 'Open all tabs in Microsoft Edge',
    'contexts': ['browser_action']
  });
});

chrome.browserAction.onClicked.addListener(tab => {
  openInEdge(tab.url);
});