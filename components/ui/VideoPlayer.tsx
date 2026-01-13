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
import { useCourse } from "../provider/CourseProvider";
import { updateLessonProgress } from "@/app/actions/progress";

export default function VideoPlayer() {
  const { activeLesson, setActiveLesson, setCourse } = useCourse();
  const lastUpdateRef = useRef<number>(0);

  const onSeekAndProgress = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    let currentTime: number;
    if (e.currentTarget.currentTime) {
      currentTime = e.currentTarget.currentTime;

      // Update local state immediately for UI responsiveness
      setActiveLesson((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          userProgress: prev.userProgress.map((p, i) =>
            i === 0 ? { ...p, timePlayed: Math.floor(currentTime) } : p
          ),
        };
      });

      // Update global course state for sidebar progress bars
      setCourse((prevCourse) => {
        if (!prevCourse || !activeLesson) return prevCourse;

        return {
          ...prevCourse,
          modules: prevCourse.modules.map((module) => {
            if (module.id === activeLesson.moduleId) {
              return {
                ...module,
                lessons: module.lessons.map((lesson) => {
                  if (lesson.id === activeLesson.id) {
                    const existingProgress = lesson.userProgress[0];
                    return {
                      ...lesson,
                      userProgress: [
                        existingProgress
                          ? {
                              ...existingProgress,
                              timePlayed: Math.floor(currentTime),
                            }
                          : {
                              id: "temp-id", // Placeholder, simpler than creating a full object
                              studentId: "temp-student",
                              lessonId: lesson.id,
                              timePlayed: Math.floor(currentTime),
                              createdAt: new Date(),
                              updatedAt: new Date(),
                            },
                      ],
                    };
                  }
                  return lesson;
                }),
              };
            }
            return module;
          }),
        };
      });

      // Throttle database updates to every 5 seconds
      if (Math.abs(currentTime - lastUpdateRef.current) > 5) {
        lastUpdateRef.current = currentTime;
        if (activeLesson?.id) {
          updateLessonProgress(activeLesson.id, Math.floor(currentTime));
        }
      }
    }
  };

  const onLoadStart = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    // Resume from where the user left off
    e.currentTarget.currentTime =
      activeLesson?.userProgress[0]?.timePlayed ?? 0;
    lastUpdateRef.current = e.currentTarget.currentTime;
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
