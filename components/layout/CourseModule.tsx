"use client";

import ModuleLesson from "./ModuleLesson";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import type { Module } from "@/courses";
import { useState } from "react";

interface CourseModuleProps {
  module: Module;
  activeLessonId: string;
}

export default function CourseModule({
  module,
  activeLessonId,
}: CourseModuleProps) {
  // TODO: Default this to isActive state
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const numberOfLessons = module.lessons.length;
  const numberOfCompletedLessons = module.lessons.filter(
    (l) => (l.timePlayed / l.duration) * 100 > 95
  ).length;
  const isModuleCompleted = numberOfLessons === numberOfCompletedLessons;
  const isActiveModule = !!module.lessons.find(
    (lesson) => lesson.id === activeLessonId
  );

  return (
    <div
      key={module.id}
      className={`mb-6 bg-neutral-0 border shadow-sm ${
        isActiveModule ? "border-brand-500 border-2" : "border-neutral-200"
      }`}
      onClick={() => setIsOpen((cur) => !cur)}
    >
      <div
        className={`px-6 py-4 border-b border-neutral-200 flex items-center justify-between cursor-pointer hover:bg-neutral-100 transition-colors ${
          isActiveModule ? "bg-brand-50" : "bg-neutral-50"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 bg-brand-100 text-brand-600 flex items-center justify-center rounded-full overflow-hidden">
            {isModuleCompleted ? (
              <Check className="w-full h-full bg-brand-600 text-white p-1" />
            ) : (
              <div className="w-6 h-6 bg-brand-500 text-white flex items-center justify-center text-caption font-bold">
                {module.no}
              </div>
            )}
          </div>
          <div>
            <span className="text-caption text-neutral-500 block">
              MODULE 0{module.no}
            </span>
            <h3 className="text-heading-3 text-neutral-900">{module.title}</h3>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-caption text-neutral-500">
            {numberOfCompletedLessons}/{numberOfLessons} Completed
          </span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-neutral-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neutral-400" />
          )}
        </div>
      </div>
      {/* <!-- Lesson List --> */}
      {isOpen && (
        <div className="divide-y divide-neutral-100">
          {module.lessons.map((lesson) => (
            <ModuleLesson key={lesson.id} lesson={lesson} />
          ))}
        </div>
      )}
    </div>
  );
}
