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
import { SyntheticEvent } from "react";
import { useCourse } from "../provider/CourseProvider";

// TODO: Improve performance so that it updates state every 5? seconds
export default function VideoPlayer() {
  const { activeLesson, setActiveLesson } = useCourse();

  const onSeekAndProgress = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    let currentTime: number;
    if (e.currentTarget.currentTime) {
      currentTime = e.currentTarget.currentTime;
      setActiveLesson((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          userProgress: prev.userProgress.map((p, i) =>
            i === 0 ? { ...p, timePlayed: Math.floor(currentTime) } : p
          ),
        };
      });
      // setCourse((course: Course) => ({
      //   ...course,
      //   activeLessonId: activeLesson.id,
      //   modules: course.modules.map((module) => {
      //     if (module.id === activeLesson.moduleId) {
      //       return {
      //         ...module,
      //         lessons: module.lessons.map((lesson) => {
      //           if (lesson.id === activeLesson.id)
      //             return {
      //               ...lesson,
      //               timePlayed: currentTime,
      //             };
      //           return lesson;
      //         }),
      //       };
      //     }
      //     return module;
      //   }),
      // }));
    }
  };

  const onLoadStart = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    e.currentTarget.currentTime = activeLesson?.userProgress[0].timePlayed ?? 0;
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
        src={activeLesson?.videoUrl as string}
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
