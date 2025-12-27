"use client";

import {
  Share2,
  PlayCircle,
  Check,
  ChevronDown,
  Play,
  ChevronUp,
  Pause,
  Lock,
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
import { courses } from "@/courses";
import type { Course, Lesson, Module } from "@/courses";

export default function CourseDetails() {
  const [course, setCourse] = useState<Course>(courses[0]);

  function formatCourseDifficulty(difficulty: number) {
    if (difficulty === 1) return "Beginner";
    else if (difficulty === 2) return "Intermediate";
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

  function calculateModuleDurationInSeconds(lessons: Lesson[]) {
    const totalDurationInSeconds = lessons.reduce(
      (prev, current) => prev + current.duration,
      0
    );
    return totalDurationInSeconds;
  }

  function calculateFormattedCourseDuration(modules: Module[]) {
    const totalDurationInSeconds = modules.reduce(
      (prev, current) =>
        prev + calculateModuleDurationInSeconds(current.lessons),
      0
    );
    return formatToHoursMinutes(totalDurationInSeconds);
  }

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
              <h1 className="text-heading-1 mb-4">{course.title}</h1>
              <p className="text-body text-neutral-400 mb-8 max-w-2xl leading-relaxed">
                {course.description}
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
                    <span className="text-brand-400">42%</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-2">
                    <div className="bg-brand-500 h-2 w-[42%] relative">
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
                    <p className="text-body">{course.modules.length}</p>
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
              Placeholder UI
              {/* <!-- Module 1: Completed --> */}
              <div className="mb-6 bg-neutral-0 border border-neutral-200 shadow-sm">
                <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between cursor-pointer hover:bg-neutral-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-brand-100 text-brand-600 flex items-center justify-center rounded-full">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <span className="text-caption text-neutral-500 block">
                        MODULE 01
                      </span>
                      <h3 className="text-heading-3 text-neutral-900">
                        Project Setup & Architecture
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-caption text-neutral-500">
                      4/4 Completed
                    </span>
                    <ChevronDown className="w-4 h-4 text-neutral-400" />
                  </div>
                </div>

                {/* <!-- Lesson List --> */}
                <div className="divide-y divide-neutral-100">
                  {/* <!-- Lesson 1 --> */}
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
                        10:24
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-body font-medium text-neutral-900 mb-1 group-hover:text-brand-600 transition-colors">
                        Initializing Next.js 14
                      </h4>
                      <p className="text-caption text-neutral-500 line-clamp-1">
                        Setting up the app router, typescript, and tailwind
                        configuration.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button className="text-caption text-neutral-400 hover:text-neutral-900 px-3 py-1 border border-neutral-200">
                        Replay
                      </button>
                    </div>
                  </div>
                  {/* <!-- Lesson 2 --> */}
                  <div className="p-4 flex gap-4 hover:bg-neutral-50 transition-colors group">
                    <div className="pt-1">
                      <div className="w-5 h-5 border-2 border-brand-500 bg-brand-500 flex items-center justify-center text-white">
                        <Check className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="w-32 h-20 bg-neutral-900 relative shrink-0 border border-neutral-200 group-hover:border-neutral-400 transition-colors">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white opacity-50" />
                      </div>
                      <span className="absolute bottom-1 right-1 bg-neutral-900 text-white text-[10px] px-1">
                        08:15
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-body font-medium text-neutral-900 mb-1 group-hover:text-brand-600 transition-colors">
                        Database Schema with Prisma
                      </h4>
                      <p className="text-caption text-neutral-500 line-clamp-1">
                        Modeling User, Products, and Orders in PostgreSQL.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button className="text-caption text-neutral-400 hover:text-neutral-900 px-3 py-1 border border-neutral-200">
                        Replay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Module 2: In Progress (Active) --> */}
              <div className="mb-6 bg-neutral-0 border-2 border-brand-500 shadow-md">
                <div className="px-6 py-4 bg-brand-50 border-b border-brand-200 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-brand-600 text-white flex items-center justify-center text-caption font-bold">
                      2
                    </div>
                    <div>
                      <span className="text-caption text-brand-700 block font-medium">
                        MODULE 02
                      </span>
                      <h3 className="text-heading-3 text-neutral-900">
                        Shopify API Integration
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-caption text-brand-700 font-medium">
                      1/5 Completed
                    </span>
                    <ChevronUp className="w-4 h-4 text-brand-700" />
                  </div>
                </div>

                <div className="divide-y divide-neutral-100">
                  {/* <!-- Active Lesson --> */}
                  <div className="p-4 flex gap-4 bg-brand-50/30 group">
                    <div className="pt-1">
                      <div className="w-5 h-5 border-2 border-brand-500 rounded-full flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-brand-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div className="w-32 h-20 bg-neutral-800 relative shrink-0 border-2 border-brand-500">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Pause className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-600">
                        <div className="h-full bg-brand-500 w-1/3"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-body font-medium text-brand-700">
                          Storefront API Setup
                        </h4>
                        <span className="text-[10px] bg-brand-100 text-brand-700 px-1.5 py-0.5 border border-brand-200">
                          NOW PLAYING
                        </span>
                      </div>
                      <p className="text-caption text-neutral-600">
                        Generating access tokens and configuring the GraphQL
                        client.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button className="bg-brand-600 text-white text-caption px-4 py-2 hover:bg-brand-500 transition-colors font-medium shadow-sm">
                        Continue
                      </button>
                    </div>
                  </div>

                  {/* <!-- Upcoming Lesson --> */}
                  <div className="p-4 flex gap-4 hover:bg-neutral-50 transition-colors opacity-75 hover:opacity-100">
                    <div className="pt-1">
                      <div className="w-5 h-5 border-2 border-neutral-300 rounded-full"></div>
                    </div>
                    <div className="w-32 h-20 bg-neutral-100 relative shrink-0 border border-neutral-200 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-neutral-400" />
                      <span className="absolute bottom-1 right-1 bg-neutral-900 text-white text-[10px] px-1">
                        15:00
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-body font-medium text-neutral-900 mb-1">
                        Fetching Products
                      </h4>
                      <p className="text-caption text-neutral-500 line-clamp-1">
                        Querying products with variants and images.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Module 3: Locked --> */}
              <div className="mb-6 bg-neutral-0 border border-neutral-200 opacity-60">
                <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-neutral-200 text-neutral-500 flex items-center justify-center text-caption font-bold">
                      3
                    </div>
                    <div>
                      <span className="text-caption text-neutral-500 block">
                        MODULE 03
                      </span>
                      <h3 className="text-heading-3 text-neutral-900">
                        Webhooks & Security
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Lock className="w-4 h-4 text-neutral-400" />
                  </div>
                </div>
              </div>
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
