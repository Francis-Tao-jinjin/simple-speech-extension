function setState(enabled) {
  chrome.storage.sync.set({ enabled: enabled });
  const initialBadgeText = enabled ? 'ON' : 'OFF';
  chrome.action.setBadgeText({ text: initialBadgeText });
  chrome.action.setBadgeBackgroundColor({ color: enabled ? '#2ECC71' : '#E74C3C' });
}

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.get('enabled', (data) => {
    const enabled = data.enabled ?? true; // by default, the extension is enabled
    setState(!enabled);
    // chrome.notifications.create({
    //   type: 'basic',
    //   iconUrl: 'icons/icon-128.png',
    //   title: 'Text to Speech',
    //   message: enabled ? 'Text to Speech is ON' : 'Text to Speech is OFF',
    //   silent: true,
    // });
  });
});

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.storage.sync.get('enabled', (data) => {
      const enabled = data.enabled ?? true; // by default, the extension is enabled
      setState(enabled);
    });
  }
});