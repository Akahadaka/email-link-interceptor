document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const rawUrl = urlParams.get('url')
  const emailClientPrefix = /^.*url\?q=|^.*\?url=/;
  const trimmedUrl = rawUrl.replace(emailClientPrefix, '');
  const urlComponents = new URL(decodeURIComponent(trimmedUrl));

  const protocol = document.getElementById('protocol');
  protocol.textContent = urlComponents.protocol + '//';
  if (urlComponents.protocol !== 'https:') {
    protocol.style.color = 'red';
    protocol.style.fontWeight = 'bold';
  }

  const hostname = document.getElementById('hostname');
  hostname.textContent = urlComponents.hostname;
  hostname.style.fontWeight = 'bold';
  hostname.style.color = 'blue';

  const port = document.getElementById('port');
  port.textContent = urlComponents.port;
  port.style.color = 'orange';
  port.style.fontWeight = 'bold';

  const pathname = document.getElementById('pathname');
  pathname.textContent = urlComponents.pathname;

  const search = document.getElementById('search');
  search.textContent = urlComponents.search;
  search.style.color = 'purple';
  search.style.opacity = 0.3;

  const hash = document.getElementById('hash');
  hash.textContent = urlComponents.hash;
  hash.style.color = 'green';
  hash.style.opacity = 0.3;

  document.getElementById('continue-button').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'openLink', url: rawUrl }, () => {
      window.close();
    });
  });

  document.getElementById('cancel-button').addEventListener('click', () => {
    window.close();
  });
});
