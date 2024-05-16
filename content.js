document.addEventListener('click', function (event) {
  let target = event.target;
  while (target && target.tagName !== 'A') {
    target = target.parentElement;
  }

  if (target && target.tagName === 'A') {
    const url = target.href;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    // Temporarily disable the window.onbeforeunload event handler
    const originalOnBeforeUnload = window.onbeforeunload;
    window.onbeforeunload = null;

    chrome.runtime.sendMessage({ action: 'openDialog', url: url }, function () {
      // Restore the original onbeforeunload event handler
      window.onbeforeunload = originalOnBeforeUnload;
    });
  }
}, true);
