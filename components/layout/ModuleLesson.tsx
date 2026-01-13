"use client";

import { Check, Play, RotateCw } from "lucide-react";
import { COMPLETION_THRESHOLD } from "@/config";
import type { Course, Lesson } from "@/courses";
import { Dispatch, SetStateAction } from "react";
import type { LessonType } from "../provider/CourseProvider";
import { useCourse } from "../provider/CourseProvider";

interface ModuleLessonProps {
  lesson: LessonType;
}

const CompletedIcon = () => {
  return (
    <div className="w-5 h-5 border-2 border-brand-500 bg-brand-500 flex items-center justify-center text-white">
      <Check className="w-3 h-3" />
    </div>
  );
};

const ActiveIcon = () => {
  return (
    <div className="w-5 h-5 border-2 border-brand-500 rounded-full flex items-center justify-center">
      <div className="w-2.5 h-2.5 bg-brand-500 rounded-full"></div>
    </div>
  );
};

const InactiveIcon = () => {
  return (
    <div className="w-5 h-5 border-2 border-neutral-200  flex items-center justify-center text-white"></div>
  );
};

function formatDurationhhmm(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function handleScrollToVideoPlayer() {
  window.scrollTo({ top: 280, left: 0, behavior: "smooth" });
}

export default function ModuleLesson({ lesson }: ModuleLessonProps) {
  const { activeLesson, setActiveLesson } = useCourse();

  const isActive = lesson?.id === activeLesson?.id;
  const progress =
    (lesson?.userProgress[0]?.timePlayed ?? 0 / lesson?.duration) * 100;
  const isPlayed = progress !== 0;
  const isCompleted = progress > COMPLETION_THRESHOLD;
  const progressBarWidth = Math.floor((progress / 100) * 128);

  function handleStartLesson() {
    setActiveLesson(lesson);
    console.log(lesson);
    handleScrollToVideoPlayer();
  }

  function handleReplayLesson(id: string) {
    // setCourse((course: Course) => ({
    //   ...course,
    //   activeLessonId: lesson.id,
    //   modules: course.modules.map((module) => {
    //     if (module.id === lesson.moduleId) {
    //       return {
    //         ...module,
    //         lessons: module.lessons.map((lesson) => {
    //           if (lesson.id === id)
    //             return {
    //               ...lesson,
    //               timePlayed: 0,
    //             };
    //           return lesson;
    //         }),
    //       };
    //     }
    //     return module;
    //   }),
    // }));
  }

  return (
    <div className="p-4 flex gap-4 hover:bg-neutral-50 transition-colors group">
      <div className="pt-1">
        {isCompleted ? (
          <CompletedIcon />
        ) : isActive ? (
          <ActiveIcon />
        ) : (
          <InactiveIcon />
        )}
      </div>
      {/* <!-- Thumbnail --> */}
      <div className="w-32 h-20 bg-neutral-900 relative shrink-0 border border-neutral-200 group-hover:border-neutral-400 transition-colors">
        <div className="absolute inset-0 flex items-center justify-center">
          <Play className="w-6 h-6 text-white opacity-50" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-600">
            <div
              className={`h-full bg-brand-500`}
              style={{
                width: progressBarWidth,
              }}
            ></div>
          </div>
        </div>
        <span className="absolute bottom-1 right-1 bg-neutral-900 text-white text-[10px] px-1">
          {formatDurationhhmm(lesson.duration)}
        </span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4
            className={`text-body font-medium  mb-1 group-hover:text-brand-600 transition-colors ${
              isActive ? "text-brand-700" : "text-neutral-900"
            }`}
          >
            {lesson.title}
          </h4>
          {isActive && (
            <span className="text-[10px] bg-brand-100 text-brand-700 px-1.5 py-0.5 border border-brand-200">
              NOW PLAYING
            </span>
          )}
        </div>
        <p className="text-caption text-neutral-500 line-clamp-1">
          {lesson.description}
        </p>
      </div>
      <div className="flex items-center">
        {isActive ? (
          <button
            className="cursor-pointer bg-brand-600 text-white text-caption px-4 py-2 hover:bg-brand-500 transition-colors font-medium shadow-sm"
            onClick={() => handleScrollToVideoPlayer()}
          >
            Continue
          </button>
        ) : isCompleted ? (
          <button
            className="flex items-center cursor-pointer text-caption text-neutral-400 hover:text-neutral-900 px-3 py-1 border border-neutral-200"
            onClick={() => handleReplayLesson(lesson.id)}
          >
            <RotateCw className="size-3 mr-2" />
            Replay
          </button>
        ) : isPlayed ? (
          <button
            className="flex items-center cursor-pointer text-caption text-neutral-400 hover:text-neutral-900 px-3 py-1 border border-neutral-200"
            onClick={() => handleStartLesson()}
          >
            <Play className="size-3 mr-2" />
            Continue
          </button>
        ) : (
          <button
            className="flex items-center cursor-pointer text-caption text-neutral-400 hover:text-neutral-900 px-3 py-1 border border-neutral-200"
            onClick={() => handleStartLesson()}
          >
            <Play className="size-3 mr-2" />
            Start
          </button>
        )}
      </div>
    </div>
  );
}
