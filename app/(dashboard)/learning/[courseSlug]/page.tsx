"use client";

import {
  Share2,
  Folder,
  Github,
  FileText,
  Figma,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import VideoPlayer from "@/components/ui/VideoPlayer";
import CourseModule from "@/components/layout/CourseModule";
import { useState } from "react";
import { useCourse } from "@/components/provider/CourseProvider";
import type {
  LessonType,
  ModuleType,
} from "@/components/provider/CourseProvider";

export default function CourseDetails() {
  const { course } = useCourse();

  function formatCourseDifficulty(difficulty: string) {
    if (difficulty === "BEGINNER") return "Beginner";
    else if (difficulty === "INTERMEDIATE") return "Intermediate";
    else return "Advanced";
  }

  function formatToHoursMinutes(totalSeconds: number) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }

  function calculateModuleDurationInSeconds(lessons: LessonType[]) {
    const totalDurationInSeconds = lessons.reduce(
      (prev, current) => prev + current.duration,
      0
    );
    return totalDurationInSeconds;
  }

  function calculateFormattedCourseDuration(modules: ModuleType[]) {
    const totalDurationInSeconds = modules.reduce(
      (prev, current) =>
        prev + calculateModuleDurationInSeconds(current.lessons),
      0
    );
    return formatToHoursMinutes(totalDurationInSeconds);
  }

  function calculateOverallProgress(modules: ModuleType[]) {
    const totalDuration = modules.reduce(
      (acc, module) => acc + calculateModuleDurationInSeconds(module.lessons),
      0
    );

    const totalProgress = modules.reduce((acc, module) => {
      return (
        acc +
        module.lessons.reduce((lAcc, lesson) => {
          const progress = lesson.userProgress?.[0]?.timePlayed || 0;
          return lAcc + Math.min(progress, lesson.duration);
        }, 0)
      );
    }, 0);

    if (totalDuration === 0) return 0;
    return Math.round((totalProgress / totalDuration) * 100);
  }

  if (!course) return <div>Loading...</div>;

  const overallProgress = calculateOverallProgress(course?.modules);

  return (
    <main className="">
      {/* <!-- Breadcrumb / Header --> */}
      <header className="h-16 bg-neutral-0 border-b border-neutral-200 flex items-center justify-between px-6 sticky top-0 z-10">
        <div className="flex items-center gap-2 text-caption text-neutral-500">
          <Link href="/dashboard" className="hover:text-neutral-900">
            DASHBOARD
          </Link>
          <span>/</span>
          <Link href="/my-courses" className="hover:text-neutral-900">
            COURSES
          </Link>
          <span>/</span>
          <span className="text-neutral-900 font-bold">NEXTJS_FULLSTACK</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-caption text-neutral-500 hover:text-neutral-900 flex items-center gap-1">
            <Share2 className="w-3 h-3" /> Share
          </button>
        </div>
      </header>

      {/* <!-- Course Header Hero --> */}
      <div className="bg-neutral-900 text-neutral-0 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-2 py-1 bg-brand-900/30 border border-brand-800 text-brand-400 text-caption mb-4">
                <span className="w-1.5 h-1.5 bg-brand-500"></span>
                IN PROGRESS
              </div>
              <h1 className="text-heading-1 mb-4">{course?.title}</h1>
              <p className="text-body text-neutral-400 mb-8 max-w-2xl leading-relaxed">
                {course?.description}
              </p>

              {/* <!-- Main Action & Progress --> */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* <button className="w-full sm:w-auto bg-brand-600 text-white px-8 py-3 text-body font-medium hover:bg-brand-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-900/20">
                  <PlayCircle className="w-5 h-5" />
                  Resume: Module 4, Lesson 2
                </button> */}

                <div className="w-full sm:max-w-xs flex-1">
                  <div className="flex justify-between text-caption text-neutral-400 mb-2">
                    {/* TODO: Calculate overall progress */}
                    <span>OVERALL PROGRESS</span>
                    <span className="text-brand-400">{overallProgress}%</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-2">
                    <div
                      className="bg-brand-500 h-2 relative"
                      style={{ width: `${overallProgress}%` }}
                    >
                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-white opacity-50"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Right Side Stats (Desktop) --> */}
            <div className="hidden lg:block w-72 border-l border-neutral-800 pl-8">
              <div className="space-y-6">
                <div>
                  <p className="text-caption text-neutral-500 mb-1">
                    INSTRUCTOR
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-800 flex items-center justify-center font-bold text-neutral-400">
                      AS
                    </div>
                    <div>
                      <p className="text-body font-medium">Alex Smith</p>
                      <p className="text-caption text-neutral-500">
                        Senior Systems Eng.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-caption text-neutral-500 mb-1">LEVEL</p>
                    <p className="text-body">
                      {formatCourseDifficulty(course.difficulty)}
                    </p>
                  </div>
                  <div>
                    <p className="text-caption text-neutral-500 mb-1">
                      DURATION
                    </p>
                    <p className="text-body">
                      {calculateFormattedCourseDuration(course.modules)}
                    </p>
                  </div>
                  <div>
                    <p className="text-caption text-neutral-500 mb-1">
                      MODULES
                    </p>
                    <p className="text-body">{course?.modules.length}</p>
                  </div>
                  <div>
                    <p className="text-caption text-neutral-500 mb-1">
                      CERTIFICATE
                    </p>
                    <p className="text-body text-brand-400">Included</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Curriculum Content --> */}
      <div className="flex-1 bg-dash-grid">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <VideoPlayer />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* <!-- Main Curriculum Column --> */}
            <div className="flex-1 mt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-heading-2 text-neutral-900">Modules</h2>
                {/* <button className="text-caption text-brand-600 hover:text-brand-700 font-medium">
                  COLLAPSE ALL
                </button> */}
              </div>
              {course.modules.map((module) => (
                <CourseModule key={module.id} module={module} />
              ))}
            </div>
            {/* <!-- Right Sidebar (Sticky) --> */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* <!-- Resource Box --> */}
                <div className="bg-neutral-0 border border-neutral-200 p-6">
                  <h3 className="text-heading-3 text-neutral-900 mb-4 flex items-center gap-2">
                    <Folder className="w-4 h-4 text-brand-600" />
                    Resources
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-2 text-caption text-neutral-600 hover:text-brand-600 group"
                      >
                        <Github className="w-4 h-4 text-neutral-400 group-hover:text-brand-600" />
                        Source Code (Module 2)
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-2 text-caption text-neutral-600 hover:text-brand-600 group"
                      >
                        <FileText className="w-4 h-4 text-neutral-400 group-hover:text-brand-600" />
                        Shopify API Cheatsheet
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-2 text-caption text-neutral-600 hover:text-brand-600 group"
                      >
                        <Figma className="w-4 h-4 text-neutral-400 group-hover:text-brand-600" />
                        UI Kit Design Files
                      </a>
                    </li>
                  </ul>
                </div>

                {/* <!-- Instructor Note --> */}
                <div className="bg-brand-50 border border-brand-100 p-6 relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 text-brand-100 opacity-50">
                    <MessageSquare className="w-24 h-24" />
                  </div>
                  <h3 className="text-heading-3 text-brand-800 mb-2 relative z-10">
                    Pro Tip
                  </h3>
                  <p className="text-caption text-brand-700 relative z-10 leading-relaxed">
                    `When dealing with Shopify webhooks, always verify the HMAC
                    signature before processing the payload to prevent replay
                    attacks.`
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
