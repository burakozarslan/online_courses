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
import { Dispatch, SetStateAction, SyntheticEvent, useRef } from "react";
import type { Course, Lesson } from "@/courses";

interface VideoPlayerProps {
  activeLesson: Lesson;
  setCourse: Dispatch<SetStateAction<Course>>;
}

// TODO: Improve performance so that it updates state every 5? seconds
export default function VideoPlayer({
  activeLesson,
  setCourse,
}: VideoPlayerProps) {
  const onSeekAndProgress = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    let currentTime: number;
    if (e.currentTarget.currentTime) {
      currentTime = e.currentTarget.currentTime;
      setCourse((course: Course) => ({
        ...course,
        activeLessonId: activeLesson.id,
        modules: course.modules.map((module) => {
          if (module.id === activeLesson.moduleId) {
            return {
              ...module,
              lessons: module.lessons.map((lesson) => {
                if (lesson.id === activeLesson.id)
                  return {
                    ...lesson,
                    timePlayed: currentTime,
                  };
                return lesson;
              }),
            };
          }
          return module;
        }),
      }));
    }
  };

  const onLoadStart = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    e.currentTarget.currentTime = activeLesson.timePlayed;
  };

  return (
    <MediaController
      style={{
        width: "100%",
        aspectRatio: "16/9",
      }}
    >
      <ReactPlayer
        slot="media"
        src={activeLesson.src}
        controls={false}
        onStart={(e) => onLoadStart(e)}
        onProgress={(e) => onSeekAndProgress(e)}
        onSeeked={(e) => onSeekAndProgress(e)}
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
