"use client";

import type { Lesson } from "@/courses";
import { Check, Play } from "lucide-react";

interface ModuleLessonProps {
  lesson: Lesson;
}

function formatDurationhhmm(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function ModuleLesson({ lesson }: ModuleLessonProps) {
  return (
    <div className="p-4 flex gap-4 hover:bg-neutral-50 transition-colors group">
      <div className="pt-1">
        <div className="w-5 h-5 border-2 border-brand-500 bg-brand-500 flex items-center justify-center text-white">
          <Check className="w-3 h-3" />
        </div>
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
        <h4 className="text-body font-medium text-neutral-900 mb-1 group-hover:text-brand-600 transition-colors">
          {lesson.title}
        </h4>
        <p className="text-caption text-neutral-500 line-clamp-1">
          {lesson.description}
        </p>
      </div>
      <div className="flex items-center">
        <button className="text-caption text-neutral-400 hover:text-neutral-900 px-3 py-1 border border-neutral-200">
          Replay
        </button>
      </div>
    </div>
  );
}
