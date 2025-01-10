let countdownInterval;

function validateInput(value) {
    if (!value || value < 5) {
        showError('Interval must be at least 5 seconds');
        return false;
    }
    if (value > 7200) {
        showError('Interval cannot exceed 2 hours');
        return false;
    }
    return true;
}

function showError(message) {
    const errorElement = document.getElementById('error');
    errorElement.textContent = message;
}

function clearError() {
    const errorElement = document.getElementById('error');
    errorElement.textContent = '';
}

function updateStatus(isActive, interval) {
    const statusElement = document.getElementById('status');
    const statusContainer = statusElement.parentElement;
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');

    if (isActive) {
        statusElement.textContent = `Refreshing every ${formatInterval(interval)}`;
        statusContainer.classList.remove('status-inactive');
        statusContainer.classList.add('status-active');
        startButton.style.display = 'none';
        stopButton.style.display = 'block';
        startCountdown(interval);
    } else {
        statusElement.textContent = 'Not active';
        statusContainer.classList.remove('status-active');
        statusContainer.classList.add('status-inactive');
        startButton.style.display = 'block';
        stopButton.style.display = 'none';
        stopCountdown();
    }
}

function formatInterval(ms) {
    if (ms >= 60000) {
        const minutes = ms / 60000;
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    } else {
        const seconds = ms / 1000;
        return `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`;
    }
}

function startCountdown(interval) {
    const countdownElement = document.getElementById('countdown');
    let nextRefresh = Date.now() + interval;

    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, nextRefresh - now);

        if (remaining === 0) {
            nextRefresh = Date.now() + interval;
        }

        const seconds = Math.ceil(remaining / 1000);
        countdownElement.textContent = `Next refresh in ${seconds} seconds`;
    }, 1000);
}

function stopCountdown() {
    clearInterval(countdownInterval);
    const countdownElement = document.getElementById('countdown');
    countdownElement.textContent = '';
}

document.addEventListener('DOMContentLoaded', () => {
    // Get current tab and check its status
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        chrome.runtime.sendMessage({ action: 'getStatus', tabId: tab.id }, (response) => {
            if (response.isActive) {
                updateStatus(true, response.interval);
            }
        });
    });

    document.getElementById('start').addEventListener('click', async () => {
        const intervalValue = parseInt(document.getElementById('interval').value);
        const unitValue = parseInt(document.getElementById('unit').value);

        if (!validateInput(intervalValue)) {
            return;
        }

        clearError();
        const interval = intervalValue * unitValue;

        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab) {
            chrome.runtime.sendMessage(
                { action: 'start', tabId: tab.id, interval },
                (response) => {
                    if (response.success) {
                        updateStatus(true, interval);
                    } else {
                        showError('Failed to start auto-refresh');
                    }
                }
            );
        } else {
            showError('No active tab found');
        }
    });

    document.getElementById('stop').addEventListener('click', async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.runtime.sendMessage(
            { action: 'stop', tabId: tab.id },
            (response) => {
                if (response.success) {
                    updateStatus(false);
                }
            }
        );
    });
});