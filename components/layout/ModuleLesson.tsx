"use client";

import type { Lesson } from "@/courses";
import { Check, Play, RotateCw } from "lucide-react";
import { COMPLETION_THRESHOLD } from "@/config";

interface ModuleLessonProps {
  lesson: Lesson;
  activeLessonId: string;
}

const Completed = () => {
  return (
    <div className="w-5 h-5 border-2 border-brand-500 bg-brand-500 flex items-center justify-center text-white">
      <Check className="w-3 h-3" />
    </div>
  );
};

const Active = () => {
  return (
    <div className="w-5 h-5 border-2 border-brand-500 rounded-full flex items-center justify-center">
      <div className="w-2.5 h-2.5 bg-brand-500 rounded-full animate-pulse"></div>
    </div>
  );
};

const Inactive = () => {
  return (
    <div className="w-5 h-5 border-2 border-neutral-200  flex items-center justify-center text-white"></div>
  );
};

function formatDurationhhmm(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function ModuleLesson({
  lesson,
  activeLessonId,
}: ModuleLessonProps) {
  const isCompleted =
    (lesson.timePlayed / lesson.duration) * 100 > COMPLETION_THRESHOLD;
  const isActive = lesson.id === activeLessonId;
  const isPlayed = lesson.timePlayed !== 0;

  return (
    <div className="p-4 flex gap-4 hover:bg-neutral-50 transition-colors group">
      <div className="pt-1">
        {isCompleted ? <Completed /> : isActive ? <Active /> : <Inactive />}
      </div>
      {/* <!-- Thumbnail --> */}
      <div className="w-32 h-20 bg-neutral-900 relative shrink-0 border border-neutral-200 group-hover:border-neutral-400 transition-colors">
        <div className="absolute inset-0 flex items-center justify-center">
          <Play className="w-6 h-6 text-white opacity-50" />
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
            onClick={() =>
              window.scrollTo({ top: 280, left: 0, behavior: "smooth" })
            }
          >
            Continue
          </button>
        ) : isPlayed ? (
          <button className="flex items-center cursor-pointer text-caption text-neutral-400 hover:text-neutral-900 px-3 py-1 border border-neutral-200">
            <RotateCw className="size-3 mr-2" />
            Replay
          </button>
        ) : (
          <button className="flex items-center cursor-pointer text-caption text-neutral-400 hover:text-neutral-900 px-3 py-1 border border-neutral-200">
            <Play className="size-3 mr-2" />
            Start
          </button>
        )}
      </div>
    </div>
  );
}
