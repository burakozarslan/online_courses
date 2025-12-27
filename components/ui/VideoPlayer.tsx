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
import type { Lesson } from "@/courses";

interface VideoPlayerProps {
  activeLesson: Lesson;
}

export default function VideoPlayer({ activeLesson }: VideoPlayerProps) {
  const playerRef = useRef(null);

  const onProgress = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    const currentTime = e.currentTarget.currentTime;
    const duration = e.currentTarget.duration;
    const timeLeft = duration - e.currentTarget.currentTime;
    const progress = (currentTime / duration) * 100;

    // TODO: Set the video time to where left off.
    e.currentTarget.currentTime = activeLesson.timePlayed;

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
        src={activeLesson.src}
        controls={false}
        onProgress={(e) => onProgress(e)}
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
