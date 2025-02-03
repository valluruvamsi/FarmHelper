// Path: src/components/expertchat/utils.js

// Logs a formatted message with a custom prefix
export const log = (message) => {
    console.log(`[Agora Log]: ${message}`);
};

// Logs error messages consistently
export const logError = (error) => {
    console.error(`[Agora Error]: ${error.message || error}`);
};

// Generates a unique DOM element ID for each remote user’s video container
export const generateRemoteVideoContainerId = (userId) => {
    return `remote-video-${userId}`;
};

// Appends a video container for a remote user to the #remote-container div
export const createRemoteVideoContainer = (userId) => {
    const containerId = generateRemoteVideoContainerId(userId);
    let container = document.getElementById(containerId);

    // Create a container if it doesn’t already exist
    if (!container) {
        container = document.createElement('div');
        container.id = containerId;
        container.style.width = '100%';
        container.style.height = '300px';
        container.style.marginBottom = '10px';
        document.getElementById('remote-container').appendChild(container);
    }

    return containerId;
};

// Removes a remote user's video container when they leave the channel
export const removeRemoteVideoContainer = (userId) => {
    const containerId = generateRemoteVideoContainerId(userId);
    const container = document.getElementById(containerId);

    if (container) {
        container.remove();
    }
};

// Utility to check if an object is empty (for data validation)
export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};
