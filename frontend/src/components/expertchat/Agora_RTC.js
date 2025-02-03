// Path: src/components/expertchat/Agora_RTC.js

import { createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-sdk-ng';

const client = createClient({ mode: 'rtc', codec: 'vp8' });
let localTracks = { videoTrack: null, audioTrack: null };
let remoteUsers = {};

export const startBasicCall = async ({ appId, channel, token }) => {
    try {
        // Join the Agora channel with credentials
        await client.join(appId, channel, token, null);

        // Create audio and video tracks
        const [microphoneTrack, cameraTrack] = await createMicrophoneAndCameraTracks();
        localTracks.audioTrack = microphoneTrack;
        localTracks.videoTrack = cameraTrack;

        // Play the local video track on the DOM element with id 'video-agora-local'
        cameraTrack.play('video-agora-local');

        // Publish local tracks to the channel
        await client.publish(Object.values(localTracks));

        // Subscribe to remote users joining
        client.on('user-published', handleUserPublished);
        client.on('user-unpublished', handleUserUnpublished);
    } catch (error) {
        console.error('Failed to start basic call:', error);
    }
};

export const leaveCall = async () => {
    try {
        // Stop and close local tracks
        for (let trackName in localTracks) {
            if (localTracks[trackName]) {
                localTracks[trackName].stop();
                localTracks[trackName].close();
                localTracks[trackName] = null;
            }
        }

        // Leave the Agora channel
        await client.leave();

        // Clear remote users
        remoteUsers = {};
    } catch (error) {
        console.error('Failed to leave call:', error);
    }
};

// Handles publishing of remote user video/audio
const handleUserPublished = async (user, mediaType) => {
    remoteUsers[user.uid] = user;
    await client.subscribe(user, mediaType);

    if (mediaType === 'video') {
        const videoContainerId = `remote-video-${user.uid}`;
        user.videoTrack.play(videoContainerId);
    }

    if (mediaType === 'audio') {
        user.audioTrack.play();
    }
};

// Handles unpublishing of remote user video/audio
const handleUserUnpublished = (user) => {
    if (remoteUsers[user.uid]) {
        delete remoteUsers[user.uid];
        const videoContainerId = `remote-video-${user.uid}`;
        const remoteContainer = document.getElementById(videoContainerId);
        if (remoteContainer) remoteContainer.innerHTML = '';
    }
};

export const log = (message) => console.log(message);
