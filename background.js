chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'openDialog') {
    chrome.tabs.create({
      url: chrome.runtime.getURL("dialog.html?url=" + encodeURIComponent(message.url))
    });
  } else if (message.action === 'openLink') {
    chrome.tabs.create({ url: message.url });
  }
});
