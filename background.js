let activeAlarms = new Map();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    try {
        switch (request.action) {
            case "start":
                const tabId = request.tabId;
                const interval = request.interval;

                // Clear any existing alarm for this tab
                if (activeAlarms.has(tabId)) {
                    chrome.alarms.clear(`refresh_${tabId}`);
                }

                // Create new alarm
                chrome.alarms.create(`refresh_${tabId}`, {
                    periodInMinutes: interval / 60000 // Convert ms to minutes
                });

                activeAlarms.set(tabId, interval);
                chrome.storage.local.set({ [`tab_${tabId}`]: interval });

                sendResponse({ success: true });
                break;

            case "stop":
                const stopTabId = request.tabId;
                if (activeAlarms.has(stopTabId)) {
                    chrome.alarms.clear(`refresh_${stopTabId}`);
                    activeAlarms.delete(stopTabId);
                    chrome.storage.local.remove(`tab_${stopTabId}`);
                }
                sendResponse({ success: true });
                break;

            case "getStatus":
                const checkTabId = request.tabId;
                sendResponse({
                    isActive: activeAlarms.has(checkTabId),
                    interval: activeAlarms.get(checkTabId)
                });
                break;
        }
    } catch (error) {
        console.error('Error in background script:', error);
        sendResponse({ success: false, error: error.message });
    }
    return true;
});

chrome.alarms.onAlarm.addListener((alarm) => {
    const tabId = parseInt(alarm.name.split('_')[1]);
    chrome.tabs.get(tabId, (tab) => {
        if (chrome.runtime.lastError || !tab) {
            // Tab no longer exists, clean up
            chrome.alarms.clear(alarm.name);
            activeAlarms.delete(tabId);
            return;
        }
        chrome.tabs.reload(tabId);
    });
});

// Restore active refreshes on extension reload
chrome.storage.local.get(null, (items) => {
    Object.entries(items).forEach(([key, interval]) => {
        if (key.startsWith('tab_')) {
            const tabId = parseInt(key.split('_')[1]);
            chrome.tabs.get(tabId, (tab) => {
                if (!chrome.runtime.lastError) {
                    activeAlarms.set(tabId, interval);
                    chrome.alarms.create(`refresh_${tabId}`, {
                        periodInMinutes: interval / 60000
                    });
                }
            });
        }
    });
});
