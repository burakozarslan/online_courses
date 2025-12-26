"use client";

import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
} from "media-chrome/react";
import { SyntheticEvent, useRef } from "react";

export default function VideoPlayer() {
  const playerRef = useRef(null);

  const logTimes = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    const currentTime = e.currentTarget.currentTime;
    const duration = e.currentTarget.duration;
    const timeLeft = duration - e.currentTarget.currentTime;
    const progress = (currentTime / duration) * 100;

    // TODO: Use this to start video at curtain timestamp.
    e.currentTarget.currentTime = 5;

    console.log("Current time: ", currentTime);
    console.log("Time left: ", timeLeft);
    console.log("Progress: ", progress);
  };

  return (
    <MediaController
      style={{
        width: "100%",
        aspectRatio: "16/9",
      }}
    >
      <ReactPlayer
        ref={playerRef}
        slot="media"
        src="https://youtu.be/Hwsj5iS-rA0"
        controls={false}
        onProgress={(e) => logTimes(e)}
        style={{
          width: "100%",
          height: "100%",
          // "--controls": "none",
        }}
      />
      <MediaControlBar>
        <MediaPlayButton />
        <MediaSeekBackwardButton seekOffset={10} />
        <MediaSeekForwardButton seekOffset={10} />
        <MediaTimeRange />
        <MediaTimeDisplay showDuration />
        <MediaMuteButton />
        <MediaVolumeRange />
        <MediaPlaybackRateButton />
        <MediaFullscreenButton />
      </MediaControlBar>
    </MediaController>
  );
}
